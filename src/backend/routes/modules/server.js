var Promise = require("bluebird");

module.exports = function server (conn) {

	var _this = this;
	var globals = require("./globals.js")(conn);

	this.get_release = function () {
		return globals.execAsync('cat /etc/centos-release').then(function (data) {
			return data.replace(/(\n|\r)+$/, '');
		});
	};

	this.get_kernel = function () {
		return globals.execAsync('uname -r').then(function (data) {
			return data.replace(/(\n|\r)+$/, '');
		});
	};

	this.get_cpu = function () {
		return Promise.all([
			globals.execAsync('lscpu'),
			globals.execAsync('cat /proc/loadavg')
		]).then(function (data) {
			var current_data;
			var cpu_options = [];
			data[0] = data[0].split(/\r?\n/);
			data[0].pop();

			for (var i = 0, len = data[0].length; i < len; i++) {
				current_data = data[0][i].split(/:\s+/);

				cpu_options.push({
					option: current_data[0],
					data: current_data[1]
				});
			}

			cpu_options.push({
				option: "Load average",
				data: data[1].replace(/\r?\n/, "")
			});

			return cpu_options;
		});
	};

	this.get_disk = function () {
		return globals.execAsync('df -h -x tmpfs -x devtmpfs').then(function (data) {
			var current_data;
			var disk_options = [];
			data = data.split(/\r?\n/);
			data.shift();
			data.pop();

			for (var i = 0, len = data.length; i < len; i++) {
				current_data = data[i].split(/\s+/);

				disk_options.push({
					disk: current_data[0],
					size: current_data[1],
					used_space: current_data[2],
					used_percent: current_data[4],
					free_space: current_data[3],
					free_percent: 100 - parseInt(current_data[4].slice(0, -1)) + "%",
					mount_point: current_data[5]
				});
			}

			return disk_options;
		});
	};

	this.get_mem_type = function () {
		return globals.execAsync('dmidecode --type 17 | grep -i "deta" |head -1').then(function (data) {
			data = data.split(/\r?\n/);

			return data[0].substr(data[0].indexOf(':') + 2);
		});
	};

	this.get_mem_speed = function () {
		return globals.execAsync('dmidecode  | grep -i "Current speed" |grep "MHz" |head -1').then(function (data) {
			data = data.split(/\r?\n/);

			return data[0].substr(data[0].indexOf(':') + 2);
		});
	};

	this.get_mem = function () {
		return Promise.all([
			_this.get_mem_speed(),
			_this.get_mem_type()
		]).then(function (result) {

			return globals.execAsync('free -m').then(function (data) {
				var current_data;
				var mem_options = [];
				data = data.split(/\r?\n/);
				data.shift();
				data.pop();

				current_data = data[0].split(/\s+/);

				mem_options.push({
					total: current_data[1],
					used: current_data[2],
					free: current_data[3],
					shared: current_data[4],
					cache: current_data[5],
					available: current_data[6],
					type: result[1],
					speed: result[0]
				});

				return mem_options;
			});
		});
	};

	return this;
};
