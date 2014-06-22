
event =
  i: ->
    #https://graph.facebook.com/EVENT_ID/invited/USER_ID
    event.handlers()

  handlers: ->

    $('.event').on 'click', event.click

  click: ->
    t = $ this
    id = t.data 'event-id'
    FB.api('/' + id + '/invited/me', 'post', {uids: ['me']}, (response) ->
      console.log response
    )
  login: ->
    FB.login( (response) ->
      console.log response
    scope: 'rsvp_event'
    )

