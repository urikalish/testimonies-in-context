angular.module('ticApp').factory('ticConstants', function ticConstants() {

  return {
    url: {
      serverBase:         'http://localhost:1111/',
      imgBase:            'http://localhost:1111/tic/img',
      apiBase:            'http://localhost:1111/api'
    },
    ctrlId: {
      MAP_DATE_TEXT:      'tic-map-date',
      MAP_PANEL_TEXT:     'tic-map__bottom-panel__text',
      DATE_SLIDER:        'tic-date-slider'
    },
    monthNames:           ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }
  
});
