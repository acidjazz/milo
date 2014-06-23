var milo;

milo = {
  i: function() {
    return milo.handlers();
  },
  handlers: function() {
    $('.extras > .extra').on('click', milo.extra);
    $('.close').on('click', milo.close);
    $('.event').on('click', milo.detail);
    return $('.fade').on('click', milo.cancel);
  },
  extra: function() {
    var t;
    t = $(this);
    _.off('.truckevent', '.recipes', '.story');
    if (t.hasClass('experience')) {
      _.swap('.truckevent');
      milo.scroll('.truckevent');
    }
    if (t.hasClass('recipes')) {
      _.swap('.recipes');
      milo.scroll('.recipes');
    }
    if (t.hasClass('story')) {
      _.swap('.story');
      return milo.scroll('.story');
    }
  },
  close: function() {
    return _.off($(this).data('el'), '.fade');
  },
  cancel: function() {
    return _.off('.modal', '.fade');
  },
  scroll: function(el) {
    return setTimeout(function() {
      return $('html,body').animate({
        scrollTop: $(el).offset().top
      });
    }, 300);
  },
  detail: function() {
    var evt, t;
    t = $(this);
    evt = t.data('event');
    $('.event_date').html(evt.date);
    $('.event_title').html(evt.title);
    $('.event_location').html(evt.location);
    return _.on('.fade', '.modal');
  }
};
