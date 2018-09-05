/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var snmp = require("net-snmp");
var Promise = require("bluebird");

/**
 * API remoteServer - Run HIDS Scripts
 *
 * @description
 *
 */

router.post("/", function (req, res) {

	var type = req.body.type;
	var oid = req.body.oid;
	var uuid = req.body.uuid;
	var apiGlobals = require('../globals.js')(req, res);
	var snmpSessions = require('../../../socket/modules/snmpSessions.js')();

    if (!Array.isArray(oid)) {
    	oid = [oid];
    }

	return snmpSessions.getSession('smanager', uuid, function (conn) {

		//SPECIAL FOR SONICWALL IFACES
		if (oid === "sonicwall_ifaces") {
			var snmpm = require('../../modules/snmp.js')(conn);

			return snmpm.getIfaces().then(function () {
				return snmpm.getIfacesIp();
			}).then(function () {
				return Promise.each(ifaces, function (iface) {
					return snmpm.getIfacesInfo(iface.interfaceId, iface.ip);
				});
			}).then(function () {
				return apiGlobals.responseData(uuid, 'oid', '"' + JSON.stringify(snmpm.ifaces) + '"');
			}).catch(function (e) {
				console.log(e);
				return apiGlobals.serverError(e);
			});

			// NORMAL OID GET
		} else if (type === "get") {
			conn.get(oid, function (e, varbinds) {
                console.log("---------");
                console.log(oid);
                console.log(varbinds);

				if (e) {
					console.log("error");
					return apiGlobals.serverError(e);
				}

                var response = [];

                for (var i = 0; i < varbinds.length; i++) {
                    if (snmp.isVarbindError(varbinds[i])) {
                        console.log("error");
                        console.error(snmp.varbindError(varbinds[i]));
                    } else {
                        if (Buffer.isBuffer(varbinds[i].value)) {
                            console.log(varbinds[i].oid + ":" + varbinds[i].value.toString('utf8'));
                        } else {
                            console.log(varbinds[i].oid + ":" + varbinds[i].value);
                        }

                        response.push({
                            oid: varbinds[i].oid,
                            value: varbinds[i].value.toString()
                        });
                    }
                }

                apiGlobals.responseData(uuid, 'oid', response);
			});
        } else if (type === "get-next") {
            conn.getNext(oid, function (e, varbinds) {
            	console.log("---------");
            	console.log(oid);
            	console.log(JSON.stringify(varbinds));

                if (e) {
                    console.log("error");
                    return apiGlobals.serverError(e);
                }

                var response = [];

                for (var i = 0; i < varbinds.length; i++) {
                    if (snmp.isVarbindError(varbinds[i])) {
                        console.log("error");
                        console.error(snmp.varbindError(varbinds[i]));
                    } else {
                        if (Buffer.isBuffer(varbinds[i].value)) {
                            console.log(varbinds[i].oid + ":" + varbinds[i].value.toString('utf8'));
                        } else {
                            console.log(varbinds[i].oid + ":" + varbinds[i].value);
                        }

                        response.push({
	                        oid: varbinds[i].oid,
	                        value: varbinds[i].value.toString()
                        });
                    }
                }

                apiGlobals.responseData(uuid, 'oid', response);
            });
		}

	});


});

module.exports = router;
