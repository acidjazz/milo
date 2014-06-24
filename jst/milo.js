var milo;

milo = {
  i: function() {
    return milo.handlers();
  },
  handlers: function() {
    $('.extras > .extra').on('click', milo.extra);
    $('.pictures > .inner > .picture').on('click', milo.picture);
    $('.close').on('click', milo.close);
    $('.event').on('click', milo.detail);
    $('.fade').on('click', milo.cancel);
    return $('.nav > div').on('click', milo.nav);
  },
  picture: function() {
    return _.on('.zoom', '.fade');
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
    return _.off('.modal', '.fade', '.zoom');
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
    $('._start').html(evt.Date.split('/')[1] + '-' + evt.Date.split('/')[0] + '-2014 00:00:00');
    $('._end').html(evt.Date.split('/')[1] + '-' + evt.Date.split('/')[0] + '-2014 23:00:00');
    $('._summary').html(evt.Event);
    $('._description').html(evt.Event + 'in ' + evt.Market);
    $('._location').html(evt.Address + ', ' + evt.City + ' ' + evt.State);
    if (evt.Facebook) {
      $('._facebook_event').html('http://www.facebook.com/events/' + evt.Facebook);
    } else {
      $('._facebook_event').html();
    }
    addthisevent.refresh();
    return _.on('.fade', '.modal');
  },
  nav: function() {
    var currentpage, i, p, page, pages, t, _i;
    t = $(this);
    currentpage = t.data('page');
    i = $('.pictures > .inner');
    pages = 3;
    for (p = _i = 1; _i <= 3; p = ++_i) {
      t.removeClass('page' + p);
    }
    if (t.hasClass('next')) {
      page = currentpage === 3 ? 1 : currentpage + 1;
    }
    if (t.hasClass('prev')) {
      page = currentpage === 1 ? 3 : currentpage - 1;
    }
    i.addClass('page' + page);
    return t.data('page', page);
  }
};
