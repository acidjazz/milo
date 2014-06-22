var fbevent;

fbevent = {
  id: false,
  i: function() {
    return fbevent.handlers();
  },
  handlers: function() {
    return $('.event').on('click', fbevent.click);
  },
  click: function() {
    var t;
    t = $(this);
    fbevent.id = t.data('event-id');
    return fbevent.login();
  },
  login: function() {
    return FB.login(function(response) {
      if (response.authResponse) {
        return FB.api('/' + fbevent.id + '/attending/me', 'post', {}, function(response) {
          return console.log(response);
        });
      }
    }, {
      scope: 'rsvp_event'
    });
  },
  invite: function() {}
};
