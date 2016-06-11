angular.module('ticApp').factory('ticServ', function ticServ(ticConstants, ticVariables, ticCommServ, ticMapServ) {

  function registerDateChangeListener() {
    $('#' + ticConstants.ctrlId.DATE_SLIDER).on('input', function() {
      onDateChange(this.value);
    });
  }

  function onDateChange(value) {
    var year = Math.trunc(value / 12) + 1936;
    var month = value % 12 + 1;
    ticVariables.curDateStr = ticConstants.monthNames[month - 1] + ' ' + year;
    $('#' + ticConstants.ctrlId.MAP_DATE_TEXT)[0].innerHTML = ticVariables.curDateStr.substring(0, 3) + ' ' + ('' + year).substring(2);
    $('#' + ticConstants.ctrlId.MAP_PANEL_TEXT)[0].innerHTML = ticVariables.curDateStr;
    var fromDate = year + (month < 10 ? '0' : '') + month + '01';
    var toDate = year + (month < 10 ? '0' : '') + month + '31';
    getDataFromServer(fromDate, toDate, handleServerResponse);
  }

  function updateMapPanelText(dateStr, eventsData) {
    var mapPanelText = dateStr;
    _.forEach(eventsData, function(e) {
      mapPanelText += (', ' + e.text);
    });
    $('#' + ticConstants.ctrlId.MAP_PANEL_TEXT)[0].innerHTML = mapPanelText;
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
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      ticMapServ.initMap();
      onDateChange(44);
      registerDateChangeListener();
    } else {
      $('#' + ticConstants.ctrlId.TIC_CONTAINER)[0].style.display = 'none';
      var errMsgCtrl = $('#' + ticConstants.ctrlId.ERR_MESSAGE)[0];
      errMsgCtrl.innerHTML = 'Your browser type is not yet supported, please use Chrome.';
      errMsgCtrl.style.display = 'inline';
    }
  }

  return {
    init: init
  }

});

