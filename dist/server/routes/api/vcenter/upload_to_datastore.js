/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');
var url = require('url');
var spawn = require('child_process').spawn;

/**
 * API file - Upload file to Datastore
 *
 * @description
 *
 */

router.post("/", function (req, res) {

    var apiGlobals = require('../globals.js')(req, res);

    var curl;
    var file_url = url.parse(req.body.url).href;
    var UPLOAD_DIR = path.join(__dirname, '../../../filesystem/' + req.body.path);

    if (req.body.credential && req.body.credential.length !== 0) {
        var credential = req.body.credential;
        var credentials = require('read-config')(path.join(__dirname, '../../../filesystem/root/credentials.json'));

        credential = credentials.saved_credentials.filter(function (obj) {
            return obj.uuid === credential;
        })[0];

        curl = spawn('curl', ['-k', '-X', 'PUT', '--user', credential.username + ':' + credential.password, file_url, '-T', UPLOAD_DIR]);
    } else {
        curl = spawn('curl', ['-k', '-X', 'PUT', file_url, '-T', UPLOAD_DIR]);
    }

    curl.stdout.on('data', function(data) {
        console.log(data.toString());
    });

    curl.on('close', function (e) {
        console.log('Curl closed: ' + e);
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
