var serverUrl = 'http://localhost:1111/';
var serverImgBaseUrl = serverUrl + 'tic/img';
var serverApiUrl = serverUrl + 'api';
var typesArray = ['ghetto', 'camp', 'picture','document','video', 'audio', 'resistance', 'righteous', 'allied'];
var mapCanvas;
var map;
var infoWindow;
var curDateStr;
var allMarkers;
var markers = [];

function mapsLoaded() {
	var mapOptions;
	mapCanvas = document.getElementById('map');
  mapOptions = {
	center: new google.maps.LatLng(49, 14.5),
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
	styles: getMapStyles()
	};
	map = new google.maps.Map(mapCanvas, mapOptions);
	onDateChange(0);
	$('#range').on('input', function() {
		onDateChange(this.value);
	});
}

function initialize() {

	google.load('maps', '3.7', {
		'other_params' : 'sensor=false&libraries=places&language=' + 'en',
		'callback' : mapsLoaded
	});
}

function onDateChange(value) {
	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var year = Math.trunc(value / 12) + 1936;
	var month = value % 12 + 1;
	curDateStr = monthNames[month - 1] + ' ' + year;
	$('#date')[0].innerHTML = curDateStr;
	var fromDate = year + (month < 10 ? '0' : '') + month + '01';
	var toDate = year + (month < 10 ? '0' : '') + month + '31';
	getMarkers(fromDate, toDate);
}

function removeAllMarkers() {
	var i;
	for (i=0; i<markers.length; i++) {
		markers[i].setMap(null);
	}
	markers.length = 0;
}

function getMarkers(from, to) {
	sendServerRequest(from, to);
}

function sendServerRequest(from, to)
{
    $.post(serverApiUrl,{from: from, to: to}, function(response){
			onServerResponse(response);
		});
}

function FilterMarkers() {
	var retVal = _.filter(allMarkers, function(item) {
		return _.indexOf(typesArray, item.type) > -1
	});
	return retVal;
}

function UpdateMarkers() {
	removeAllMarkers();
	var markersData = FilterMarkers();
	for (var i=0; i<markersData.length; i++) {
		addMarker(markersData[i]);
	}
}

function onServerResponse(response) {
	var i;
	var resObj = JSON.parse(response);
	var eventsData = resObj['eventsData'];
	allMarkers = resObj['markersData'];
	UpdateMarkers();
	var dateText = curDateStr;
	for (i=0; i<eventsData.length; i++) {
		dateText += (' - ' + eventsData[i].text);
	}
	$('#date')[0].innerHTML = dateText;
}

function addMarker(data) {
	var marker, contentString, infowindow;
	var topbarHtmlTemplate = '<div><img src="img/bookmark.png" class="infowindow-bookmark"/><img src="img/eye.png" class="infowindow-eye" onclick="ShowLoationInStreetView(50.037141,19.180081)"/></div>';
	var textHtmlTemplate = '<div class="infowindow-text">' + data.text + '</div>';
	var relatedItemsHtmlTemplate = '<div class="infowindow-related"><a href="">Related items</a></div>';
	if (data.type === 'video') {
		contentString = '<div style="margin-top:20px">' + topbarHtmlTemplate + '<div class="infowindow-content"><img src="img/left.png" class="infowindow-left"/>' + '<video class="infowindow-video" controls autoplay><source src="' + data.url + '" type="video/mp4"/></video>' + '<img src="img/right.png" class="infowindow-right"/></div>' + textHtmlTemplate + relatedItemsHtmlTemplate + '</div>';
	} else if (data.type === 'audio') {
		contentString = '<div style="margin-top:20px">' + topbarHtmlTemplate + '<div class="infowindow-content"><img src="img/left.png" class="infowindow-left"/>' + '<audio class="infowindow-audio" controls><source src="' + data.url + '" type="audio/ogg"/></audio>' + '<img src="img/right.png" class="infowindow-right"/></div>' + textHtmlTemplate + relatedItemsHtmlTemplate + '</div>';
	} else {
		contentString = '<div style="margin-top:20px">' + topbarHtmlTemplate + '<div class="infowindow-content"><img src="img/left.png" class="infowindow-left"/>' + (data.url ? '<img class="infowindow-image" src="' + data.url + '"/>' : '') + '<img src="img/right.png" class="infowindow-right"/></div>' + textHtmlTemplate  + relatedItemsHtmlTemplate + '</div>';
	}
	marker = new google.maps.Marker({
		map: map,
		position: {lat: data.lat, lng: data.lng},
		icon: serverImgBaseUrl + '/' + data.type + '.png'});
	infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 400
	});
	marker.addListener('click', function() {
		if (data.type === 'document') {
			window.open(data.url);
		} else {
			infowindow.open(map, marker);
		}
	});
  markers.push(marker);
	return marker;
}

