/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();

/**
 * API vcenter - Get vCenter Server or ESX(i) host version
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var vcenter = require('../../modules/vcenter.js');
	var apiGlobals = require('../globals.js')(req, res);

	var host = req.body.host;
	var port = req.body.port;

	return vcenter.getClientVersion(host, port).then(function (body) {

		return apiGlobals.responseJsonData(body);

	}).catch(function (e) {
		if (e && e.code) return apiGlobals.serverError(e.code);
		if (e) return apiGlobals.serverError(e);
	});

});

module.exports = router;