var ticDataProvider = {

  getData: function getData(from, to) {
    var i, j;
    var data = {
      markersData: [],
      eventsData: []
    };
    var markerTypes = require('./tic-config.js').ticConfig.DATA_TYPES;
    for (i = 0; i < markerTypes.length; i++) {
      var markersData = require('./data/markers-data-' + markerTypes[i] + '.js').data;
      for (j = 0; j < markersData.length; j++) {
        if (markersData[j].from <= to && markersData[j].to >= from) {
          data.markersData.push(markersData[j]);
        }
      }
    }
    var eventsData = require('./data/events-data.js').eventsData;
    for (i = 0; i < eventsData.length; i++) {
      if (eventsData[i].from <= to && eventsData[i].to >= from) {
        data.eventsData.push(eventsData[i]);
      }
    }
    var jsonData = JSON.stringify(data, null, 4);
    console.log(jsonData);
    console.log('From: ' + from + ', To: ' + to + ', Markers: ' + data.markersData.length + ', Events: ' + data.eventsData.length);
    return jsonData;
  }
};

exports.ticDataProvider = ticDataProvider;
