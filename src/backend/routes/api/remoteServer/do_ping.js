/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();

/**
 * API remoteServer - Run HIDS Scripts
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var uuid = req.body.uuid;
	var host = req.body.host;
	var apiGlobals = require('../globals.js')(req, res);

	/*var ping = require('ping');
  ping.promise.probe(host)
  .then(function (res) {
  	console.log(res);
  	return apiGlobals.responseData(uuid, 'ping', data);
  });*/

	var ping = require("net-ping");
	var session = ping.createSession();

	session.pingHost(host, function (error, target) {
		console.log(error, target);

		if (error) return apiGlobals.responseData(uuid, 'ping', error.toString());
		else return apiGlobals.responseData(uuid, 'ping', "alive");
	});

});

module.exports = router;
