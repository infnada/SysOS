/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();

/**
 * API remoteFolder - Get Folder
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var uuid = req.body.uuid;
	var currentPath = req.body.path;

	var apiGlobals = require('../globals.js')(req, res);
	var sshSessions = require('../../../socket/modules/sshSessions.js')();

  return sshSessions.getSession('sftp', uuid, function (conn) {

	  conn.sftpSession.readdir(currentPath, function(err, data) {
        if (err) return apiGlobals.serverError(err);

        return apiGlobals.responseData(uuid, currentPath, data);
      });

  });

});

module.exports = router;
