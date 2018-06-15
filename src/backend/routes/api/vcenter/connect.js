/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');

/**
 * API vcenter/connect - Connect to vCenter Server or ESX(i) host
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var vcenter = require('../../modules/vcenter.js');
	var apiGlobals = require('../globals.js')(req, res);
	var apiCookie = 'api-session';
    var credentials = require('../../modules/credentials.js');

	var description = req.body.description;
	var host = req.body.host;
	var port = req.body.port;
	var credential = req.body.credential;

	//get username and password from credential
    return credentials.getCredential(credential).then(function (cred) {
        return vcenter.connect(host, port, cred.username, cred.password);
    }).then(function (response) {

        if (response.statusCode < 400) {

            // Save the vmware-api-session and host to cookies on the client
            if (response.headers['set-cookie'] && response.headers['set-cookie'][0].startsWith('vmware-api-session')) {
                res.cookie(apiCookie, response.headers['set-cookie'][0], {maxAge: 900000, httpOnly: true});
            }

            return apiGlobals.validResponse();

        }

        return apiGlobals.serverError(response.statusMessage);
    }).catch(function (e) {
        if (e && e.code) return apiGlobals.serverError(e.code);
        if (e) return apiGlobals.serverError(e);
    });

});

module.exports = router;
