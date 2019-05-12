/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

/**
 * API credential - Login
 *
 * @description
 *
 */

router.post('/', function (req, res) {

  var apiGlobals = require('../globals.js')(req, res);
  var user = req.body.username;
  var password = req.body.password;

  if (typeof user === 'undefined') return apiGlobals.serverError('username_undefined');
  if (typeof password === 'undefined') return apiGlobals.serverError('password_undefined');

  var config = require('read-config')(path.join(__dirname, '../../../filesystem/etc/expressjs/config.json'));
  var users = require('read-config')(path.join(__dirname, '../../../filesystem/etc/shadow.json'));

  users = users.filter(function (props) {
    return props.user === user && props.password === password;
  });

  if (users.length === 0) return apiGlobals.serverError('Invalid login credentials');

  req.session.uuid = users[0].uuid;

  res.cookie(config.uniqueCookie, users[0].uuid, {maxAge: 900000, signed: true});
  return res.json({status: 'ok'});
});

module.exports = router;
