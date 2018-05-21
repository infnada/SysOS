module.exports = function init (conn) {

	var globals = require("./globals.js")(conn);

	// check_program(program)
	// Returns an error message if program is not installed, bin location if all is OK
	this.check_program = function (program) {
		return globals.execAsync('command -v ' + program + ' || { echo >&2 "no_program"; }').then(function (data) {
			return data.replace(/(\n|\r)+$/, '');
		});
	};

	this.start_actionAsync = function (service) {
		return globals.execAsync("systemctl start " + service).then(function (data) {
			return data;
		});
	};

	this.stop_actionAsync = function (service) {
		return globals.execAsync("systemctl stop " + service).then(function (data) {
			return data;
		});
	};

	return this;
};