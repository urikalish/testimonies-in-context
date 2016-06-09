angular.module('ticApp').factory('ticCommServ', function ticCommServ(ticConstants, ticVariables) {

  function sendServerRequest(from, to, callback) {
    $.post(ticConstants.url.apiBase, {from: from, to: to}, function(response) {
      var resObj = JSON.parse(response);
      var markersData = resObj['markersData'];
      var eventsData = resObj['eventsData'];
      callback(markersData, eventsData);
    });
  }

  return {
    sendServerRequest: sendServerRequest
  }
  
});
