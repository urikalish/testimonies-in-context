angular.module('ticApp').factory('ticConstants', function ticConstants() {

  return {
    url: {
      serverBase:         'http://localhost:1111/',
      imgBase:            'http://localhost:1111/tic/img',
      apiBase:            'http://localhost:1111/api'
    },
    ctrlId: {
      DATE_SLIDER:        'date-slider',
      MAP_PANEL_TEXT:     'tic-map__bottom-panel__text'
    },
    monthNames:           ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }
  
});
