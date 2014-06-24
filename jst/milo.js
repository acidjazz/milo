var milo;

milo = {
  i: function() {
    return milo.handlers();
  },
  handlers: function() {
    $('.extras > .extra').on('click', milo.extra);
    $('.close').on('click', milo.close);
    $('.event').on('click', milo.detail);
    $('.fade').on('click', milo.cancel);
    return $('.nav > div').on('click', milo.nav);
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
    var evt, key, t, value;
    t = $(this);
    evt = t.data('event');
    for (key in evt) {
      value = evt[key];
      $('#' + key).html(value);
    }
    return _.on('.fade', '.modal');
  },
  nav: function() {
    var i, p, pages, t;
    t = $(this);
    p = t.data('page');
    i = $('.pictures > .inner');
    pages = 3;
    return i.removeClass('one').addClass('two');
  }
};
