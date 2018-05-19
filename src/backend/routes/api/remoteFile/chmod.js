/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');

/**
 * API remoteFile - Change File Permisions
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var uuid = req.body.uuid;
	var file = req.body.file;
	var permissions = req.body.permissions;

	var apiGlobals = require('../globals.js')(req, res);
	var sshSessions = require('../../../socket/modules/sshSessions.js')();

	return sshSessions.getSession('sftp', uuid, function (conn) {


		conn.sftpSession.chmod(file, permissions, function (err) {
			if (err) return apiGlobals.serverError(err);

			// Send path data
			var currentPath = path.dirname(file);
			conn.sftpSession.readdir(currentPath, function (err, data) {
				if (err) return apiGlobals.serverError(err);

				return apiGlobals.responseData(uuid, currentPath + '/', data);
			});
		});


	});

});

module.exports = router;
