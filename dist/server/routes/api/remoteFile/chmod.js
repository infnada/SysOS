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


		conn.sftpSession.chmod(file, permissions, function (e) {
            if (e && e.code) return apiGlobals.serverError(e.code);
            if (e) return apiGlobals.serverError(e);

			// Send path data
			var currentPath = path.dirname(file);
			conn.sftpSession.readdir(currentPath, function (e, data) {
                if (e && e.code) return apiGlobals.serverError(e.code);
                if (e) return apiGlobals.serverError(e);

				return apiGlobals.responseData(uuid, currentPath + '/', data);
			});
		});


	});

});

module.exports = router;
