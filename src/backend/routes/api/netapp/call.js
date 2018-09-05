/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();

/**
 * API netapp/connect - Call to NetApp
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var netapp = require('../../modules/netapp.js')();
	var apiGlobals = require('../globals.js')(req, res);
    var credentials = require('../../modules/credentials.js')();

	var credential = req.body.credential;
	var host = req.body.host;
	var port = req.body.port;
	var call_path = (req.body.path ? req.body.path : "/servlets/netapp.servlets.admin.XMLrequest_filer");
	var xml = req.body.xml;

    //get username and password from credential
    return credentials.getCredential(credential).then(function (cred) {
        return netapp.callApi(host, port, cred.username, cred.password, call_path, "<?xml version='1.0' encoding='utf-8' ?><!DOCTYPE netapp SYSTEM 'file:/etc/netapp_filer.dtd'>" + xml);
    }).then(function (body) {

		return apiGlobals.responseJsonData(body);

	}).catch(function (e) {
        if (e && e.code) return apiGlobals.serverError(e.code);
        if (e) return apiGlobals.serverError(e);
	});

});

module.exports = router;
