/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');
var fs = require('fs-extra');

/**
 * API file - Copy
 *
 * @description
 *
 */

router.post("/", function (req, res) {

  var apiGlobals = require('../globals.js')(req, res);

  var oldDirname = path.join(__dirname, '../../../filesystem') + req.body.path + req.body.source;
  var newDirname = path.join(__dirname, '../../../filesystem') + req.body.path + req.body.dest;
  fs.copySync(oldDirname, newDirname);

  apiGlobals.validResponse();

});

module.exports = router;
