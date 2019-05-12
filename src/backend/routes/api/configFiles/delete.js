/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var jsonfile = require('jsonfile');

/**
 * API configFiles - Delete uuid from file
 *
 * @description
 *
 */

router.post('/', function (req, res) {

  var apiGlobals = require('../globals.js')(req, res);
  var uuid = req.body.uuid;
  var file = req.body.file;

  if (typeof uuid === 'undefined') return apiGlobals.serverError('uuid_undefined');
  if (typeof file === 'undefined') return apiGlobals.serverError('file_undefined');

  var config = require('read-config')(path.join(__dirname, '../../../filesystem/etc/' + file), {skipUnresolved: true});

  config = config.filter(function (obj) {
    return obj.uuid !== uuid;
  });

  return jsonfile.writeFile(path.join(__dirname, '../../../filesystem/etc/' + file), config, {flag: 'w'}, function (e) {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);

    return apiGlobals.validResponse();
  });

});

module.exports = router;
