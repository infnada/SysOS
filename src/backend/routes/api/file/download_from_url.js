/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');
var fs = require('fs');
var url = require('url');
var spawn = require('child_process').spawn;

/**
 * API file - Download file from URL (Internet)
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var apiGlobals = require('../globals.js')(req, res);

	var file_url = req.body.url;
	var file_name = url.parse(file_url).pathname.split('/').pop();
	var DOWNLOAD_DIR = path.join(__dirname, '../../../filesystem/' + req.body.path);

	var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
	var curl = spawn('curl', [file_url]);
	curl.stdout.on('data', function (data) {
		file.write(data);
	});
	curl.stdout.on('end', function (data) {
		file.end();
		return apiGlobals.validResponse();
	});
	curl.on('exit', function (code) {
		if (code !== 0) {
			console.log('Failed: ' + code);
			apiGlobals.serverError();
		}
	});

});

module.exports = router;
