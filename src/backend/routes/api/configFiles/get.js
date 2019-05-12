/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

/**
 * API configFiles - Get from file
 *
 * @description
 *
 */

router.post('/', function (req, res) {

  var apiGlobals = require('../globals.js')(req, res);
  var file = req.body.file;

  if (typeof file === 'undefined') return apiGlobals.serverError('file_undefined');

  var config = require('read-config')(path.join(__dirname, '../../../filesystem/etc/' + file), {skipUnresolved: true});
  res.json(config);

});

module.exports = router;
