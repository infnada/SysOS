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
	var apiGlobals = require('../globals.js')(req, res);
	var sshSessions = require('../../../socket/modules/sshSessions.js')();

	return sshSessions.getSession('smanager', uuid, function (conn) {

		var hids = require('../../modules/hids.js')(conn);

		return hids.run_hids().then(function (data) {
			return apiGlobals.responseData(uuid, 'hids', data);
		});

	}).catch(function (e) {
		console.log(e);
		return apiGlobals.serverError(e);
	});

});

module.exports = router;