$(function() {
	$('#sidebar .item').click(function() {
		var i;
		var types = ($(this).attr('data-types')).split(',');
		var element = $(this).find('.chkbox');
		if (element.prop('checked'))
		{
			// remove
			for (i=0; i<types.length; i++) {
				typesArray.splice(typesArray.indexOf(types[i]), 1);
			}
			element.prop('checked', false);
		} else {
			// add
			for (i=0; i<types.length; i++) {
				typesArray.push(types[i]);
			}
			element.prop('checked', true);
		}
		UpdateMarkers();
	});
});

function ShowAuswitch() {
	ShowLoationInStreetView(50.037141,19.180081);
}

function ShowLoationInStreetView(lat, lon) {
	var fenway = {'lat': lat, 'lng': lon};
	var panorama = new google.maps.StreetViewPanorama(
		document.getElementById('map'), {
			position: fenway,
			pov: {
				heading: 34,
				pitch: 10
			}
		});
	map.setStreetView(panorama);
}

google.maps.event.addDomListener(window, 'load', initialize);

function getMapStyles() {
	var styles = [
		{
			'featureType':'administrative.country',
			'elementType':'labels',
			'stylers': [
				{
					'weight':'0.40'
				},
				{
					'color':'#fefcfc'
				}
			]
		},
		{
			'featureType':'administrative.country',
			'elementType':'labels.text',
			'stylers': [
				{
					'weight':'0.28'
				}
			]
		},
		{
			'featureType':'administrative.province',
			'elementType':'all',
			'stylers': [
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'administrative.province',
			'elementType':'labels',
			'stylers': [
				{
					'weight':'0.08'
				},
				{
					'color':'#e2e2e2'
				}
			]
		},
		{
			'featureType':'administrative.locality',
			'elementType':'labels',
			'stylers': [
				{
					'color':'#bdbdbd'
				},
				{
					'weight':'0.01'
				}
			]
		},
		{
			'featureType':'administrative.land_parcel',
			'elementType':'all',
			'stylers': [
				{
					'visibility':'off'
				},
				{
					'color':'#e81e1e'
				}
			]
		},
		{
			'featureType':'administrative.land_parcel',
			'elementType':'labels',
			'stylers': [
				{
					'weight':'0.01'
				}
			]
		},
		{
			'featureType':'landscape',
			'elementType':'all',
			'stylers': [
				{
					'visibility':'on'
				},
				{
					'color':'#413f3f'
				}
			]
		},
		{
			'featureType':'poi',
			'elementType':'all',
			'stylers': [
				{
					'saturation': -100
				},
				{
					'lightness': 51
				},
				{
					'visibility':'off'
				},
				{
					'color':'#dee2e4'
				}
			]
		},
		{
			'featureType':'poi.attraction',
			'elementType':'all',
			'stylers': [
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'poi.business',
			'elementType':'all',
			'stylers': [
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'poi.business',
			'elementType':'labels.icon',
			'stylers': [
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'poi.government',
			'elementType':'all',
			'stylers': [
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'poi.medical',
			'elementType':'all',
			'stylers': [
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'poi.park',
			'elementType':'all',
			'stylers': [
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'poi.place_of_worship',
			'elementType':'all',
			'stylers': [
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'poi.school',
			'elementType':'all',
			'stylers': [
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'poi.sports_complex',
			'elementType':'all',
			'stylers': [
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'road',
			'elementType':'labels',
			'stylers': [
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'road.highway',
			'elementType':'all',
			'stylers': [
				{
					'saturation': -100
				},
				{
					'visibility':'off'
				},
				{
					'color':'#a9a9a9'
				}
			]
		},
		{
			'featureType':'road.highway',
			'elementType':'labels',
			'stylers': [
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'road.highway.controlled_access',
			'elementType':'all',
			'stylers': [
				{
					'visibility':'off'
				},
				{
					'color':'#555555'
				}
			]
		},
		{
			'featureType':'road.arterial',
			'elementType':'all',
			'stylers': [
				{
					'saturation': -100
				},
				{
					'lightness': 30
				},
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'road.local',
			'elementType':'all',
			'stylers': [
				{
					'saturation': -100
				},
				{
					'lightness': 40
				},
				{
					'visibility':'off'
				},
				{
					'color':'#00f1ff'
				}
			]
		},
		{
			'featureType':'transit',
			'elementType':'all',
			'stylers': [
				{
					'saturation': -100
				},
				{
					'visibility':'simplified'
				}
			]
		},
		{
			'featureType':'transit',
			'elementType':'labels',
			'stylers': [
				{
					'visibility':'off'
				}
			]
		},
		{
			'featureType':'water',
			'elementType':'all',
			'stylers': [
				{
					'color':'#757b7f'
				}
			]
		},
		{
			'featureType':'water',
			'elementType':'geometry',
			'stylers': [
				{
					'lightness': -25
				},
				{
					'saturation': -97
				},
				{
					'color':'#616161'
				}
			]
		},
		{
			'featureType':'water',
			'elementType':'labels',
			'stylers': [
				{
					'visibility':'on'
				},
				{
					'lightness': -25
				},
				{
					'saturation': -100
				},
				{
					'weight':'0.10'
				}
			]
		}
	];
	return styles;
}
