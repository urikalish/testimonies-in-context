angular.module('ticApp').factory('ticMapServ', function ticMapServ(ticConstants, ticVariables) {

  function initMap() {
    window.googleMapObj = new google.maps.Map(
      $('#' + ticConstants.ctrlId.GOOGLE_MAP)[0],
      {
        center: new google.maps.LatLng(49, 14.5),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        styles: getMapStyles()
      }
    );
  }

  window.showLocationInStreetView = function showLoationInStreetView(lat, lng, heading, pitch) {
    var panorama = new google.maps.StreetViewPanorama(
      $('#' + ticConstants.ctrlId.GOOGLE_MAP)[0], {
        position: {
          lat: lat,
          lng: lng
        },
        pov: {
          heading: heading,
          pitch: pitch
        }
      });
    window.googleMapObj.setStreetView(panorama);
  };

  window.getInfoWindowContentHtml = function getInfoWindowHtml(data) {
    var infoWindowContentHtml = '';
    infoWindowContentHtml +=  '<div class="info-window-container">';
    infoWindowContentHtml +=      '<div class="info-window-top">';
    infoWindowContentHtml +=          '<img src="img/bookmark.png" class="info-window-bookmark"/>';
    if (data.panorama) {
      infoWindowContentHtml +=        '<img src="img/eye.png" class="info-window-eye" onclick="showLocationInStreetView(' + data.panorama.lat + ',' + data.panorama.lng+ ',' +data.panorama.heading+ ',' + data.panorama.pitch + ')"/>';
    }
    infoWindowContentHtml +=      '</div>';
    infoWindowContentHtml +=      '<div class="info-window-content">';
    infoWindowContentHtml +=          '<img src="img/left.png" class="info-window-left"/>';
    if (data.type === 'video') {
      infoWindowContentHtml +=        '<video class="info-window-video" controls autoplay><source src="' + data.embed + '" type="video/' + data.format + '"/></video>';
    } else if (data.type === 'audio') {
      infoWindowContentHtml +=        '<audio class="info-window-audio" controls><source src="' + data.embed + '" type="audio/' + data.format + '"/></audio>';
    } else if (data.img) {
      infoWindowContentHtml +=        '<img class="info-window-image" src="' + data.img + '"/>';
    }
    infoWindowContentHtml +=          '<img src="img/right.png" class="info-window-right"/>';
    infoWindowContentHtml +=      '</div>';
    infoWindowContentHtml +=      '<div class="info-window-text">' + data.text + '</div>';
    infoWindowContentHtml +=      '<div class="info-window-related"><a href="">Related items</a></div>';
    infoWindowContentHtml +=  '</div>';
    return infoWindowContentHtml;
  };

  function removeAllMarkers() {
    _.forEach(ticVariables.markers, function(m) {
      m.setMap(null);
    });
    ticVariables.markers.length = 0;
  }

  function filterMarkers(markers, types) {
    return _.filter(markers, function(item) {
      return _.indexOf(types, item.type) > -1
    });
  }

  function updateMarkers(markersData, visibleTypes) {
    removeAllMarkers();
    var filteredMarkersData = filterMarkers(markersData, visibleTypes);
    _.forEach(filteredMarkersData, function(m) {
      ticVariables.markers.push(addMarker(m));
    });
  }

  function addMarker(data) {
    var marker = new google.maps.Marker({
      map: window.googleMapObj,
      position: {lat: data.lat, lng: data.lng},
      icon: ticConstants.url.imgBase + '/' + data.type + '.png'
    });
    marker.addListener('click', function() {
      if (data.link) {
        window.open(data.link);
      } else {
        var infoWindow = new google.maps.InfoWindow({
          content: getInfoWindowContentHtml(data),
          maxWidth: 400
        });
        infoWindow.open(window.googleMapObj, marker);
      }
    });
    return marker;
  }

  return {
    initMap: initMap,
    updateMarkers: updateMarkers
  }

});
