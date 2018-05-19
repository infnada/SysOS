/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var url = require('url');

/**
 * API file - Download file from URL (Internet)
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var uuid = req.body.uuid;
	var file_url = req.body.url;
	var file_name = url.parse(file_url).pathname.split('/').pop();
	var DOWNLOAD_DIR = req.body.path;

	var apiGlobals = require('../globals.js')(req, res);
	var sshSessions = require('../../../socket/modules/sshSessions.js')();

	return sshSessions.getSession('sftp', uuid, function (conn) {

		var globals = require("../../modules/globals.js")(conn);
		return globals.execAsync("curl -o " + DOWNLOAD_DIR + file_name + " " + file_url).then(function (data) {
			console.log(data);
			return apiGlobals.validResponse();
		}).catch(function (e) {
			console.log(e);
			return apiGlobals.serverError(e);
		});

	});
});

module.exports = router;
