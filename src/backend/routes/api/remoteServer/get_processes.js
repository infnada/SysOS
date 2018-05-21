/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();

/**
 * API remoteServer - Get Yum Updates
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var uuid = req.body.uuid;
	var apiGlobals = require('../globals.js')(req, res);
	var sshSessions = require('../../../socket/modules/sshSessions.js')();

	return sshSessions.getSession('smanager', uuid, function (conn) {

		var proc = require('../../modules/proc.js')(conn);

		return proc.list_processes().then(function (data) {
			return apiGlobals.responseData(uuid, 'processes', data);
		});

	}).catch(function (e) {
		console.log(e);
		return apiGlobals.serverError(e);
	});

});

module.exports = router;
