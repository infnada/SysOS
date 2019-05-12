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
  var oldName = req.body.oldName;
  var newName = req.body.newName;

  if (typeof ipath === 'undefined') return apiGlobals.serverError('path_undefined');
  if (typeof oldName === 'undefined') return apiGlobals.serverError('oldName_undefined');
  if (typeof newName === 'undefined') return apiGlobals.serverError('newName_undefined');

  var oldDirname = path.join(__dirname, '../../../filesystem') + ipath + oldName;
  var newDirname = path.join(__dirname, '../../../filesystem') + ipath + newName;
  fs.renameSync(oldDirname, newDirname);

  apiGlobals.validResponse();

});

module.exports = router;
