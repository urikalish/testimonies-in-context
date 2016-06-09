function sendServerRequest(from, to) {
	$.post(serverApiUrl,{from: from, to: to}, function(response){
		onServerResponse(response);
	});
}

function onServerResponse(response) {
	var resObj = JSON.parse(response);
	var eventsData = resObj['eventsData'];
	markersData = resObj['markersData'];
	updateMarkers(markersData, visibleTypes);
	updateMapPanelText(curDateStr, eventsData);
}
