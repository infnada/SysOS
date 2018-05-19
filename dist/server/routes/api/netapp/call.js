/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');

/**
 * API netapp/connect - Call to NetApp
 *
 * @description
 *
 */

router.post("/", function (req, res) {

  var netapp = require('../../modules/netapp.js');
  var apiGlobals = require('../globals.js')(req, res);

  var credential = req.body.credential;
  var host = req.body.host;
  var port = req.body.port;
  var call_path = (req.body.path ? req.body.path : "/servlets/netapp.servlets.admin.XMLrequest_filer");
  var xml = req.body.xml;

  var credentials = require('read-config')(path.join(__dirname, '../../../filesystem/etc/applications/cmanager/config.json'));

  credential = credentials.saved_credentials.filter(function( obj ) {
    return obj.uuid === credential;
  })[0];

  return netapp.callApi(host, port, credential.username, credential.password, call_path, "<?xml version='1.0' encoding='utf-8' ?><!DOCTYPE netapp SYSTEM 'file:/etc/netapp_filer.dtd'>" + xml).then(function (body) {

    return apiGlobals.responseJsonData(body);

  }).catch(function (err) {
    if (err) return apiGlobals.serverError(err);
  });

});

module.exports = router;
