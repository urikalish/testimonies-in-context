angular.module('ticApp').factory('ticServ', function ticServ(ticConstants, ticVariables, ticCommServ, ticMapServ) {

  function registerDateChangeListener() {
    $(ticConstants.ctrlSelector.DATE_SLIDER).on('input', function() {
      onDateChange(this.value);
    });
  }

  function onDateChange(value) {
    var year = Math.trunc(value / 12) + 1936;
    var month = value % 12 + 1;
    ticVariables.curDateStr = ticConstants.monthNames[month - 1] + ' ' + year;
    $(ticConstants.ctrlSelector.MAP_PANEL_TEXT)[0].innerHTML = ticVariables.curDateStr;
    var fromDate = year + (month < 10 ? '0' : '') + month + '01';
    var toDate = year + (month < 10 ? '0' : '') + month + '31';
    getDataFromServer(fromDate, toDate, handleServerResponse);
  }

  function updateMapPanelText(dateStr, eventsData) {
    var mapPanelText = dateStr;
    _.forEach(eventsData, function(e) {
      mapPanelText += (', ' + e.text);
    });
    $(ticConstants.ctrlSelector.MAP_PANEL_TEXT)[0].innerHTML = mapPanelText;
  }

  function getDataFromServer(fromDate, toDate, callback) {
    ticCommServ.sendServerRequest(fromDate, toDate, callback);
  }

  function handleServerResponse(markersData, eventsData) {
    ticVariables.markersData = markersData;
    ticMapServ.updateMarkers(markersData, ticVariables.visibleTypes);
    updateMapPanelText(ticVariables.curDateStr, eventsData);
  }

  function init() {
    ticMapServ.initMap();
    onDateChange(0);
    registerDateChangeListener();
  }

  return {
    init: init
  }

});

