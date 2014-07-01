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
    $('.map').on({
      click: milo.detail
    }, '.infocta');
    $('.event').on('mouseover', map.delayzoom);
    $('.fade').on('click', milo.cancel);
    $('.nav > div').on('click', milo.nav);
    $('.container').on('click', '.button', milo.rsvpshare);
    $('.rsvp.cta').on('click', milo.share);
    return $('.rsvp2').on('click', milo.rsvpup);
  },
  picture: function() {
    var image;
    _.on('.zoom', '.fade');
    image = $(this).find('.image').data('img');
    return $('.zoom .image').css('background-image', 'url(\'./img/gallery/' + image + '\')');
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
  scroll: function(el, add) {
    return setTimeout(function() {
      if (add !== void 0) {
        return $('html,body').animate({
          scrollTop: $(el).offset().top + add
        });
      } else {
        return $('html,body').animate({
          scrollTop: $(el).offset().top
        });
      }
    }, 300);
  },
  rsvpup: function() {
    return milo.scroll('.schedule', 20);
  },
  detail: function() {
    var evt, key, t, value;
    t = $(this);
    evt = cfg.events[t.data('index')];
    $('.button').data('event', evt);
    for (key in evt) {
      value = evt[key];
      $('#' + key).html(value);
    }
    $('._start').html(evt.Date.split('/')[1] + '-' + evt.Date.split('/')[0] + '-2014 ' + moment(evt.StartTime, 'h:mm a').format('H:mm:ss'));
    if (evt.EndTime === 'N/A') {
      evt.EndTime = moment(evt.StartTime, 'h:mm a').add(1, 'hours').format('h:mm a');
    }
    $('._end').html(evt.Date.split('/')[1] + '-' + evt.Date.split('/')[0] + '-2014 ' + moment(evt.EndTime, 'h:mm a').format('H:mm:ss'));
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
      app_id: cfg.facebook.id,
      link: 'https://www.mktreattruck.com/',
      description: cfg.facebook.share
    }, function(response) {});
  },
  rsvpshare: function() {
    var evt, link, t;
    t = $(this);
    evt = t.data('event');
    if (evt.Facebook) {
      link = 'http://www.facebook.com/events/' + evt.Facebook;
    } else {
      link = 'https://www.mktreattruck.com/';
    }
    return FB.ui({
      method: 'feed',
      app_id: cfg.facebook.id,
      link: link,
      description: cfg.facebook.rsvpshare.replace('{EVENT}', evt.Event)
    }, function(response) {});
  }
};
