var map;

map = {
  lng: '38.6233905',
  lat: '-98.3149553',
  markers: [],
  infos: [],
  gmap: {},
  i: function() {
    var content, evt, index, infowindow, latlng, mapOptions, marker, styledMap, styles, truck, _i, _len, _ref, _results;
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
            weight: 3.4
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
    mapOptions = {
      center: new google.maps.LatLng(map.lng, map.lat),
      zoom: 3,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    };
    map.gmap = new google.maps.Map(document.getElementById("map"), mapOptions);
    map.gmap.mapTypes.set('map_style', styledMap);
    map.gmap.setMapTypeId('map_style');
    latlng = new google.maps.LatLng('37.7965073', '-122.3811079');
    truck = {
      url: 'img/truckicon.svg',
      scaledSize: new google.maps.Size(25, 15)
    };
    marker = new google.maps.Marker({
      position: latlng,
      map: map.gmap,
      title: 'hello world',
      animation: google.maps.Animation.DROP,
      icon: truck
    });
    content = '<div> this is an info window for an event</div>';
    infowindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', function() {
      return infowindow.open(map, marker);
    });
    _ref = cfg.events;
    _results = [];
    for (evt = _i = 0, _len = _ref.length; _i < _len; evt = ++_i) {
      index = _ref[evt];
      _results.push(map.mevent(evt, index));
    }
    return _results;
  },
  mevent: function(index, evt) {
    var latlong, paw;
    latlong = evt.LatLong.split(/,\s*/);
    paw = {
      url: 'img/paw_dark.png',
      scaledSize: new google.maps.Size(25, 25)
    };
    map.markers[index] = new google.maps.Marker({
      position: new google.maps.LatLng(latlong[0], latlong[1]),
      map: map.gmap,
      title: evt.Description,
      animation: google.maps.Animation.DROP,
      icon: paw
    });
    map.infos[index] = new google.maps.InfoWindow({
      content: "<div> " + evt.Title + " </div>"
    });
    return google.maps.event.addListener(map.markers[index], 'click', function() {
      return map.infos[index].open(map.gmap, map.markers[index]);
    });
  }
};
