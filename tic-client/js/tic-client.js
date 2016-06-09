var serverUrl = 'http://localhost:1111/';
var serverImgBaseUrl = serverUrl + 'tic/img';
var serverApiUrl = serverUrl + 'api';

function sendServerRequest(from, to) {
	$.post(serverApiUrl,{from: from, to: to}, function(response){
		onServerResponse(response);
	});
}

function onServerResponse(response) {
	var resObj = JSON.parse(response);
	var eventsData = resObj['eventsData'];
	allMarkers = resObj['markersData'];
	UpdateMarkers();
	updateMapPanelText(eventsData);
}
