module.exports = function net (conn) {

	var _this = this;
	var globals = require("./globals.js")(conn);

	this.get_ps_version = function () {
		return globals.execAsync("ps V 2>&1").then(function (data) {
			var m;

			m = /version\s+([0-9\.]+)\./.exec(data);
			if (m) {
				return m[1];
			}

			m = /\S+\s+([3-9][0-9\.]+)\./.exec(data);
			if (m) {
				return m[1];
			}

		});
	};

	this.list_processes = function () {
		return _this.get_ps_version().then(function (data) {
			var width;

			if (data >= 2) {
				width = ":80";
				return globals.execAsync("ps --cols 2048 -eo user" + width + ",ruser" + width + ",group" + width + ",rgroup" + width + ",pid,ppid,pgid,pcpu,vsz,nice,etime,time,stime,tty,args 2>/dev/null").then(function (data) {

					data = data.split(/\r?\n/);
					data.shift();
					data.pop();
					var current_data;
					var args_data;
					var process_list = [];

					for (var i = 0, len = data.length; i < len; i++) {
						current_data = data[i].split(/\s+/);
						args_data = data[i].split(/\s+/);
						args_data.splice(0, 14);

						process_list.push({
							pid: current_data[4],
							ppid: current_data[5],
							user: current_data[0],
							cpu:  current_data[7] + " %",
							size: current_data[8] + " kB",
							bytes: current_data[8] * 1024,
							time: current_data[11],
							stime: current_data[12],
							nice: current_data[9],
							args: args_data.join(' '),
							_group: current_data[2],
							_ruser: current_data[1],
							_rgroup: current_data[3],
							_tty: (current_data[13] == "?" ? "none" : "/dev/" + current_data[13])
						});

					}

					return process_list;

				});
			}

			return null;
		});
	};

	return this;
};