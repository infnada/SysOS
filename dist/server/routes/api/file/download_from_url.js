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

    var curl;
	var file_url = url.parse(req.body.url).href;
	var file_name = url.parse(file_url).pathname.split('/').pop();
	var DOWNLOAD_DIR = path.join(__dirname, '../../../filesystem/' + req.body.path);

    if (req.body.credential && req.body.credential.length !== 0) {
        var credential = req.body.credential;
        var credentials = require('read-config')(path.join(__dirname, '../../../filesystem/etc/applications/cmanager/config.json'));

        credential = credentials.saved_credentials.filter(function (obj) {
            return obj.uuid === credential;
        })[0];

        curl = spawn('curl', ['-k', '--user', credential.username + ':' + credential.password, file_url]);
    } else {
        curl = spawn('curl', ['-k', file_url]);
	}

	var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

	curl.stdout.on('data', function (data) {
		file.write(data);
	});
	curl.stdout.on('end', function () {
		file.end();
	});
	curl.on('exit', function (code) {
		if (code !== 0) {
			console.log('Failed: ' + code);
			return apiGlobals.serverError();
		}
        return apiGlobals.validResponse();
	});

});

module.exports = router;
