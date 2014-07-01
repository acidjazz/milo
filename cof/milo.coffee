
milo =

  facebook: {}

  i: ->
    milo.handlers()

  handlers: ->
    $('.extras > .extra').on 'click', milo.extra
    $('.pictures > .inner > .picture').on 'click', milo.picture
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

  picture: ->
    _.on '.zoom', '.fade'
    image = $(this).find('.image').data 'img'
    $('.zoom .image').css 'background-image', 'url(\'./img/gallery/' + image + '\')'

  extra: ->

    t = $ this

    _.off '.truckevent', '.recipes', '.story'

    if t.hasClass 'experience'
      _.swap '.truckevent'
      milo.scroll '.truckevent'

    if t.hasClass 'recipes'
      _.swap '.recipes'
      milo.scroll '.recipes'

    if t.hasClass 'story'
      _.swap '.story'
      milo.scroll '.story'

  close: ->
    _.off $(this).data('el'), '.fade'

  cancel: ->
    _.off '.modal', '.fade', '.zoom'

  scroll: (el, add) ->
    setTimeout ->

      if add isnt undefined
        $('html,body').animate
          scrollTop: $(el).offset().top + add
      else
        $('html,body').animate
          scrollTop: $(el).offset().top
    , 300
  rsvpup: ->
    milo.scroll '.schedule', 20

 
  detail: ->
    t = $ this
    evt = cfg.events[t.data 'index']
    $('.button').data 'event', evt
    $('#' + key).html value for key, value of evt

    $('._start').html evt.Date.split('/')[1] + '-' + evt.Date.split('/')[0] + '-2014 ' + moment(evt.StartTime, 'h:mm a').format('H:mm:ss')

    if evt.EndTime is 'N/A'
      evt.EndTime = moment(evt.StartTime, 'h:mm a').add(1, 'hours').format('h:mm a')

    $('._end').html evt.Date.split('/')[1] + '-' + evt.Date.split('/')[0] + '-2014 ' + moment(evt.EndTime, 'h:mm a').format('H:mm:ss')

    $('._summary').html evt.Title + ' at ' + evt.Event
    $('._description').html evt.Description
    $('._location').html evt.Address + ', ' + evt.City + ' ' + evt.State

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
    pages = 3

    for p in [1..3]
      i.removeClass 'page' + p

    if t.hasClass 'next'
      page = if currentpage is 3 then 1 else (currentpage+1)

    if t.hasClass 'prev'
      page = if currentpage is 1 then 3 else (currentpage-1)

    i.addClass 'page' + page
    i.data 'page', page

  share: ->

    FB.ui(
      method: 'feed'
      app_id: cfg.facebook.id
      link: 'https://www.mktreattruck.com/'
      #picture: milo.meta.image
      description: cfg.facebook.share

    , (response) ->

    )

  rsvpshare: ->

    t = $ this
    evt = t.data 'event'

    if evt.Facebook
      link = 'http://www.facebook.com/events/' + evt.Facebook
    else
      link = 'https://www.mktreattruck.com/'

    FB.ui(
      method: 'feed'
      app_id: cfg.facebook.id
      link: link
      #picture: milo.meta.image
      description: cfg.facebook.rsvpshare.replace('{EVENT}', evt.Event)
    , (response) ->
    )
   
