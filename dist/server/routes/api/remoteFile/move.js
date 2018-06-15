/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();

/**
 * API remoteFile - Move File
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var uuid = req.body.uuid;
	var file_name = req.body.src.split('/').pop();
	var src = req.body.src;
	var dst = req.body.dst;

	var apiGlobals = require('../globals.js')(req, res);
	var sshSessions = require('../../../socket/modules/sshSessions.js')();

	return sshSessions.getSession('sftp', uuid, function (conn) {

		conn.sftpSession.rename(src, dst + file_name, function (e) {
            if (e && e.code) return apiGlobals.serverError(e.code);
            if (e) return apiGlobals.serverError(e);

			// Send path data
			conn.sftpSession.readdir(dst, function (e, data) {
                if (e && e.code) return apiGlobals.serverError(e.code);
                if (e) return apiGlobals.serverError(e);

				return apiGlobals.responseData(uuid, dst, data);
			});
		});

	});

});

module.exports = router;
