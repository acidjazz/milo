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
    return FB.api(id + '/invited/me', 'post', [], function(response) {
      return console.log(response);
    });
  }
};
