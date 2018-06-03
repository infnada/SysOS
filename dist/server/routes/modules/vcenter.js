var Promise = require("bluebird");
var request = require('request');
var https = require('https');
var parseString = require('xml2js').parseString;

exports.getClientVersion = function (host, port) {
	var proto;

	if (port === "80") {
		proto = 'http';
	} else {
		proto = 'https';
	}

	return new Promise(function (resolve, reject) {

		return request({
			url: proto + '://' + host + ':' + port + '/client/clients.xml',
			method: 'GET',
			strictSSL: false,
			headers: {
				'Accept': 'application/xml',
				'Content-Type': 'application/xml'
			}
		}, function (err, response, body) {
			if (err) return reject(err);

			// Parse xml result to json
			parseString(body, function (err, result) {
				return resolve(result);
			});
		});

	});

};

exports.connect = function (host, port, username, password) {

	var proto;

	if (port === "80") {
		proto = 'http';
	} else {
		proto = 'https';
	}

	return new Promise(function (resolve, reject) {

		return request({
			url: proto + '://' + host + ':' + port + '/rest/com/vmware/cis/session',
			method: 'POST',
			strictSSL: false,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
			}
		}, function (err, response) {
			if (err) return reject(err);

			return resolve(response);
		});

	});

};

exports.callApi = function (host, port, path, cookie) {

	//https://code.vmware.com/apis/191/vsphere-automation

	var proto;

	if (port === "80") {
		proto = 'http';
	} else {
		proto = 'https';
	}

	return new Promise(function (resolve, reject) {

		return request({
			url: proto + '://' + host + ':' + port + '' + path,
			method: 'GET',
			strictSSL: false,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Cookie': cookie
			}
		}, function (err, response, body) {
			if (err) return reject(err);

			return resolve(body);
		});

	});

};

exports.connectSoap = function (host, port, username, password) {
	var proto;

	if (port === "80") {
		proto = require('http');
	} else {
		proto = require('https');
	}

	var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><Login xmlns="urn:vim25"><_this type="SessionManager">SessionManager</_this><userName>' + username + '</userName><password>' + password + '</password></Login></soap:Body></soap:Envelope>';

	return new Promise(function (resolve, reject) {

		var req = proto.request({
			host: host,
			path: '/sdk',
			port: port,
			method: 'POST',
			headers: {
				'Content-Type': 'text/xml',
				'SOAPAction': 'urn:vim25/6.0',
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
					return resolve([res, result]);
				});

			});

		}).on('error', function (e) {
			return reject(e);
		});

		req.write(xml);
		req.end();

	});

};

exports.callApiSoap = function (host, port, action, xml, cookie) {
	var proto;

	if (port === "80") {
		proto = require('http');
	} else {
		proto = require('https');
	}

	//api version GET https://mvcenter01.intranet.com/client/clients.xml

	return new Promise(function (resolve, reject) {

		var req = proto.request({
			host: host,
			path: '/sdk',
			port: port,
			method: 'POST',
			headers: {
				'Content-Type': 'text/xml',
				'SOAPAction': action,
				'Content-Length': Buffer.byteLength(xml),
				'Expect': '100-continue',
				'Cookie': cookie
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
