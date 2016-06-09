function updateMapPanelText(eventsData) {
  var i;
  var mapPanelText = curDateStr;
  for (i = 0; i < eventsData.length; i++) {
    mapPanelText += (' - ' + eventsData[i].text);
  }
  $(ctrlSelector.MAP_PANEL_TEXT)[0].innerHTML = mapPanelText;
}
