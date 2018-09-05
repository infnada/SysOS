module.exports = function software (conn) {

	var globals = require("./globals.js")(conn);

	this.get_updates = function () {
		return globals.execAsync("yum check-update").then(function (data) {
			var m;
			var packages = [];
			data = data.split(/\r?\n/);

			// Parse data
			for (var i = 0, len = data.length; i < len; i++) {
				m = /^(\S+)\.([^\.]+)\s+(\S+)\s+(\S+)/.exec(data[i]);
				if (m) {

					// Extract epoch
					e = /^(\S+):/.exec(m[3]);

					packages.push({
						name: m[1],
						arch: m[2],
						version: m[3],
						source: m[4],
						epoch: (e ? e[0] : null)
					});

				}

			};

			return packages;

		}).catch(function (e) {
			return e;
		});
	};

	return this;
};