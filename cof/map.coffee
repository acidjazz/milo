map =

  lat: '39.9755172'
  long: '-98.8407857'
  centerpos: {}
  markers: []
  infos: []
  gmap: {}
  timer: false

  delayzoom: ->

    index = $(this).data 'index'

    clearTimeout map.timer if map.timer isnt false

    map.timer = setTimeout ->
      map.zoom index
    , 250

  zoom: (index) ->
    return false if !map.markers[index] or isNaN map.markers[index].position.A
    map.gmap.setZoom 10
    map.gmap.panTo map.markers[index].position
    map.openinfo index
    map.bounce index
    

  center: ->
    clearTimeout map.timer if map.timer isnt false
    map.gmap.setZoom 4
    map.gmap.panTo map.centerpos
    map.openinfo false


  i: ->

    styles =
      [
        {
          elementType: "geometry.fill"
          stylers: [color: "#F4e9d8"]
        }
        {
          elementType: "geometry.stroke"
          stylers: [
            {
              color: "#9a5107"
            }
            {
              weight: 1.5
            }
          ]
        }
        {
          elementType: "labels.text.fill"
          stylers: [color: "#9a5107"]
        }
        {
          featureType: "water"
          stylers: [color: "#092e6e"]
        }
      ]

    styledMap = new google.maps.StyledMapType styles,
      name: 'Styled Map'

    map.centerpos = new google.maps.LatLng map.lat, map.long
    mapOptions =
      center: map.centerpos 
      zoom: 4
      mapTypeControl: false
      navigationControl: false
      streetViewControl: false
      mapTypeId: google.maps.MapTypeId.ROADMAP

    map.gmap = new google.maps.Map(document.getElementById("map"), mapOptions)
    map.gmap.mapTypes.set 'map_style', styledMap
    map.gmap.setMapTypeId 'map_style'

    #map.mevent(evt, index) for index, evt in cfg.events

    $.each cfg.events, (index, evt) ->
      setTimeout ->
        map.mevent index, evt
      , 50*index

  mevent: (index, evt) ->

    latlong = evt.LatLong.split(/,\s*/)

    paw =
      url: 'img/paw_dark.png',
      scaledSize: new google.maps.Size(25, 25)

    map.markers[index] = new google.maps.Marker
      position: new google.maps.LatLng latlong[0], latlong[1]
      map: map.gmap
      title: evt.Description
      animation: google.maps.Animation.DROP
      icon: paw

    map.infos[index] = new google.maps.InfoWindow
      content: "<div class='clear'></div><div class='info'> #{evt.Date}: #{evt.Event} <div class='infocta' data-index='#{index}'>RSVP / Share</div></div>"

    google.maps.event.addListener map.markers[index], 'click', ->
      map.openinfo index

  openinfo: (index) ->

    info.close() for info, i in map.infos
    map.infos[index].open map.gmap, map.markers[index] if index isnt false

  bounce: (index) ->
    marker.setAnimation null for marker, i in map.markers
    map.markers[index].setAnimation google.maps.Animation.BOUNCE if index isnt false
  

