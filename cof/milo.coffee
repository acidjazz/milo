
milo =

  i: ->
    milo.handlers()

  handlers: ->
    $('.extras > .extra').on 'click', milo.extra
    $('.close').on 'click', milo.close
    $('.event').on 'click', milo.detail
    $('.fade').on 'click', milo.cancel
    $('.nav > div').on 'click', milo.nav

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
    _.off '.modal', '.fade'

  scroll: (el) ->
    setTimeout ->
      $('html,body').animate
        scrollTop: $(el).offset().top
    , 300

  detail: ->
    t = $ this
    evt = t.data 'event'
    $('#' + key).html value for key, value of evt
    _.on '.fade', '.modal'

  nav: ->
    t = $ this
    p = t.data 'page'
    i = $ '.pictures > .inner'
    pages = 3

    i.removeClass('one').addClass('two')
