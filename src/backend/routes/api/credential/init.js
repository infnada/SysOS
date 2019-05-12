/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

/**
 * API credential - Init
 *
 * @description
 *
 */

router.get('/', function (req, res) {
  var config = require('read-config')(path.join(__dirname, '../../../filesystem/root/credentials.json'));

  config = config.saved_credentials.filter(function (props) {
    delete props.password;
    return true;
  });

  res.json(config);
});

module.exports = router;
