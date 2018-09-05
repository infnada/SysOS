/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();

/**
 * API SOAP vcenter/connect - Call to vCenter Server or ESX(i) host
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var vcenter = require('../../modules/vcenter.js')();
	var apiGlobals = require('../globals.js')(req, res);
	var apiCookie = 'api-session-soap';

	var host = req.body.host;
	var action = req.body.action;
	var xml = req.body.xml;
	var port = req.body.port;

	if (!req.cookies[apiCookie]) return apiGlobals.serverError("no_vmware_login_cookie");

	return vcenter.callApiSoap(host, port, action, xml, req.cookies[apiCookie]).then(function (body) {

		return apiGlobals.responseJsonData(body);

	}).catch(function (e) {
        if (e && e.code) return apiGlobals.serverError(e.code);
        if (e) return apiGlobals.serverError(e);
	});

});

module.exports = router;
