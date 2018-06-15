/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();

/**
 * API remoteFolder - Get Folder
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var uuid = req.body.uuid;
	var currentPath = req.body.path;

	var apiGlobals = require('../globals.js')(req, res);
	var sshSessions = require('../../../socket/modules/sshSessions.js')();

	return sshSessions.getSession('sftp', uuid, function (conn) {

		conn.sftpSession.readdir(currentPath, function (e, data) {
            if (e && e.code) return apiGlobals.serverError(e.code);
            if (e) return apiGlobals.serverError(e);

			return apiGlobals.responseData(uuid, currentPath, data);
		});

	});

});

module.exports = router;
