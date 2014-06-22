
event =
  id: false
  i: ->
    #https://graph.facebook.com/EVENT_ID/invited/USER_ID
    event.handlers()

  handlers: ->

    $('.event').on 'click', event.click

  click: ->
    t = $ this
    event.id = t.data 'event-id'
    event.login (response) ->
      event.invite() if response

  login: (callback) ->
    FB.login( (response) ->
      if response.authResponse
        callback(true)
      else
        callback(false)
    scope: 'rsvp_event'
    )
  invite: ->
    FB.api('/' + event.id + '/attending/me', 'post', {}, (response) ->
      console.log response
    )


