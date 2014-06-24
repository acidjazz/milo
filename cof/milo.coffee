
milo =

  i: ->
    milo.handlers()

  handlers: ->
    $('.extras > .extra').on 'click', milo.extra
    $('.pictures > .inner > .picture').on 'click', milo.picture
    $('.close').on 'click', milo.close
    $('.event').on 'click', milo.detail
    $('.fade').on 'click', milo.cancel
    $('.nav > div').on 'click', milo.nav

  picture: ->
    _.on '.zoom', '.fade'

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

  scroll: (el) ->
    setTimeout ->
      $('html,body').animate
        scrollTop: $(el).offset().top
    , 300

  detail: ->
    t = $ this
    evt = t.data 'event'
    $('#' + key).html value for key, value of evt
    $('._start').html evt.Date.split('/')[1] + '-' + evt.Date.split('/')[0] + '-2014 00:00:00'
    $('._end').html evt.Date.split('/')[1] + '-' + evt.Date.split('/')[0] + '-2014 23:00:00'
    $('._summary').html evt.Event
    $('._description').html evt.Event + 'in ' + evt.Market
    $('._location').html evt.Address + ', ' + evt.City + ' ' + evt.State
    addthisevent.refresh()
    _.on '.fade', '.modal'

  nav: ->
    t = $ this
    p = t.data 'page'
    i = $ '.pictures > .inner'
    pages = 3

    i.removeClass('one').addClass('two')
