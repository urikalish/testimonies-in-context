angular.module('ticApp').factory('ticCommServ', function ticCommServ($http, ticConstants, ticVariables) {

  function sendServerRequest(from, to, callback) {
    var req = {
      method: 'POST',
      url: ticConstants.url.apiBase,
      headers: {'Content-Type': 'application/json'},
      data: {from: from, to: to}
    };
    $http(req).then(function(response) {
      callback(response.data.markersData, response.data.eventsData);
    });
  }

  return {
    sendServerRequest: sendServerRequest
  }
  
});
