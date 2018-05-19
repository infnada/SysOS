/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');

/**
 * API configFiles - Get from file
 *
 * @description
 *
 */

router.post("/", function (req, res) {

  var file = req.body.file;
  var config = require('read-config')(path.join(__dirname, '../../../filesystem/etc/' + file), { skipUnresolved: true });
  res.json(config);

});

module.exports = router;
