/*jslint node: true */
"use strict";

module.exports = function (app, io) {

	var path = require('path');
	var fs = require('fs');
	var multiparty = require('connect-multiparty');
	var multipartyMiddleware = multiparty();

	app.use('/api/file/upload', multipartyMiddleware, require('./api/file/upload.js'));
	app.use('/api/file/rename', require('./api/file/rename.js'));
	app.use('/api/file/delete', require('./api/file/delete.js'));
	app.use('/api/file/get', require('./api/file/get.js'));
	app.use('/api/file/download_from_url', require('./api/file/download_from_url.js'));
	app.use('/api/file/copy', require('./api/file/copy.js'));

	app.use('/api/remoteFile/chmod', require('./api/remoteFile/chmod.js'));
	app.use('/api/remoteFile/delete', require('./api/remoteFile/delete.js'));
	app.use('/api/remoteFile/rename', require('./api/remoteFile/rename.js'));
	app.use('/api/remoteFile/download_from_url', require('./api/remoteFile/download_from_url.js'));
	app.use('/api/remoteFile/copy', require('./api/remoteFile/copy.js'));
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

	app.use('/api/credential/save', require('./api/credential/save.js'));
	app.use('/api/credential/delete', require('./api/credential/delete.js'));

	app.use('/api/configFiles/get', require('./api/configFiles/get.js'));
	app.use('/api/configFiles/save', require('./api/configFiles/save.js'));
	app.use('/api/configFiles/delete', require('./api/configFiles/delete.js'));


	app.get('/getSession', function (req, res) {
		res.send('ok');
	});

	app.get('/getApplicationFile/:file', function (req, res) {
		var file = path.join(__dirname, '../filesystem/bin/applications/' + req.params.file);

		res.sendFile(file);
	});

	app.get('/application/cmanager/init', function (req, res) {
		var config = require('read-config')(path.join(__dirname, '../filesystem/etc/applications/cmanager/config.json'));

		config = config.saved_credentials.filter(function (props) {
			delete props.password;
			return true;
		});

		res.json(config);
	});

	app.get('/video', function (req, res, next) {
		var file = path.join(__dirname, '../filesystem/juego.mp4');
		fs.stat(file, function (err, stats) {
			if (err) {
				if (err.code === 'ENOENT') {
					// 404 Error if file not found
					return res.sendStatus(404);
				}
				res.end(err);
			}

			var range = req.headers.range;
			if (!range) {
				// 416 Wrong range
				return res.sendStatus(416);
			}
			var parts = range.replace(/bytes=/, "").split("-");
			var partialstart = parts[0];
			var partialend = parts[1];
			var total = stats.size;
			var start = parseInt(partialstart, 10);
			var end = partialend ? parseInt(partialend, 10) : total - 1;
			var chunksize = (end - start) + 1;
			res.writeHead(206, {
				'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
				'Accept-Ranges': 'bytes',
				'Content-Length': chunksize,
				'Content-Type': 'video/mp4'
			});
			var fileStream = fs.createReadStream(file, {
				start: start,
				end: end
			});
			fileStream.pipe(res);
			res.on('close', function () {
				console.log('response closed');
				if (res.fileStream) {
					res.fileStream.unpipe(this);
					if (this.fileStream.fd) {
						fs.close(this.fileStream.fd);
					}
				}
			});

			/*
			var range = req.headers.range;
			if (!range) {
			 // 416 Wrong range
			 return res.sendStatus(416);
			}
			var positions = range.replace(/bytes=/, "").split("-");
			console.log(positions);
			var start = parseInt(positions[0], 10);
			console.log(start);
			var total = stats.size;
			console.log(total);
			var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
			var chunksize = (end - start) + 1;

			res.writeHead(206, {
			  "Content-Range": "bytes " + start + "-" + end + "/" + total,
			  "Accept-Ranges": "bytes",
			  "Content-Length": chunksize,
			  "Content-Type": "video/mp4"
			});

			var stream = fs.createReadStream(file, { start: start, end: end })
			  .on("open", function() {
				stream.pipe(res);
			  }).on("error", function(err) {
				res.end(err);
			  });
			  */
		});
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
