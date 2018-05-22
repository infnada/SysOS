/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();

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

	var host = req.body.host;
	var path = req.body.path;

	if (!req.cookies[apiCookie]) return apiGlobals.serverError("no_vmware_login_cookie");

	return vcenter.callApi(host, path, req.cookies[apiCookie]).then(function (body) {

		return apiGlobals.responseJsonData(JSON.parse(body));

	}).catch(function (err) {
		if (err) return apiGlobals.serverError(err);
	});

});

module.exports = router;