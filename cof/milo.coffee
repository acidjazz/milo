
milo =

  i: ->
    milo.handlers()

  handlers: ->
    $('.extras > .extra').on 'click', milo.extra
    $('.close').on 'click', milo.close
    $('.event').on 'click', milo.detail
    $('.fade').on 'click', milo.cancel

  extra: ->

    t = $ this

    _.off '.truckevent', '.recipes', '.story'

    if t.hasClass 'experience'
      _.swap '.truckevent'
      console.log $('.truckevent')

    if t.hasClass 'recipes'
      _.swap '.recipes'
      console.log $('.recipes')

    if t.hasClass 'story'
      _.swap '.story'
      console.log $('.story')

  close: ->
    _.off $(this).data('el'), '.fade'


  cancel: ->
    _.off '.modal', '.fade'

   
  detail: ->
    t = $ this
    evt = t.data 'event'
    $('.event_date').html evt.date
    $('.event_title').html evt.title
    $('.event_location').html evt.location
    _.on '.fade', '.modal'

