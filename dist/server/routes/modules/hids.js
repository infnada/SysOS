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

	var regex;
	var m;
	var first;
	var second;
	var matched = 0;
	var current_result;

	/**
	 * Final Array of results
	 */
	var results = [];

	var parseNameType = function (line) {
        var condition;

        return new Promise(function (resolve) {
            regex = /^\[.*\]\s?\[(all|any|none|any required|all required)\].*$/g;
            while ((m = regex.exec(line)) !== null) {
                if (m.index === regex.lastIndex) regex.lastIndex++;
                if (m.length <= 1) condition = null;
                else condition = m[1];
            }

            return resolve(condition);
        });
	};

	var parseFileType = function (regexconditions) {
        return globals.execAsync('cat ' + first).then(function (data) {
            data = data.trim();

            var fileContents = data.split(/\r?\n/);
            var matched_status = 0;

            if (fileContents.length === 0) return 0;

            // Each line of file
            for (var l = 0; l < fileContents.length; l++) {
                if (fileContents[l].length === 0) continue;

                var total_match = 0;

                // Check conditions
                for (var r = 0; r < regexconditions.length; r++) {
                    if (regexconditions[r].type.charAt(0) === "r" && fileContents[l].match(regexconditions[r].regex)) {
                        ++total_match;
                    } else if (regexconditions[r].type.charAt(0) === "!" && regexconditions[r].type.charAt(1) === "r" && !fileContents[l].match(regexconditions[r].regex)) {
                        ++total_match;
                    } else if (regexconditions[r].type.charAt(0) === "=" && data === regexconditions[r].regex) {
                        ++total_match;
                    } else {
                        break;
                    }
                }

                if (total_match === regexconditions.length) {
                    matched_status = 1;
                    break;
                }
            }

            return matched_status;

        }).catch(function (e) {
            console.log(e);
        });
	};

    var parseDirType = function (regexconditions) {
        return new Promise(function (resolve, reject) {
        	return resolve(0);
        });
	};

    var parseProcessType = function (regexconditions) {
        return new Promise(function (resolve, reject) {
            return resolve(0);
        });
	};

    var parseInlineType = function (regexconditions) {

        console.log(first);

        return globals.execAsync(first).then(function (data) {
            data = data.trim();

            console.log(data);
            console.log(regexconditions);

            var dataContents = data.split(/\r?\n/);
            var matched_status = 0;

            // Each line of data
            for (var l = 0; l < dataContents.length; l++) {
                var total_match = 0;
                console.log(dataContents[l]);

                // Check conditions
                for (var r = 0; r < regexconditions.length; r++) {
                    console.log(data, regexconditions[r].regex);
                    console.log(data === regexconditions[r].regex);

                    if (regexconditions[r].type.charAt(0) === "r" && dataContents[l].match(regexconditions[r].regex)) {
                        ++total_match;
                    } else if (regexconditions[r].type.charAt(0) === "!" && regexconditions[r].type.charAt(1) === "r" && !dataContents[l].match(regexconditions[r].regex)) {
                        ++total_match;
                    } else if (regexconditions[r].type.charAt(0) === "=" && data === regexconditions[r].regex) {
                        ++total_match;
                    } else {
                        break;
                    }
                }

                if (total_match === regexconditions.length) {
                    matched_status = 1;
                    break;
                }
            }

            return matched_status;

        }).catch(function (e) {
            console.log(e);
        });
    };

	var checkMatch = function (line, match) {
        return new Promise(function (resolve) {
            if ((current_result.condition === "any" || current_result.condition === "any required") && match === 1) {
                current_result.lines.push({"line": line, "result": "passed"});
                matched = 3;
            } else if ((current_result.condition === "any" || current_result.condition === "any required") && match === 0) {
                current_result.lines.push({"line": line, "result": "not passed right now"});
                matched = 5;
            } else if ((current_result.condition === "all" || current_result.condition === "all required") && match === 0) {
                current_result.lines.push({"line": line, "result": "not passed"});
                matched = 2;
            } else if ((current_result.condition === "all" || current_result.condition === "all required") && match === 1) {
                current_result.lines.push({"line": line, "result": "passed right now"});
                matched = 1;
            } else if (current_result.condition === "none" && match === 1) {
                current_result.lines.push({"line": line, "result": "not passed"});
                matched = 2;
            } else if (current_result.condition === "none" && match === 0) {
                current_result.lines.push({"line": line, "result": "passed right now"});
                matched = 4;
            } else {
                current_result.lines.push({"line": line, "result": "not passed right now"});
                matched = 5;
            }

            return resolve();
        });
	};

	var doWithLine = function (line) {
		return new Promise(function (resolve, reject) {
            var regexconditions = [];
            var type;
            var first_char;
            var last_char;
            var segments;

			line = line.trim();
			first_char = line.charAt(0);
			last_char = line.substr(line.length - 1);

			// return if empty line or start with "#"
			if (line.length === 0 || first_char === "#") return resolve("nothing_to_do");

			// Get types - removing negate flash (using later)
			if (first_char === "!") first_char = line.charAt(1);

            /**
			 * Get line tyoe
             */
			if (first_char === "f") type = "file";
			else if (first_char === "p") type = "process";
			else if (first_char === "d") type = "dir";
            else if (first_char === "i") type = "inline";
			else if (first_char === "[" && last_char === "]") type = "name";
			else return resolve("nothing_to_do_type");

            /**
             * Get name conditions
             */
			if (type === "name") {

                // Last status is "passed". Final status = Passed
                if (matched === 1) {
                    current_result.status = "Passed";
                    results.push(current_result);
                }

                // Last status is "not passed". Final status = Not Passed
                if (matched === 2) {
                    results.push(current_result);
                }

                // Last status is "passed". Final status = Passed
                if (matched === 3) {
                    current_result.status = "Passed";
                    results.push(current_result);
                }

				// Last status is "passed right now". Final status = Passed
                if (matched === 4) {
                    current_result.status = "Passed";
                	results.push(current_result);
                }

                // Last status is "not passed right now". Final status = Not Passed
                if (matched === 5) {
                	results.push(current_result);
                }

                matched = 0;

				return parseNameType(line).then(function (condition) {

                    if (condition === null) return resolve("nothing_to_do_condition");

                    // Set new name to results
                    current_result = {
                        "line": line,
                        "condition": condition,
                        "lines": [],
						"status": "Not Passed"
                    };

                    return resolve();
                });
            }

            /**
             * Check if already passed the previous condition
             */
			if (matched === 2 || matched === 3) {
				current_result.lines.push({"line": line, "result": "not needed"});
				return resolve();
			}

			/**
             * Get line params
             */
			regex = /^[f|p|d|i]:(.*)\s\-\>\s(.*)$/g;
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

			for (var x = 0; x < segments.length; x++) {
				regex = /^(!?r|!?=|!?<|!?>):(.*)$/g;
				while ((m = regex.exec(segments[x])) !== null) {

				    console.log(m);

					if (m.index === regex.lastIndex) {
						regex.lastIndex++;
					}

					if (m[1] === "r" || m[1] === "!r" || m[1] === "=" || m[1] === ">" || m[1] === "<") {
						regexconditions.push({"type": m[1], "regex": m[2]});
					}
				}
			}

			/**
             * Check file lines
             */
			if (type === "file") {
				return parseFileType(regexconditions).then(function (match) {

                    return checkMatch(line, match);

                }).then(function () {

                    return resolve();
                });
            }

            /**
             * Check files in directory
             */
            if (type === "dir") {
                return parseDirType(regexconditions).then(function (match) {

                    return checkMatch(line, match);

                }).then(function () {

                    return resolve();
                });
            }

            /**
             * Check process
             */
            if (type === "process") {
                return parseProcessType(regexconditions).then(function (match) {

                    return checkMatch(line, match);

                }).then(function () {

                    return resolve();
                });
            }

            /**
             * Check inline
             */
            if (type === "inline") {
                return parseInlineType(regexconditions).then(function (match) {

                    return checkMatch(line, match);

                }).then(function () {

                    return resolve();
                });
            }

			return reject("line not parsed");
		});
	};

	this.run_hids = function (program) {

		return new Promise(function (resolve, reject) {

			console.log(__dirname);

			var lines = fs.readFileSync(path.join(__dirname, '../../filesystem/etc/applications/hids/rootchecks/cis_rhel7_linux_rcl.txt')).toString().split(/\r?\n/);

			var z = 0;
			promiseWhile(function () {
				return z < lines.length;
			}, function () {

                console.log("----------------------");
				console.log(lines[z]);

				return doWithLine(lines[z]).then(function () {
					z++;
				});
			}).then(function () {
				return resolve(results);
			}).catch(function (e) {
				console.log(e);
			});
		});
		// end of function
	};

	return this;
};