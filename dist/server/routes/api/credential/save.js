/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');
var uuid = require('uuid4');
var jsonfile = require('jsonfile');

/**
 * API credential - Save credential
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var apiGlobals = require('../globals.js')(req, res);
	var credential = req.body.credential;
	var credentials = require('read-config')(path.join(__dirname, '../../../filesystem/root/credentials.json'));

	// New credential
	if (!credential.hasOwnProperty('uuid')) {

		return uuid(function (e, id) {
            if (e && e.code) return apiGlobals.serverError(e.code);
            if (e) return apiGlobals.serverError(e);

			credential.uuid = id;
			credentials.saved_credentials.push(credential);

			return jsonfile.writeFile(path.join(__dirname, '../../../filesystem/root/credentials.json'), credentials, function (e) {
                if (e && e.code) return apiGlobals.serverError(e.code);
                if (e) return apiGlobals.serverError(e);

				return apiGlobals.responseJsonData(id);
			});

		});

	}

	// Edit credential
	var objIndex = credentials.saved_credentials.findIndex(function (obj) {
		return obj.uuid === credential.uuid
	});

	credentials.saved_credentials[objIndex].description = credential.description;
	credentials.saved_credentials[objIndex].username = credential.username;
	credentials.saved_credentials[objIndex].password = credential.password;

	return jsonfile.writeFile(path.join(__dirname, '../../../filesystem/root/credentials.json'), credentials, function (e) {
        if (e && e.code) return apiGlobals.serverError(e.code);
        if (e) return apiGlobals.serverError(e);

		return apiGlobals.responseJsonData(credential.uuid);
	});

});

module.exports = router;
