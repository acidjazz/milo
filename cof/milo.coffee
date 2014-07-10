
milo =

  facebook: {}
  scrolling: false

  i: ->
    milo.handlers()

    next = false
    now = moment().format 'X'

    # find and scroll to our next date
    for index, evt of cfg.events
      if (now < moment(evt.Date, 'M/D').add('days', 1).format('X'))
        cfg.events[index].next = true
        milo.divscroll $('.events > .inner'), $('.event_' + index), -30
        break

  handlers: ->
    $('.extras > .extra').on 'click', milo.extra
    $('.pictures > .inner > .picture').on 'click', milo.picture
    $('.zoom').on 'click', milo.close
    $('.close').on 'click', milo.close
    $('.event').on 'click', milo.detail
    $('.map').on
      click: milo.detail
    , '.infocta'
    $('.event').on 'mouseover', map.delayzoom
    $('.event').on 'mouseleave', map.cancelzoom
    #$('.events').on 'mouseout', map.center
    $('.fade').on 'click', milo.cancel
    $('.nav > div').on 'click', milo.nav
    $('.container').on 'click', '.button', milo.rsvpshare
    $('.rsvp.cta').on 'click', milo.share
    $('.rsvp2').on 'click', milo.rsvpup

    $('.toparrow, .bottomarrow').on 'mousedown', milo.startscroll
    $('.toparrow, .bottomarrow').on 'mouseup', milo.stopscroll

  picture: ->
    $('.zoom').css('height', ($(window).height()-100) + 'px')
    _.on '.zoom', '.fade'
    image = $(this).find('.image').data 'img'
    $('.zoom .image').css 'background-image', 'url(\'./img/gallery/' + image + '\')'
    _.t 'clickPicture', image

  extra: ->

    t = $ this

    _.off '.truckevent', '.recipes', '.story'

    if t.hasClass 'experience'
      _.swap '.truckevent'
      milo.scroll '.truckevent'
      _.t 'clickExtra', 'experience'

    if t.hasClass 'recipes'
      _.swap '.recipes'
      milo.scroll '.recipes'
      _.t 'clickExtra', 'recipes'

    if t.hasClass 'story'
      _.swap '.story'
      milo.scroll '.story'
      _.t 'clickExtra', 'story'

  close: ->
    _.off $(this).data('el'), '.fade'

  cancel: ->
    _.off '.modal', '.fade', '.zoom'

  scroll: (el, add, parent) ->

    parent = $('html,body') if parent is undefined

    setTimeout ->

      if add isnt undefined
        parent.animate
          scrollTop: $(el).offset().top + add
      else
       parent.animate
          scrollTop: $(el).offset().top
    , 300

  divscroll: (parent, el, add) ->

    parent.animate
      scrollTop: el.position().top + add
    , 300

  rsvpup: ->
    milo.scroll '.schedule', -50
    _.t 'clickRsvp', 'scrollUp'
 
  detail: ->
    t = $ this
    evt = cfg.events[t.data 'index']
    _.t 'clickEvent', evt.Event
    $('.button').data 'event', evt
    $('#' + key).html value for key, value of evt

    $('._start').html evt.Date.split('/')[1] + '-' + evt.Date.split('/')[0] + '-2014 ' + moment(evt.StartTime, 'h:mm a').format('H:mm:ss')

    if evt.EndTime is 'N/A'
      evt.EndTime = moment(evt.StartTime, 'h:mm a').add(1, 'hours').format('h:mm a')

    $('._end').html evt.Date.split('/')[1] + '-' + evt.Date.split('/')[0] + '-2014 ' + moment(evt.EndTime, 'h:mm a').format('H:mm:ss')

    $('._summary').html evt.Title + ' at ' + evt.Event
    $('._description').html evt.Description

    $('._location').html 'Follow Us on Twitter for Details!'
    $('.addressLine').hide()
    $('.followLine').show()

    if evt.Type isnt 'Guerilla'
      $('._location').html evt.Address + ', ' + evt.City + ' ' + evt.State
      $('.addressLine').show()
      $('.followLine').hide()

    if evt.Facebook
      $('._facebook_event').html 'http://www.facebook.com/events/' + evt.Facebook
    else
      $('._facebook_event').html()

    addthisevent.refresh()
    _.on '.fade', '.modal'

  nav: ->
    t = $ this
    i = $ '.pictures > .inner'
    currentpage = i.data 'page'
    pages = 8

    for p in [1..pages]
      i.removeClass 'page' + p

    if t.hasClass 'next'
      page = if currentpage is pages then 1 else (currentpage+1)

    if t.hasClass 'prev'
      page = if currentpage is 1 then pages else (currentpage-1)

    i.addClass 'page' + page
    i.data 'page', page

    _.t 'clickGallery', page

  share: ->

    _.t 'fbGeneralShare', 'clicked'

    FB.ui(
      method: 'feed'
      app_id: cfg.facebook.id
      link: 'https://www.mktreattruck.com/'
      #picture: milo.meta.image
      description: cfg.facebook.share

    , (response) ->

      if response
        _.t 'fbGeneralShare', 'success', response.post_id
      else
        _.t 'fbGeneralShare', 'failure'

    )

  rsvpshare: ->

    t = $ this
    evt = t.data 'event'

    if evt.Facebook
      link = 'http://www.facebook.com/events/' + evt.Facebook
    else
      link = 'https://www.mktreattruck.com/'

     _.t 'fbEventShare', 'clicked', evt.Event

    FB.ui(
      method: 'feed'
      app_id: cfg.facebook.id
      link: link
      #picture: milo.meta.image
      description: cfg.facebook.rsvpshare.replace('{EVENT}', evt.Event)
    , (response) ->

      if response
        _.t 'fbEventShare', 'success', evt.Event + '(' + response.post_id + ')'
      else
        _.t 'fbEventShare', 'failure'

    )
   
  startscroll: ->
    milo.scrolling = true
    action = if $(this).hasClass 'bottomarrow' then '+=40em' else '-=40em'
    milo.scroller $('.events .inner'), action

  stopscroll: ->
    milo.scrolling = false

  scroller: (obj, param) ->
    obj.animate
      scrollTop: param
    , 'linear', ->
      milo.scroller obj, param if milo.scrolling


