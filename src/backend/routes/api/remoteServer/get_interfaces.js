/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();

/**
 * API remoteServer - Get Release Version
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var uuid = req.body.uuid;
	var apiGlobals = require('../globals.js')(req, res);
	var sshSessions = require('../../../socket/modules/sshSessions.js')();

  return sshSessions.getSession('smanager', uuid, function (conn) {

  	var net = require('../../modules/net.js')(conn);

  	return net.get_active_interfaces().then(function (data) {
  		return apiGlobals.responseData(uuid, 'interfaces', data);
  	});

  }).catch(function(e) {
  	console.log(e);
    return apiGlobals.serverError(e);
	});

});

module.exports = router;
