/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');
var uuid = require('uuid4');
var jsonfile = require('jsonfile');

/**
 * API configFiles - Save to file
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var apiGlobals = require('../globals.js')(req, res);
	var data = req.body.data;
	var file = req.body.file;
	var full_save = req.body.full_save;

	/*
	 * Rewrite all config file with received data
	 */
	if (full_save) {
		return jsonfile.writeFile(path.join(__dirname, '../../../filesystem/etc/' + file), data, {flag: 'w'}, function (e) {
            if (e && e.code) return apiGlobals.serverError(e.code);
            if (e) return apiGlobals.serverError(e);

			return apiGlobals.validResponse();

		});
	}

	/*
	 * Save or Edit in config file by uuid
	 */
	var config = require('read-config')(path.join(__dirname, '../../../filesystem/etc/' + file), {skipUnresolved: true});

	// Create new uuid (is new entry)
	if (!data.hasOwnProperty('uuid')) {

		return uuid(function (e, id) {
            if (e && e.code) return apiGlobals.serverError(e.code);
            if (e) return apiGlobals.serverError(e);

			data.uuid = id;
			config.push(data);

			return jsonfile.writeFile(path.join(__dirname, '../../../filesystem/etc/' + file), config, {flag: 'w'}, function (e) {
                if (e && e.code) return apiGlobals.serverError(e.code);
                if (e) return apiGlobals.serverError(e);

				return apiGlobals.responseJsonData(id);
			});

		});

	}

	// Edit or New with uuid created by client
	var objIndex = config.findIndex(function (obj) {
		return obj.uuid === data.uuid
	});

	if (objIndex !== -1) {

		// Edit
		config[objIndex] = data;
	} else {

		// New
		config.push(data);
	}

	return jsonfile.writeFile(path.join(__dirname, '../../../filesystem/etc/' + file), config, {flag: 'w'}, function (e) {
        if (e && e.code) return apiGlobals.serverError(e.code);
        if (e) return apiGlobals.serverError(e);

		return apiGlobals.responseJsonData(data.uuid);
	});

});

module.exports = router;
