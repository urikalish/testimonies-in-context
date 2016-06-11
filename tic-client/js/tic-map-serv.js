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

  window.showLoationInStreetView = function showLoationInStreetView(lat, lon) {
    var fenway = {'lat': lat, 'lng': lon};
    var panorama = new google.maps.StreetViewPanorama(
      $('#' + ticConstants.ctrlId.GOOGLE_MAP)[0], {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
    window.googleMapObj.setStreetView(panorama);
  };

  function addMarker(data) {
    var marker, contentString, infowindow;
    var topbarHtmlTemplate = '<div><img src="img/bookmark.png" class="info-window-bookmark"/><img src="img/eye.png" class="info-window-eye" onclick="showLoationInStreetView(50.037141, 19.180081)"/></div>';
    var textHtmlTemplate = '<div class="info-window-text">' + data.text + '</div>';
    var relatedItemsHtmlTemplate = '<div class="info-window-related"><a href="">Related items</a></div>';
    if (data.type === 'video') {
      contentString = '<div style="margin-top:20px">' + topbarHtmlTemplate + '<div class="info-window-content"><img src="img/left.png" class="info-window-left"/>' + '<video class="info-window-video" controls autoplay><source src="' + data.url + '" type="video/mp4"/></video>' + '<img src="img/right.png" class="info-window-right"/></div>' + textHtmlTemplate + relatedItemsHtmlTemplate + '</div>';
    } else if (data.type === 'audio') {
      contentString = '<div style="margin-top:20px">' + topbarHtmlTemplate + '<div class="info-window-content"><img src="img/left.png" class="info-window-left"/>' + '<audio class="info-window-audio" controls><source src="' + data.url + '" type="audio/ogg"/></audio>' + '<img src="img/right.png" class="info-window-right"/></div>' + textHtmlTemplate + relatedItemsHtmlTemplate + '</div>';
    } else {
      contentString = '<div style="margin-top:20px">' + topbarHtmlTemplate + '<div class="info-window-content"><img src="img/left.png" class="info-window-left"/>' + (data.url ? '<img class="info-window-image" src="' + data.url + '"/>' : '') + '<img src="img/right.png" class="info-window-right"/></div>' + textHtmlTemplate + relatedItemsHtmlTemplate + '</div>';
    }
    marker = new google.maps.Marker({
      map: window.googleMapObj,
      position: {lat: data.lat, lng: data.lng},
      icon: ticConstants.url.imgBase + '/' + data.type + '.png'
    });
    infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 400
    });
    marker.addListener('click', function() {
      if (data.type === 'document') {
        window.open(data.url);
      } else {
        infowindow.open(window.googleMapObj, marker);
      }
    });
    return marker;
  }

  return {
    initMap: initMap,
    updateMarkers: updateMarkers
  }

});
