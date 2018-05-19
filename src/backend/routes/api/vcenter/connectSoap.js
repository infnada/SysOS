/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');

/**
 * API SOAP vcenter/connect - Connect to vCenter Server or ESX(i) host
 *
 * @description
 *
 */

router.post("/", function (req, res) {

  var vcenter = require('../../modules/vcenter.js');
  var apiGlobals = require('../globals.js')(req, res);
  var apiCookie = 'api-session-soap';

  var description = req.body.description;
  var host = req.body.host;
  var credential = req.body.credential;
  var port = req.body.port;

  //get username and password from credential
  var credentials = require('read-config')(path.join(__dirname, '../../../filesystem/etc/applications/cmanager/config.json'));

  credential = credentials.saved_credentials.filter(function( obj ) {
    return obj.uuid === credential;
  })[0];

  return vcenter.connectSoap(host, port, credential.username, credential.password).then(function (data) {

    if (data[0].statusCode < 400) {

      // Save the vmware-api-session and host to cookies on the client
      if (data[0].headers['set-cookie'] && data[0].headers['set-cookie'][0].startsWith('vmware_soap_session')) {
        res.cookie(apiCookie, data[0].headers['set-cookie'][0], { maxAge: 900000, httpOnly: true });
      }

      return apiGlobals.validResponse();

    }

    var msg = 'Error: ${data[0].statusCode}: ${data[0].statusMessage}';
    console.log(msg);
    return apiGlobals.serverError(msg);

  }).catch(function (err) {
    if (err) return apiGlobals.serverError(err);
  });

});

module.exports = router;
