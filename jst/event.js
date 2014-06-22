var event;

event = {
  id: false,
  i: function() {
    return event.handlers();
  },
  handlers: function() {
    return $('.event').on('click', event.click);
  },
  click: function() {
    var t;
    t = $(this);
    event.id = t.data('event-id');
    return event.login(function(response) {
      if (response) {
        return event.invite();
      }
    });
  },
  login: function(callback) {
    return FB.login(function(response) {
      if (response.authResponse) {
        return callback(true);
      } else {
        return callback(false);
      }
    }, {
      scope: 'rsvp_event'
    });
  },
  invite: function() {
    return FB.api('/' + event.id + '/attending/me', 'post', {}, function(response) {
      return console.log(response);
    });
  }
};
