var milo;

milo = {
  facebook: {},
  i: function() {
    return milo.handlers();
  },
  handlers: function() {
    $('.extras > .extra').on('click', milo.extra);
    $('.pictures > .inner > .picture').on('click', milo.picture);
    $('.close').on('click', milo.close);
    $('.event').on('click', milo.detail);
    $('.fade').on('click', milo.cancel);
    $('.nav > div').on('click', milo.nav);
    $('.container').on('click', '.button', milo.rsvpshare);
    return $('.rsvp.cta').on('click', milo.share);
  },
  picture: function() {
    var image;
    _.on('.zoom', '.fade');
    image = $(this).find('.image').data('img');
    return $('.zoom .image').css('background-image', 'url( ' + image + ')');
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
    $('.button').data('event', evt);
    for (key in evt) {
      value = evt[key];
      $('#' + key).html(value);
    }
    $('._start').html(evt.Date.split('/')[1] + '-' + evt.Date.split('/')[0] + '-2014');
    if (evt.EndTime) {
      $('._end').html(evt.Date.split('/')[1] + '-' + evt.Date.split('/')[0] + '-2014');
    }
    $('._summary').html(evt.Title + ' at ' + evt.Event);
    $('._description').html(evt.Description);
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
    i = $('.pictures > .inner');
    currentpage = i.data('page');
    pages = 3;
    for (p = _i = 1; _i <= 3; p = ++_i) {
      i.removeClass('page' + p);
    }
    if (t.hasClass('next')) {
      page = currentpage === 3 ? 1 : currentpage + 1;
    }
    if (t.hasClass('prev')) {
      page = currentpage === 1 ? 3 : currentpage - 1;
    }
    i.addClass('page' + page);
    return i.data('page', page);
  },
  share: function() {
    return FB.ui({
      method: 'feed',
      app_id: milo.facebook.id,
      link: 'https://milo.256.sh/',
      picture: milo.meta.image,
      description: milo.facebook.share
    }, function(response) {});
  },
  rsvpshare: function() {
    var evt, link, t;
    t = $(this);
    evt = t.data('event');
    if (evt.Facebook) {
      link = 'http://www.facebook.com/events/' + evt.Facebook;
    } else {
      link = 'https://milo.256.sh/';
    }
    return FB.ui({
      method: 'feed',
      app_id: milo.facebook.id,
      link: link,
      picture: milo.meta.image,
      description: milo.facebook.rsvpshare.replace('{EVENT}', evt.Event)
    }, function(response) {});
  }
};
