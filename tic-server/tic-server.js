var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var ticConfig = require('./tic-config.js').ticConfig;
var ticDataProvider = require('./tic-data-provider.js').ticDataProvider;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var httpServer = http.Server(app);

//HTTP GET
app.use("/tic", express.static(__dirname + '/../tic-client'));

//HTTP POST
app.post('/api', function(req, res) {
	console.log('--------------------------------------------------------------------------------');
	var from = req.body.from;
	var to = req.body.to;
	console.log('Server API call. from ' + from + ' to ' + to);
  var jsonData = ticDataProvider.getData(parseInt(from, 10), parseInt(to, 10));
	console.log('--------------------------------------------------------------------------------');
	res.end(jsonData);
});

//LISTEN
httpServer.listen(ticConfig.SERVER_PORT, function(){
	console.log('UI available at http://localhost:' + ticConfig.SERVER_PORT.toString() + '/tic/');
	console.log('Server READY');
});
