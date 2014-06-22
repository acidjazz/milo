var event;

event = {
  i: function() {
    return event.handlers();
  },
  handlers: function() {
    return $('.event').on('click', event.click);
  },
  click: function() {
    var id, t;
    t = $(this);
    id = t.data('event-id');
    return FB.api('/' + id + '/invited/me', 'post', {
      uids: ['me']
    }, function(response) {
      return console.log(response);
    });
  },
  login: function() {
    return FB.login(function(response) {
      return console.log(response);
    }, {
      scope: 'rsvp_event'
    });
  }
};
