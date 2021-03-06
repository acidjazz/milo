var milo;

milo = {
  facebook: {},
  scrolling: false,
  i: function() {
    var evt, index, next, now, _ref, _results;
    milo.handlers();
    next = false;
    now = moment().format('X');
    _ref = cfg.events;
    _results = [];
    for (index in _ref) {
      evt = _ref[index];
      if (now < moment(evt.Date, 'M/D').add('days', 1).format('X')) {
        cfg.events[index].next = true;
        milo.divscroll($('.events > .inner'), $('.event_' + index), -30);
        break;
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  },
  handlers: function() {
    $('.extras > .extra').on('click', milo.extra);
    $('.pictures > .inner > .picture').on('click', milo.picture);
    $('.zoom').on('click', milo.close);
    $('.close').on('click', milo.close);
    $('.event').on('click', milo.detail);
    $('.map').on({
      click: milo.detail
    }, '.infocta');
    $('.event').on('mouseover', map.delayzoom);
    $('.event').on('mouseleave', map.cancelzoom);
    $('.fade').on('click', milo.cancel);
    $('.nav > div').on('click', milo.nav);
    $('.container').on('click', '.button', milo.rsvpshare);
    $('.rsvp.cta').on('click', milo.share);
    $('.rsvp2').on('click', milo.rsvpup);
    $('.toparrow, .bottomarrow').on('mousedown', milo.startscroll);
    return $('.toparrow, .bottomarrow').on('mouseup', milo.stopscroll);
  },
  picture: function() {
    var image;
    $('.zoom').css('height', ($(window).height() - 100) + 'px');
    _.on('.zoom', '.fade');
    image = $(this).find('.image').data('img');
    $('.zoom .image').css('background-image', 'url(\'./img/gallery/' + image + '\')');
    return _.t('clickPicture', image);
  },
  extra: function() {
    var t;
    t = $(this);
    _.off('.truckevent', '.recipes', '.story');
    if (t.hasClass('experience')) {
      _.swap('.truckevent');
      milo.scroll('.truckevent');
      _.t('clickExtra', 'experience');
    }
    if (t.hasClass('recipes')) {
      _.swap('.recipes');
      milo.scroll('.recipes');
      _.t('clickExtra', 'recipes');
    }
    if (t.hasClass('story')) {
      _.swap('.story');
      milo.scroll('.story');
      return _.t('clickExtra', 'story');
    }
  },
  close: function() {
    return _.off($(this).data('el'), '.fade');
  },
  cancel: function() {
    return _.off('.modal', '.fade', '.zoom');
  },
  scroll: function(el, add, parent) {
    if (parent === void 0) {
      parent = $('html,body');
    }
    return setTimeout(function() {
      if (add !== void 0) {
        return parent.animate({
          scrollTop: $(el).offset().top + add
        });
      } else {
        return parent.animate({
          scrollTop: $(el).offset().top
        });
      }
    }, 300);
  },
  divscroll: function(parent, el, add) {
    return parent.animate({
      scrollTop: el.position().top + add
    }, 300);
  },
  rsvpup: function() {
    milo.scroll('.schedule', -50);
    return _.t('clickRsvp', 'scrollUp');
  },
  detail: function() {
    var evt, key, t, value;
    t = $(this);
    evt = cfg.events[t.data('index')];
    _.t('clickEvent', evt.Event);
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
    $('._location').html('Follow Us on Twitter for Details!');
    $('.addressLine').hide();
    $('.followLine').show();
    if (evt.Type !== 'Guerilla') {
      $('._location').html(evt.Address + ', ' + evt.City + ' ' + evt.State);
      $('.addressLine').show();
      $('.followLine').hide();
    }
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
    pages = 8;
    for (p = _i = 1; 1 <= pages ? _i <= pages : _i >= pages; p = 1 <= pages ? ++_i : --_i) {
      i.removeClass('page' + p);
    }
    if (t.hasClass('next')) {
      page = currentpage === pages ? 1 : currentpage + 1;
    }
    if (t.hasClass('prev')) {
      page = currentpage === 1 ? pages : currentpage - 1;
    }
    i.addClass('page' + page);
    i.data('page', page);
    return _.t('clickGallery', page);
  },
  share: function() {
    _.t('fbGeneralShare', 'clicked');
    return FB.ui({
      method: 'feed',
      app_id: cfg.facebook.id,
      link: 'https://www.mktreattruck.com/',
      description: cfg.facebook.share
    }, function(response) {
      if (response) {
        return _.t('fbGeneralShare', 'success', response.post_id);
      } else {
        return _.t('fbGeneralShare', 'failure');
      }
    });
  },
  rsvpshare: function() {
    var evt, link, t;
    t = $(this);
    evt = t.data('event');
    if (evt.Facebook) {
      link = 'http://www.facebook.com/events/' + evt.Facebook;
    } else {
      link = 'https://www.mktreattruck.com/';
      _.t('fbEventShare', 'clicked');
    }
    return FB.ui({
      method: 'feed',
      app_id: cfg.facebook.id,
      link: link,
      description: cfg.facebook.rsvpshare.replace('{EVENT}', evt.Event)
    }, function(response) {});
  },
  startscroll: function() {
    var action;
    milo.scrolling = true;
    action = $(this).hasClass('bottomarrow') ? '+=40em' : '-=40em';
    return milo.scroller($('.events .inner'), action);
  },
  stopscroll: function() {
    return milo.scrolling = false;
  },
  scroller: function(obj, param) {
    return obj.animate({
      scrollTop: param
    }, 'linear', function() {
      if (milo.scrolling) {
        return milo.scroller(obj, param);
      }
    });
  }
};
