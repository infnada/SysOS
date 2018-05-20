/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');
var fs = require('fs-extra');

/**
 * API file - Rename
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var apiGlobals = require('../globals.js')(req, res);
	var file_name = req.body.src.split('/').pop();

	var src = path.join(__dirname, '../../../filesystem') + req.body.src;
	var dst = path.join(__dirname, '../../../filesystem') + req.body.dst + file_name;
	fs.renameSync(src, dst);

	apiGlobals.validResponse();

});

module.exports = router;
