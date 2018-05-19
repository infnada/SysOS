/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');

/**
 * API file - Rename
 *
 * @description
 *
 */

router.post("/", function (req, res) {

  var apiGlobals = require('../globals.js')(req, res);

  var options = {
	  root: path.join(__dirname, '../../../filesystem/'),
	  dotfiles: 'allow',
	  headers: {
	      'x-timestamp': Date.now(),
	      'x-sent': true
	  }
	};

	var fileName = req.body.name;

	res.sendFile(fileName, options, function (err) {
	  if (err) {
	    apiGlobals.serverError();
	  }
	});

});

module.exports = router;
