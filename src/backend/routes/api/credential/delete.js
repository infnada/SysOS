/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');
var jsonfile = require('jsonfile');

/**
 * API credential - Delete credential
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var apiGlobals = require('../globals.js')(req, res);
	var uuid = req.body.uuid;
	var credentials = require('read-config')(path.join(__dirname, '../../../filesystem/root/credentials.json'));

	credentials.saved_credentials = credentials.saved_credentials.filter(function (obj) {
		return obj.uuid !== uuid;
	});

	return jsonfile.writeFile(path.join(__dirname, '../../../filesystem/root/credentials.json'), credentials, function (e) {
        if (e && e.code) return apiGlobals.serverError(e.code);
        if (e) return apiGlobals.serverError(e);

		return apiGlobals.responseJsonData(uuid);
	});

});

module.exports = router;
