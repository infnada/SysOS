/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();

/**
 * API remoteServer - Get MEM
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var uuid = req.body.uuid;
	var apiGlobals = require('../globals.js')(req, res);
	var sshSessions = require('../../../socket/modules/sshSessions.js')();

	return sshSessions.getSession('smanager', uuid, function (conn) {

		var server = require('../../modules/server.js')(conn);

		return server.get_mem().then(function (data) {
			return apiGlobals.responseData(uuid, 'mem', data);
		});

	}).catch(function (e) {
		console.log(e);
		return apiGlobals.serverError(e);
	});

});

module.exports = router;
