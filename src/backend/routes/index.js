/*jslint node: true */
"use strict";

module.exports = function (app, io) {

	var path = require('path');
	var fs = require('fs');
    var config = require('read-config')(path.join(__dirname, '../filesystem/etc/expressjs/config.json'));
    var log4js = require('log4js');
    var logger = log4js.getLogger('mainlog');
	var multiparty = require('connect-multiparty');
	var multipartyMiddleware = multiparty();

    app.use(function (req, res, next) {
        var apiGlobals = require('./api/globals.js')(req, res);

        // List of urls that login is not needed.
        var regexList = [
            /^\/$/,
            /^\/api\/credential\/login$/i
        ];

        var isMatch = regexList.some(function (rx) {
            return rx.test(req.url);
        });

        // User is able to get this page with or without logged_in
        if (isMatch) {
            //if (req.url !== "/" && req.session.logged_in == true) return pokerGlobals.responseNoValid("already_logged_in");
            req.io = io;

            /**
             * Do not make any other check
             */
            return next();
        }

        // No legged_in or deleted uniqueId cookie
        if (!req.signedCookies[config.uniqueCookie]) {
            logger.warn("no_uniqueId_cookie " + req.url);
            return apiGlobals.responseNoValid("no_uniqueId_cookie");
        }

        // Session deleted from redis
        if (!req.session.uuid) {
            logger.warn("no_user_id " + req.url);
            return apiGlobals.responseNoValid("no_user_id");
        }

        // Session user_id and uniqueId not match. Modified uniqueId cookie.
        if (req.session.uuid !== req.signedCookies[config.uniqueCookie]) {
            logger.warn("invalid_uniqueId_cookie " + req.url);
            return apiGlobals.responseNoValid("invalid_uniqueId_cookie");
        }

        // Include socket.io properties to request object
        req.io = io;
        return next();
    });

	app.use('/api/file/upload', multipartyMiddleware, require('./api/file/upload.js'));
	app.use('/api/file/rename', require('./api/file/rename.js'));
	app.use('/api/file/delete', require('./api/file/delete.js'));
	app.use('/api/file/get', require('./api/file/get.js'));
	app.use('/api/file/download_from_url', require('./api/file/download_from_url.js'));
	app.use('/api/file/copy', require('./api/file/copy.js'));
	app.use('/api/file/move', require('./api/file/move.js'));

	app.use('/api/remoteFile/chmod', require('./api/remoteFile/chmod.js'));
	app.use('/api/remoteFile/delete', require('./api/remoteFile/delete.js'));
	app.use('/api/remoteFile/rename', require('./api/remoteFile/rename.js'));
	app.use('/api/remoteFile/download_from_url', require('./api/remoteFile/download_from_url.js'));
	app.use('/api/remoteFile/copy', require('./api/remoteFile/copy.js'));
	app.use('/api/remoteFile/move', require('./api/remoteFile/move.js'));
	// upload & download called from socket.io

	app.use('/api/folder/create', require('./api/folder/create.js'));
	app.use('/api/folder/get', require('./api/folder/get.js'));

	app.use('/api/remoteFolder/create', require('./api/remoteFolder/create.js'));
	app.use('/api/remoteFolder/get', require('./api/remoteFolder/get.js'));

	app.use('/api/remoteServer/get_kernel', require('./api/remoteServer/get_kernel.js'));
	app.use('/api/remoteServer/get_cpu', require('./api/remoteServer/get_cpu.js'));
	app.use('/api/remoteServer/get_disk', require('./api/remoteServer/get_disk.js'));
	app.use('/api/remoteServer/get_mem', require('./api/remoteServer/get_mem.js'));
	app.use('/api/remoteServer/get_release', require('./api/remoteServer/get_release.js'));
	app.use('/api/remoteServer/get_updates', require('./api/remoteServer/get_updates.js'));
	app.use('/api/remoteServer/get_processes', require('./api/remoteServer/get_processes.js'));
	app.use('/api/remoteServer/get_interfaces', require('./api/remoteServer/get_interfaces.js'));
	app.use('/api/remoteServer/get_interface_bandwidth', require('./api/remoteServer/get_interface_bandwidth.js'));

	app.use('/api/remoteServer/run_hids', require('./api/remoteServer/run_hids.js'));
	app.use('/api/remoteServer/do_ping', require('./api/remoteServer/do_ping.js'));
	app.use('/api/remoteServer/do_snmp', require('./api/remoteServer/do_snmp.js'));

	app.use('/api/vcenter/getClientVersion', require('./api/vcenter/getClientVersion.js'));
	app.use('/api/vcenter/connect', require('./api/vcenter/connect.js'));
	app.use('/api/vcenter/connectSoap', require('./api/vcenter/connectSoap.js'));
	app.use('/api/vcenter/call', require('./api/vcenter/call.js'));
	app.use('/api/vcenter/callSoap', require('./api/vcenter/callSoap.js'));

	app.use('/api/netapp/call', require('./api/netapp/call.js'));

    app.use('/api/credential/login', require('./api/credential/login.js'));
    app.use('/api/credential/init', require('./api/credential/init.js'));
	app.use('/api/credential/save', require('./api/credential/save.js'));
	app.use('/api/credential/delete', require('./api/credential/delete.js'));

	app.use('/api/configFiles/get', require('./api/configFiles/get.js'));
	app.use('/api/configFiles/save', require('./api/configFiles/save.js'));
	app.use('/api/configFiles/delete', require('./api/configFiles/delete.js'));

    app.use('/api/applications/get_application_file', require('./api/applications/get_application_file.js'));

    app.use('/api/video/get_video', require('./api/video/get_video.js'));

	app.get('/getSession', function (req, res) {
		res.send('ok');
	});

	// express error handling
	app.use(function (req, res) {
		res.status(404).send("Sorry can't find that!")
	});

	app.use(function (err, req, res) {
		console.error(err.stack);
		res.status(500).send('Something broke!')
	});

};
