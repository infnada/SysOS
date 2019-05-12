/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

/**
 * API file - Rename
 *
 * @description
 *
 */

router.post('/', function (req, res) {

  var apiGlobals = require('../globals.js')(req, res);
  var path = req.body.path;

  if (typeof path === 'undefined') return apiGlobals.serverError('path_undefined');

  function execute (command, callback) {
    exec(command, function (error, stdout, stderr) {
      if (error) throw new Error(error);
      if (stderr) throw new Error(stderr);
      callback(stdout);
    });
  }

  execute('ls -lah "' + __dirname + '/../../../filesystem' + path + '"', function (data) {
    var files = [];

    var longnames = data.split('\n');
    longnames.splice(0, 3);
    longnames.pop();

    longnames.forEach(function (longname) {

      // Split one or more spaces
      var filename = longname.split(/ +/);
      var filesize = filename[4];

      filename.splice(0, 8);

      files.push({
        filename: filename.join(' '),
        longname: longname,
        attrs: {
          size: filesize
        }
      })
    });

    res.json(files);
  });

});

module.exports = router;
