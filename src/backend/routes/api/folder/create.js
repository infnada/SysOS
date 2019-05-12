/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs-extra');

/**
 * API file - Rename
 *
 * @description
 *
 */

router.post('/', function (req, res) {

  var apiGlobals = require('../globals.js')(req, res);
  var ipath = req.body.path;
  var name = req.body.name;

  if (typeof ipath === 'undefined') return apiGlobals.serverError('path_undefined');
  if (typeof name === 'undefined') return apiGlobals.serverError('name_undefined');

  var dirname = path.join(__dirname, '../../../filesystem') + ipath + name;
  fs.mkdirSync(dirname);

  apiGlobals.validResponse();

});

module.exports = router;
