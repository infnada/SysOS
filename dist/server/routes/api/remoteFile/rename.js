/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');

/**
 * API remoteFile - Rename File
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var uuid = req.body.uuid;
	var sourceFile = req.body.source;
	var destFile = req.body.dest;

	var apiGlobals = require('../globals.js')(req, res);
	var sshSessions = require('../../../socket/modules/sshSessions.js')();

	return sshSessions.getSession('sftp', uuid, function (conn) {


		conn.sftpSession.rename(sourceFile, destFile, function (err) {
			if (err) return apiGlobals.serverError(err);

			// Send path data
			var currentPath = path.dirname(destFile);
			conn.sftpSession.readdir(currentPath, function (err, data) {
				if (err) return apiGlobals.serverError(err);

				return apiGlobals.responseData(uuid, currentPath + '/', data);
			});
		});

	});


});

module.exports = router;
