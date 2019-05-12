/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs-extra');

/**
 * API file - Move File
 *
 * @description
 *
 */

router.post('/', function (req, res) {

  var apiGlobals = require('../globals.js')(req, res);
  var src = req.body.src;
  var dst = req.body.dst;

  if (typeof src === 'undefined') return apiGlobals.serverError('src_undefined');
  if (typeof dst === 'undefined') return apiGlobals.serverError('dst_undefined');

  var file_name = req.body.src.split('/').pop();

  var oldDirname = path.join(__dirname, '../../../filesystem') + src;
  var newDirname = path.join(__dirname, '../../../filesystem') + dst + file_name;
  fs.renameSync(oldDirname, newDirname);

  apiGlobals.validResponse();

});

module.exports = router;
