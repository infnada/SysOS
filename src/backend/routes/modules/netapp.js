var Promise = require("bluebird");
var parseString = require('xml2js').parseString;

exports.callApi = function (host, port, username, password, path, xml) {
	var proto;

	if (port === "80") {
		proto = require('http');
	} else {
		proto = require('https');
	}

	return new Promise(function (resolve, reject) {

		var req = proto.request({
			host: host,
			path: path,
			port: port,
			method: 'POST',
			headers: {
				'Content-Type': 'text/xml',
				'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64'),
				'Content-Length': Buffer.byteLength(xml),
				'Expect': '100-continue'
			}
		}, function (res) {

			var buffer = "";
			res.on("data", function (data) {
				buffer = buffer + data;
			});
			res.on("end", function () {

				// Parse xml result to json
				parseString(buffer, function (err, result) {
					return resolve(result);
				});

			});

		}).on('error', function (e) {
			return reject(e);
		});

		req.write(xml);
		req.end();

	});

};
