var Promise = require("bluebird");

module.exports = function hids (conn) {

	var globals = require("./globals.js")(conn);
	var path = require('path');
	var fs = require('fs');

	var promiseWhile = function (condition, action) {
		var resolver = Promise.defer();
		var loop = function () {
			if (!condition()) return resolver.resolve();
			return Promise.cast(action()).then(loop).catch(resolver.reject);
		};
		process.nextTick(loop);
		return resolver.promise;
	};

	var type;
	var condition;
	var regex;
	var m;
	var first;
	var second;
	var segments;
	var matched = 0;
	var results = [];
	var current_result;

	var doWithLine = function (line) {
		return new Promise(function (resolve, reject) {
			line = line.trim();
			var first_char = line.charAt(0);
			var last_char = line.substr(line.length - 1);

			// return if empty line or start with "#"
			if (line.length === 0 || first_char === "#") return resolve();

			// Get types - removing negate flash (using later)
			if (first_char === "!") first_char = line.charAt(1);

			if (first_char === "f") type = "file";
			else if (first_char === "p") type = "process";
			else if (first_char === "d") type = "dir";
			else if (first_char === "[" && last_char === "]") type = "name";
			else type = null;

			// Get name conditions
			if (type === "name") {

				// Check if "passed till last condition" or "not passed till last condition"
				if (matched === 4) results.push(current_result);
				if (matched === 5) results.push(current_result);

				matched = 0;
				regex = /^\[.*\]\s?\[(all|any|none|any required|all required)\].*$/g;
				while ((m = regex.exec(line)) !== null) {
					if (m.index === regex.lastIndex) regex.lastIndex++;
					if (m.length <= 1) condition = null;
					else condition = m[1];
				}

				// Set new name to results
				current_result = {
					"line": line,
					"condition": condition,
					"lines": []
				};

				// end of type = name
			}

			if (type === null || condition === null || type === "name") return resolve();
			if (type !== "name" && (matched === 2 || matched === 3)) {
				current_result.lines.push({"line": line, "result": "not needed"});
				return resolve();
			}

			// Get line params
			regex = /^[f|p|d]:(.*)\s\-\>\s(.*)$/g;
			while ((m = regex.exec(line)) !== null) {
				if (m.index === regex.lastIndex) regex.lastIndex++;
				if (m.length <= 2) return;
				first = m[1];
				second = m[2];
			}

			// Delete ";" char if its last character of second part of params line
			if (second.charAt(second.length - 1) === ";") second = second.slice(0, -1);

			// Get all params
			segments = second.split(" && ");
			var regexconditions = [];

			for (var x = 0; x < segments.length; x++) {
				regex = /^(!?r|!?=|!?<|!?>):(.+)$/g;
				while ((m = regex.exec(segments[x])) !== null) {
					if (m.index === regex.lastIndex) {
						regex.lastIndex++;
					}
					if (m[1] === "r" || m[1] === "!r") {
						regexconditions.push({"type": m[1], "regex": m[2]});
					}
				}
			}

			// Check file lines
			if (type == "file") {
				return globals.execAsync('cat ' + first).then(function (data) {
					fileContents = data.split(/\r?\n/);
					matched = 0;

					if (fileContents.length === 0) {
						matched = 0;
					}

					// Each line of file
					for (var l = 0; l < fileContents.length; l++) {
						if (fileContents[l].length === 0) {
							continue;
						}
						var total_match = 0;

						// Check regex conditions
						for (var r = 0; r < regexconditions.length; r++) {
							if (regexconditions[r].type.charAt(0) === "r" && fileContents[l].match(regexconditions[r].regex)) {
								++total_match;
							}
							else if (regexconditions[r].type.charAt(0) === "!" && !fileContents[l].match(regexconditions[r].regex)) {
								++total_match;
							}
							else {
								break;
							}
						}

						if (total_match === regexconditions.length) {
							matched = 1;
							break;
						}
					}

					if ((condition === "any" || condition === "any required") && matched === 1) {
						matched = 3;
						current_result.lines.push({"line": line, "result": "passed"});
						results.push(current_result);
					}
					else if ((condition === "any" || condition === "any required") && matched === 0) {
						matched = 5;
						current_result.lines.push({"line": line, "result": "not passed right now"});
					}
					else if ((condition === "all" || condition === "all required") && matched === 0) {
						matched = 2;
						current_result.lines.push({"line": line, "result": "not passed"});
						results.push(current_result);
					}
					else if ((condition === "all" || condition === "all required") && matched === 1) {
						current_result.lines.push({"line": line, "result": "passed right now"});
					}
					else if (condition === "none" && matched === 1) {
						matched = 2;
						current_result.lines.push({"line": line, "result": "not passed"});
						results.push(current_result);
					}
					else if (condition === "none" && matched === 0) {
						matched = 4;
						current_result.lines.push({"line": line, "result": "passed right now"});
					}
					else {
						matched = 5;
						current_result.lines.push({"line": line, "result": "not passed right now"});
					}
					return resolve(matched);
				}).catch(function (e) {
					//console.log(e);
				});

				// end if type = file
			}

			return resolve();
			// end of promise
		});

		// end of function
	};

	this.run_hids = function (program) {

		return new Promise(function (resolve, reject) {

			var lines = fs.readFileSync(path.join(__dirname, '../../filesystem/etc/hids/rootchecks/cis_rhel7_linux_rcl.txt')).toString().split(/\r?\n/);

			var z = 0;
			promiseWhile(function () {
				return z < lines.length;
			}, function () {
				return doWithLine(lines[z]).then(function () {
					z++;
				});
			}).then(function () {
				return resolve(results);
			}).catch(function (e) {
				//console.log(e);
			});
		});
		// end of function
	};

	return this;
};