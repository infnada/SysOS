module.exports = function net (conn) {

	var globals = require("./globals.js")(conn);

	this.get_active_interfaces = function () {
		return globals.execAsync("netstat -rn | grep UG | awk '{print $NF}'").then(function (data) {
			return data.replace(/(\n|\r)+$/, '').split(/\s+/);
		});
	};

	this.get_boot_interfaces = function () {
		return globals.execAsync("nmcli --terse --fields DEVICE dev status").then(function (data) {
			return data.replace(/(\n|\r)+$/, '').split(/\s+/);
		});
	};

	this.get_interface_bandwidth = function (interface) {
		return globals.execAsync('R1=`cat /sys/class/net/' + interface + '/statistics/rx_bytes`;T1=`cat /sys/class/net/' + interface + '/statistics/tx_bytes`;sleep 1;R2=`cat /sys/class/net/' + interface + '/statistics/rx_bytes`;T2=`cat /sys/class/net/' + interface + '/statistics/tx_bytes`;TBPS=`expr $T2 - $T1`; RBPS=`expr $R2 - $R1`;TKBPS=`expr $TBPS / 1024`;RKBPS=`expr $RBPS / 1024`;echo "$TKBPS $RKBPS"').then(function (data) {

			data.replace(/(\n|\r)+$/, '').split(/\s+/);

			var transmit = parseInt(data[0]) | 0;
			var received = parseInt(data[1]) | 0;

			return {
				"transmit": transmit,
				"received": received,
				"total": transmit + received,
				"interface": interface
			};

		});
	};

	return this;
};