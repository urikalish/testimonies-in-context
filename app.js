var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var http = require('http').Server(app);
var port = 1111;

var realMarkersData = [
	{type:'document', from: 19421001, to: 19421130 , lat: 48.866667, lng: 25, url: 'http://62.90.197.96:80/html/data_yvs/yadmedia1/full_pdf_srika/3565215_03109790/0001.pdf', text: ''}, //from Amit
	{type:'document', from: 19420101, to: 19421231 , lat: 47.4925, lng: 19.0514, url: 'http://62.90.197.96:80/html/data_yvs/yadmedia1/full_pdf_srika/3747667_03118064/0001.pdf', text: ''}, //from Amit
	{type: 'video', from: 19330101, to: 19451001, lat: 47.6167, lng: 17.25, url: 'http://62.90.197.96/html/data_yvs/visualmedia/Movies_PROD12/34536_1_04045757_CROP.mp4', text: 'Hava Reichman'},
	{type: 'video', from: 19330101, to: 19451001, lat: 48.6239, lng: 22.3, url: 'http://62.90.197.96:80/html/data_yvs/visualmedia/Movies_PROD12/62106_1_04030088_CROP.mp4', text: 'Avraham Tzvieli'},
	{type: 'audio', from: 19330101, to: 19451001, lat: 47.1569, lng: 27.5903, url: 'http://62.90.197.96/html/data_yvs/visualmedia/AUDIO_PROD01/108585_1_04043508.ogg', text: 'Eti Dvorah Pinzaru'},
	{type: 'ghetto', from: 19401001, to: 19430401, lat: 52.2461, lng: 20.9958, url: 'http://www.yadvashem.org/yv/en/exhibitions/warsaw_ghetto_testimonies/images/after_deportation/01.jpg', text: 'Warsaw Ghetto'},
	{type: 'resistance', from: 19430501, to: 19430516, lat: 52.2461, lng: 20.9958, url: 'http://anticapitalists.org/wp-content/uploads/2013/04/Jewish-Fighters-during-Warsaw-Ghetto-Uprising-1943.jpg', text: 'Warsaw Ghetto uprising'},
	{type: 'allied', from: 19450117, to: 19450507, lat: 52.2461, lng: 20.9958, url: '', text: 'Soviets capture Warsaw'},
	{type: 'ghetto', from: 19391210, to: 19440828, lat: 51.759445, lng: 19.457216, url: 'http://www.yadvashem.org/yv/en/education/newsletter/32/images/historic_b3.jpg', text: 'Lodz Ghetto'},
	{type: 'allied', from: 19450119, to: 19450507, lat: 51.759445, lng: 19.457216, url: '', text: 'Liberation of the Lodz Ghetto'},
	{type: 'camp', from: 19400501, to: 19441231, lat: 50.0358, lng: 19.1783, url: 'http://i.telegraph.co.uk/multimedia/archive/03176/Auschwitz-456x288_3176326a.jpg', text: '<a href="https://en.wikipedia.org/wiki/Auschwitz_concentration_camp" target="_blank"/>Auschwitz</a> concentration camp was a network of German Nazi concentration camps and extermination camps built and operated by the Third Reich in Polish areas annexed by Nazi Germany during World War II. (<a href="http://www.yadvashem.org/yv/en/exhibitions/album_auschwitz/content1.asp" target="_blank"/>Yad Vashem album</a>)'},
	{type: 'allied', from: 19450127, to: 19450507, lat: 50.0358, lng: 19.1783, url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/1/20/1421770241684/Red-Army-doctor-at-Auschw-012.jpg', text: 'Liberation of Auschwitz'},
	{type: 'camp', from: 19420723, to: 19431019, lat: 52.631069, lng: 22.053058, url: 'http://motlc.wiesenthal.com/atf/cf/%7B5C0A9B27-51F5-4920-81B3-4EF2159D4FE8%7D/302.jpg', text: 'Treblinka'},
	{type: 'allied', from: 19440816, to: 19450507, lat: 52.631069, lng: 22.053058, url: '', text: 'Soviets capture Treblinka'},
	{type: 'allied', from: 19440606, to: 19450507, lat: 49.3689, lng: 0.8686, url: 'http://dailycaller.com/wp-content/uploads/2012/06/dday2-e1338990214516.jpg', text: '6 June 1944 "D-Day" - <a href="https://en.wikipedia.org/wiki/Normandy_landings" target="_blank"/>Allied invasion of Normandy</a><br/>The largest seaborne invasion in history, the operation began the liberation of German-occupied northwestern Europe from Nazi control, and contributed to the Allied victory on the Western Front.'},
	{type: 'allied', from: 19440825, to: 19450507, lat: 48.8567, lng: 2.3508, url: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/General_Charles_de_Gaulle_and_his_entourage_set_off_from_the_Arc_de_Triumphe_down_the_Champs_Elysees.jpg', text: '25 August 1945 - <a href="https://en.wikipedia.org/wiki/Liberation_of_Paris" target="_blank"/>Liberation of Paris</a>'},
	{type: 'allied', from: 19441216, to: 19450507, lat: 50.25, lng: 5.666667, url: 'https://upload.wikimedia.org/wikipedia/commons/6/61/GERMAN_TROOPS_ADVANCING_PAST_ABANDONED_AMERICAN_EQUIPMENT.jpg', text: '<a href="https://en.wikipedia.org/wiki/Battle_of_the_Bulge" target="_blank"/>The Battle of the Bulge</a>'},
	{type: 'allied', from: 19450322, to: 19450507, lat: 49.8547, lng: 8.35974, url: 'https://www.ibiblio.org/hyperwar/USA/USA-E-Last/img/USA-E-Last-p288.jpg', text: '22 March 1945 - <a href="https://en.wikipedia.org/wiki/Operation_Plunder" target="_blank"/>Patton crosses the Rhine River</a>'},
	{type: 'allied', from: 19450401, to: 19450507, lat: 52.5167, lng: 13.3833, url: 'http://i.dailymail.co.uk/i/pix/2008/05_01/reichstag_468x329.jpg', text: '<a href="https://en.wikipedia.org/wiki/Battle_of_Berlin" target="_blank"/>Battle of Berlin</a>'},
	{type: 'allied', from: 19450430, to: 19450507, lat: 48.1333, lng: 11.5667, url: '', text: 'Fall of Munich'},
	{type: 'picture', from: 19450507, to: 19450507, lat: 49.2628, lng: 4.0347, url: 'http://www.historyplace.com/worldwar2/ww2-pix/jodl-signs.jpg', text: 'May 7 1945 - Germany surrenders'}
];

var eventsData = [
	{from: 19380312, to: 19380312, text: 'Hitler annexes Austria into Germany - "The Anschluss".'},
	{from: 19390901, to: 19390901, text: 'Germany invades Poland. World War II begins.'},
	{from: 19400409, to: 19400622, text: 'Germany invades Denmark, Norway, Netherlands, Belgium, and northern France.'},
	{from: 19400710, to: 19400710, text: 'Germany launches an air attack on Great Britain.'},
	{from: 19400922, to: 19400922, text: 'Germany, Italy, and Japan sign the Tripartite Pact creating the Axis Alliance.'},
	{from: 19410622, to: 19410622, text: 'The Axis Powers attack Russia with a huge force of over four million troops.'},
	{from: 19411207, to: 19411207, text: 'Japan attacks the US Navy in Pearl Harbor. US joins the war.'},
	{from: 19430501, to: 19430516, text: 'Warsaw Ghetto uprising.'},
	{from: 19440606, to: 19440606, text: 'Allied invasion of France.'},
	{from: 19440825, to: 19440825, text: 'Paris is liberated.'},
	{from: 19441216, to: 19441216, text: 'The Battle of the Bulge.'},
	{from: 19450117, to: 19450117, text: 'Soviets capture Warsaw.'},
	{from: 19450127, to: 19450127, text: 'Liberation of Auschwitz.'},
	{from: 19450322, to: 19450322, text: 'The US 3rd Army under General Patton crosses the Rhine River.'},
	{from: 19450412, to: 19450412, text: 'Franklin Roosevelt dies, and succeeded by Harry Truman.'},
	{from: 19450430, to: 19450430, text: 'Adolf Hitler commits suicide.'},
	{from: 19450507, to: 19450507, text: 'Germany surrenders.'},
	{from: 19450806, to: 19450809, text: 'The United States drops atomic bombs on Hiroshima and Nagasaki.'},
	{from: 19450902, to: 19450902, text: 'Japan surrenders.'}
];

function getData(fromStr, toStr) {
	var res = {
		markersData: [],
		eventsData: []
	};
	var from = parseInt(fromStr, 10);
	var to =  parseInt(toStr, 10);
	addRealMarkersData(from, to, res);
	addFakeMarkersData(from, to, res);
	addEventsData(from, to, res);
  console.log('Server found ' + res.markersData.length + ' markers');
	return res;
}

function addRealMarkersData(from, to, res) {
	var i;
	for (i=0; i<realMarkersData.length; i++) {
		if (realMarkersData[i].from <= to && realMarkersData[i].to >= from) {
			res.markersData.push(realMarkersData[i]);
		}
	}
}

function addFakeMarkersData(from, to, res) {
	function addFakeMarkerData(from, to, type, res) {
		res.markersData.push({type: type, from: from, to: to, lat: getRandomLat(), lng: getRandomLng(), url: '', text: ''});
	}
	addFakeMarkerData(from, to, 'picture', res);
	addFakeMarkerData(from, to, 'picture', res);
	addFakeMarkerData(from, to, 'picture', res);
	addFakeMarkerData(from, to, 'document', res);
	addFakeMarkerData(from, to, 'document', res);
	addFakeMarkerData(from, to, 'video', res);
	addFakeMarkerData(from, to, 'audio', res);
	addFakeMarkerData(from, to, 'righteous', res);
}

function addEventsData(from, to, res) {
	var i;
	for (i=0; i<eventsData.length; i++) {
		if (eventsData[i].from <= to && eventsData[i].to >= from) {
			res.eventsData.push(eventsData[i]);
		}
	}
}

function getRandomLat() {
	return Math.floor((Math.random() * 7) + 46);
}

function getRandomLng() {
	return Math.floor((Math.random() * 25) + 5);
}

app.use("/tic", express.static(__dirname + '/static'));

app.post('/api', function(req, res) {
  var from = req.body.from,
			to = req.body.to,
			data;
	console.log('Server API call. from ' + from + ' to ' + to);
	data = JSON.stringify(getData(from, to));
	console.log(data);
	res.end(data);
});

http.listen(port, function(){
	console.log('Server listening on port ' + port.toString());
});
