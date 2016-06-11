angular.module('ticApp').factory('ticConstants', function ticConstants() {

  var protocol = 'http';
  var server = 'localhost';
  var port = 1111;
  var imgBase = protocol + '://' + server + ':' + port + '/tic/img';
  var apiBase = protocol + '://' + server + ':' + port + '/api';

  return {
    url: {
      imgBase:            imgBase,
      apiBase:            apiBase
    },
    ctrlId: {
      GOOGLE_MAP:         'google-map',
      MAP_DATE_TEXT:      'tic-map-date',
      MAP_PANEL_TEXT:     'tic-map__bottom-panel__text',
      DATE_SLIDER:        'tic-date-slider'
    },
    monthNames:           ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }
  
});
