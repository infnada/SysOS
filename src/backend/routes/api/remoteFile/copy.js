/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();

/**
 * API file - Copy
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var apiGlobals = require('../globals.js')(req, res);
	var sshSessions = require('../../../socket/modules/sshSessions.js')();

	var uuid = req.body.uuid;
	var file_name = req.body.src.split('/').pop();

	return sshSessions.getSession('sftp', uuid, function (conn) {

		var globals = require("../../modules/globals.js")(conn);
		return globals.execAsync("cp -r " + req.body.src + " " + req.body.dst + file_name).then(function (data) {
			return apiGlobals.validResponse();
		}).catch(function (e) {
			console.log(e);
			return apiGlobals.serverError(e);
		});

	});
});

module.exports = router;
