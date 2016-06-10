var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var dataProvider = require('./tic-data-provider.js').dataProvider;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var httpServer = http.Server(app);
var port = 1111;

//HTTP GET
app.use("/tic", express.static(__dirname + '/../tic-client'));

//HTTP POST
app.post('/api', function(req, res) {
	console.log('--------------------------------------------------------------------------------');
	var from = req.body.from;
	var to = req.body.to;
	console.log('Server API call. from ' + from + ' to ' + to);
  var jsonData = dataProvider.getData(parseInt(from, 10), parseInt(to, 10));
	console.log('--------------------------------------------------------------------------------');
	res.end(jsonData);
});

//LISTEN
httpServer.listen(port, function(){
	console.log('UI available at http://localhost:' + port.toString() + '/tic/');
	console.log('Server READY');
});
