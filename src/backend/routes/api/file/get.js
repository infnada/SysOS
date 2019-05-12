/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

/**
 * API file - Rename
 *
 * @description
 *
 */

router.post('/', function (req, res) {

  var apiGlobals = require('../globals.js')(req, res);
  var fileName = req.body.path;

  if (typeof fileName === 'undefined') return apiGlobals.serverError('fileName_undefined');

  var options = {
    root: path.join(__dirname, '../../../filesystem/'),
    dotfiles: 'allow',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  res.sendFile(fileName, options, function (e) {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });

});

module.exports = router;
