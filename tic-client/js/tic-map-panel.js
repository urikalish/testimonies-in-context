function updateMapPanelText(dateStr, eventsData) {
  var mapPanelText = dateStr;
  _.forEach(eventsData, function(e) {
    mapPanelText += (', ' + e.text);
  });
  $(ctrlSelector.MAP_PANEL_TEXT)[0].innerHTML = mapPanelText;
}
