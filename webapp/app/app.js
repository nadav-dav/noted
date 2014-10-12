
var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan')('dev');
var dust = require('klei-dust');
var bodyParser = require("body-parser");
var rek = require("rekuire");
var session = require('express-session');


var STATICS = path.join(__dirname, '../dist');

var app = express();

	dust.setOptions({keepWhiteSpace: true});
	app.engine  ('dust', dust.dust);
	app.set     ('port', process.env.PORT || 3000);
	app.set     ('views', path.join(__dirname, 'views'));
	app.set     ('view engine', 'dust');

    app.use     (session({secret: "_\"=g-*8J,w5! {M2#~ ')t'3V6>7.sM@-'uLS.^1/*Kb.{m{,h"}));
	app.use     (express.static(STATICS));
	app.use		(logger);
    app.use     (bodyParser.urlencoded({ extended: false }));
    app.use     (bodyParser.json());


    // CONTROLLERS
    rek('CrudControllers').config(app);
    rek('SecurityControllers').config(app);
    rek('VotingControllers').config(app);
    rek('NoteControllers').config(app);
    rek('UserControllers').config(app);
    rek('MainControllers').config(app);

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

module.exports = app;