/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');
var fs = require('fs-extra');

/**
 * API file - Upload
 *
 * @description
 *
 */

router.post("/", function (req, res) {

  var apiGlobals = require('../globals.js')(req, res);

  var createDirIfNotExists = function (dir) {
    var dirname = path.dirname(dir);
    if (fs.existsSync(dirname)) {
      return true;
    }
    createDirIfNotExists(dirname);
    fs.mkdirSync(dirname);
  };


  fs.readFile(req.files.file.path, function (err, data) {
    var file = {};

    if (err) {
      apiGlobals.serverError();
      return console.warn(err);
    }

    file.name = (req.body.path == undefined ? req.files.file.name : req.body.path);
    file.path = path.join(__dirname, '../../../filesystem/') + file.name;

    // Create dir if not exists
    createDirIfNotExists(file.path);

    // copy the data from the req.files.file.path and paste it to file.path
    fs.writeFile(file.path, data, function (err) {
      if (err) {
        apiGlobals.serverError();
        return console.warn(err);
      }

      apiGlobals.validResponse();
      console.log("The file: " + req.files.file.name + " was saved to " + file.path);
    });
  });

});

module.exports = router;
