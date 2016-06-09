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

$(function() {
	$(ctrlSelector.SIDEBAR_ITEM).click(function() {
		var i;
		var types = ($(this).attr('data-types')).split(',');
		var element = $(this).find(ctrlSelector.SIDEBAR_ITEM_CHECK);
		if (element.prop('checked')) {
			// remove
			for (i = 0; i < types.length; i++) {
				typesArray.splice(typesArray.indexOf(types[i]), 1);
			}
			element.prop('checked', false);
		} else {
			// add
			for (i = 0; i < types.length; i++) {
				typesArray.push(types[i]);
			}
			element.prop('checked', true);
		}
		UpdateMarkers();
	});
});
