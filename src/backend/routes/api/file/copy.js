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

  var file_name = req.body.src.split('/').pop();

  var oldDirname = path.join(__dirname, '../../../filesystem') + req.body.src;
  var newDirname = path.join(__dirname, '../../../filesystem') + req.body.dst + file_name;
  fs.copySync(oldDirname, newDirname);

  apiGlobals.validResponse();

});

module.exports = router;
