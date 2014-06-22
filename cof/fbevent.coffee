
fbevent =
  id: false
  i: ->
    #https://graph.facebook.com/EVENT_ID/invited/USER_ID
    fbevent.handlers()

  handlers: ->

    $('.event').on 'click', fbevent.click

  click: ->
    t = $ this
    fbevent.id = t.data 'event-id'
    fbevent.login()

  login: ->
    FB.login( (response) ->
      if response.authResponse
        FB.api('/' + fbevent.id + '/attending/me', 'post', {}, (response) ->
          console.log response
        )
    scope: 'rsvp_event'
    )
  invite: ->


