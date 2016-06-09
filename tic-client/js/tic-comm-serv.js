angular.module('ticApp').factory('ticCommServ', function ticCommServ(/*$http,*/ ticConstants) {

  function sendServerRequest(from, to, callback) {
    // var req = {
    //   method: 'POST',
    //   url: ticConstants.url.apiBase,
    //   headers: {'Content-Type': 'application/json'},
    //   data: {from: from, to: to}
    // };
    // $http(req).then(function(response) {
    //   callback(response.data.markersData, response.data.eventsData);
    // });

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
