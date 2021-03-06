var map;

map = {
  lat: '39.9755172',
  long: '-98.8407857',
  centerpos: {},
  markers: [],
  infos: [],
  gmap: {},
  timer: false,
  cancelzoom: function() {
    if (map.timer !== false) {
      return clearTimeout(map.timer);
    }
  },
  delayzoom: function() {
    var index;
    index = $(this).data('index');
    if (map.timer !== false) {
      clearTimeout(map.timer);
    }
    return map.timer = setTimeout(function() {
      return map.zoom(index);
    }, 500);
  },
  zoom: function(index) {
    if (!map.markers[index] || isNaN(map.markers[index].position.B)) {
      return false;
    }
    map.gmap.setZoom(10);
    map.gmap.panTo(map.markers[index].position);
    map.openinfo(index);
    return map.bounce(index);
  },
  center: function() {
    if (map.timer !== false) {
      clearTimeout(map.timer);
    }
    map.gmap.setZoom(4);
    map.gmap.panTo(map.centerpos);
    return map.openinfo(false);
  },
  i: function() {
    var mapOptions, styledMap, styles;
    styles = [
      {
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#F4e9d8"
          }
        ]
      }, {
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#9a5107"
          }, {
            weight: 1.5
          }
        ]
      }, {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9a5107"
          }
        ]
      }, {
        featureType: "water",
        stylers: [
          {
            color: "#092e6e"
          }
        ]
      }
    ];
    styledMap = new google.maps.StyledMapType(styles, {
      name: 'Styled Map'
    });
    map.centerpos = new google.maps.LatLng(map.lat, map.long);
    mapOptions = {
      center: map.centerpos,
      zoom: 4,
      mapTypeControl: false,
      navigationControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map.gmap = new google.maps.Map(document.getElementById("map"), mapOptions);
    map.gmap.mapTypes.set('map_style', styledMap);
    map.gmap.setMapTypeId('map_style');
    return $.each(cfg.events, function(index, evt) {
      return setTimeout(function() {
        return map.mevent(index, evt);
      }, 50 * index);
    });
  },
  mevent: function(index, evt) {
    var latlong, paw;
    latlong = evt.LatLong.split(/,\s*/);
    paw = {
      url: 'img/paw_dark.png',
      scaledSize: new google.maps.Size(25, 25)
    };
    if (evt.next === true) {
      paw = {
        url: 'img/truckicon.svg',
        scaledSize: new google.maps.Size(40, 25)
      };
    }
    map.markers[index] = new google.maps.Marker({
      position: new google.maps.LatLng(latlong[0], latlong[1]),
      map: map.gmap,
      title: evt.Description,
      animation: google.maps.Animation.DROP,
      icon: paw
    });
    map.infos[index] = new google.maps.InfoWindow({
      content: "<div class='clear'></div><div class='info'> " + evt.Date + ": " + evt.Event + " <div class='infocta' data-index='" + index + "'>RSVP / Share</div></div>"
    });
    return google.maps.event.addListener(map.markers[index], 'click', function() {
      return map.openinfo(index);
    });
  },
  openinfo: function(index) {
    var i, info, _i, _len, _ref;
    _ref = map.infos;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      info = _ref[i];
      info.close();
    }
    if (index !== false) {
      return map.infos[index].open(map.gmap, map.markers[index]);
    }
  },
  bounce: function(index) {
    var i, marker, _i, _len, _ref;
    _ref = map.markers;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      marker = _ref[i];
      marker.setAnimation(null);
    }
    if (index !== false) {
      map.markers[index].setAnimation(google.maps.Animation.BOUNCE);
    }
    return setTimeout(function() {
      return map.markers[index].setAnimation(null);
    }, 2100);
  }
};
