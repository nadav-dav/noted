
var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan')('dev');
var dust = require('klei-dust');

var STATICS = path.join(__dirname, '../dist')

var app = express();

	dust.setOptions({keepWhiteSpace: true});
	app.engine  ('dust', dust.dust);
	app.set     ('port', process.env.PORT || 3000);
	app.set     ('views', path.join(__dirname, 'views'));
	app.set     ('view engine', 'dust');

	app.use     (express.static(STATICS));
	app.use		(logger);

	app.get('/', function  (req, res) {
	    res.render('index');
	});

	app.listen(app.get('port'), function () {
		var splash = function () {/*
 /$$   /$$             /$$                     /$$
| $$$ | $$            | $$                    | $$
| $$$$| $$  /$$$$$$  /$$$$$$    /$$$$$$   /$$$$$$$
| $$ $$ $$ /$$__  $$|_  $$_/   /$$__  $$ /$$__  $$
| $$  $$$$| $$  \ $$  | $$    | $$$$$$$$| $$  | $$
| $$\  $$$| $$  | $$  | $$ /$$| $$_____/| $$  | $$
| $$ \  $$|  $$$$$$/  |  $$$$/|  $$$$$$$|  $$$$$$$
|__/  \__/ \______/    \___/   \_______/ \_______/                                                 
                                                  
         */};
		console.log(splash.toString().match(/\/\*([\s\S]*)\*\//m)[1]);
	    console.log("listening on port " + app.get('port'));
	});