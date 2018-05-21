/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');
var jsonfile = require('jsonfile');

/**
 * API configFiles - Delete uuid from file
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var apiGlobals = require('../globals.js')(req, res);
	var uuid = req.body.uuid;
	var file = req.body.file;

	var config = require('read-config')(path.join(__dirname, '../../../filesystem/etc/' + file), {skipUnresolved: true});

	config = config.filter(function (obj) {
		return obj.uuid !== uuid;
	});

	return jsonfile.writeFile(path.join(__dirname, '../../../filesystem/etc/' + file), config, {flag: 'w'}, function (err) {
		if (err) return console.log(err);

		return apiGlobals.validResponse();
	});

});

module.exports = router;
