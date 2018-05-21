var Promise = require("bluebird");

module.exports = function firewalld (conn) {

	var _this = this;

	var net = require("./net.js")(conn);
	var init = require("./init.js")(conn);
	var globals = require("./globals.js")(conn);

	// is_firewalld_running()
	// Returns 1 if the server is running, 0 if not
	this.is_firewalld_running = function () {
		return globals.execAsync('firewall-cmd --state').then(function (data) {

			var status = data.replace(/\r?\n/, "");

			if (status === "running") return true;
			return false;
		}).catch(function (e) {
			return e
		});
	};

	// list_firewalld_zones([active-only])
	// Returns an array of firewalld zones, each of which is a hash ref with fields
	// like services and ports
	this.list_firewalld_zones = function (activeOnly) {
		return globals.execAsync('firewall-cmd --list-all-zones ' + (activeOnly ? "" : "--permanent")).then(function (data) {

			data = data.split(/\r?\n/);

			// Get default zone
			return _this.get_default_zone().then(function (default_zone) {

				var zones = [];
				var currentZone;

				for (var i = 0, len = data.length; i < len; i++) {
					//New zone
					if (/^(\S+)(\s+\(.*\))?/.test(data[i])) {

						// Push the last populated zone
						if (currentZone) zones.push(currentZone);

						currentZone = {
							'name': data[i],
							'default': data[i] == default_zone ? 1 : 0,
							'options': []
						};

						// Option in some zone
					} else if (/^\s+(\S+):\s*(.*)/.test(data[i])) {
						var optionsData = data[i].split(/\s+/);
						var optionName = optionsData[1];
						optionsData.splice(0, 2);

						currentZone.options.push({
							option: optionName,
							data: optionsData
						});
					}
				}

				// Push the last zone
				zones.push(currentZone);

				return zones;
			}).catch(function (e) {
				return e
			});

		}).catch(function (e) {
			return e
		});
	};

	// get_default_zone()
	// Returns an string of default zone name
	this.get_default_zone = function () {
		return globals.execAsync('firewall-cmd --get-default-zone').then(function (data) {
			return data.replace(/(\n|\r)+$/, '');
		});
	};

	// list_firewalld_services()
	// Returns an array of known service names
	this.list_firewalld_services = function () {
		return globals.execAsync('firewall-cmd --get-services').then(function (data) {
			return data.replace(/(\n|\r)+$/, '').split(/\s+/);
		});
	};

	// create_firewalld_port(zone, port|range, proto)
	// Adds a new allowed port to a zone. Returns undef on success or an error
	// message on failure
	this.create_firewalld_port = function (zone, port, proto) {
		return globals.execAsync('firewall-cmd --zone ' + zone.name + ' --permanent --add-port ' + port + '/' + proto + ' 2>&1').then(function (data) {
			console.log(data);
			return data;
		});
	};

	// delete_firewalld_port(zone, port|range, proto)
	// Delete one existing port from a zone. Returns undef on success or an error
	// message on failure
	this.delete_firewalld_port = function (zone, port, proto) {
		return globals.execAsync('firewall-cmd --zone ' + zone.name + ' --permanent --remove-port ' + port + '/' + proto + ' 2>&1').then(function (data) {
			console.log(data);
			return data;
		});
	};

	// create_firewalld_service(zone, service)
	// Adds a new allowed service to a zone. Returns undef on success or an error
	// message on failure
	this.create_firewalld_service = function (zone, service) {
		return globals.execAsync('firewall-cmd --zone ' + zone.name + ' --permanent --add-service ' + service + ' 2>&1').then(function (data) {
			console.log(data);
			return data;
		});
	};

	// delete_firewalld_service(zone, service)
	// Delete one existing service from a zone. Returns undef on success or an error
	// message on failure
	this.delete_firewalld_service = function (zone, service) {
		return globals.execAsync('firewall-cmd --zone ' + zone.name + ' --permanent --remove-service ' + service + ' 2>&1').then(function (data) {
			console.log(data);
			return data;
		});
	};

	// create_firewalld_forward(zone, src-port, src-proto, dst-port, dst-addr)
	// Create a new forwarding rule in some zone. Returns undef on success or an
	// error message on failure
	this.delete_firewalld_service = function (zone, srcport, srcproto, dstport, dstaddr) {
		return globals.execAsync('firewall-cmd --zone ' + zone.name + ' --permanent --add-forward-port=port=' + srcport + ':proto=' + srcproto + (dstport ? ':toport=' + dstport : '') + ($dstaddr ? ':toaddr=' + dstaddr : '') + ' 2>&1').then(function (data) {
			console.log(data);
			return data;
		});
	};

	// delete_firewalld_forward(zone, src-port, src-proto, dst-port, dst-addr)
	// Deletes a forwarding rule in some zone. Returns undef on success or an
	// error message on failure
	this.delete_firewalld_forward = function (zone, srcport, srcproto, dstport, dstaddr) {
		return globals.execAsync('firewall-cmd --zone ' + zone.name + ' --permanent --remove-forward-port=port=' + srcport + ':proto=' + srcproto + (dstport ? ':toport=' + dstport : '') + ($dstaddr ? ':toaddr=' + dstaddr : '') + ' 2>&1').then(function (data) {
			console.log(data);
			return data;
		});
	};

	/*
	# parse_firewalld_forward(str)
	# Parses a forward string into port, proto, dstport and dstaddr
	sub parse_firewalld_forward
	{
	my ($str) = @_;
	my %w = map { split(/=/, $_) } split(/:/, $str);
	return ($w{'port'}, $w{'proto'}, $w{'toport'}, $w{'toaddr'});
	}
	*/

	// apply_firewalld()
	// Make the current saved config active
	this.apply_firewalld = function () {
		return globals.execAsync('firewall-cmd --reload 2>&1').then(function (data) {
			console.log(data);
			return data;
		});
	};

	// stop_firewalld()
	// Shut down the firewalld service
	this.stop_firewalld = function () {
		return init.stop_actionAsync('firewalld').then(function (data) {
			console.log(data);
			return data;
		});
	};

	// start_firewalld()
	// Start the firewalld service
	this.start_firewalld = function () {
		return init.start_actionAsync('firewalld').then(function (data) {
			console.log(data);
			return data;
		});
	};

	// list_system_interfaces()
	// Returns the list of all interfaces on the system
	this.list_system_interfaces = function () {
		return net.get_boot_interfaces().then(function (data) {
			return data;
		});
	};

	// update_zone_interfaces(&zone, &interface-list)
	// Update the interfaces a zone applies to
	this.update_zone_interfaces = function (zone, newifaces) {

		return _this.list_system_interfaces().then(function (data) {

			var args;
			var promises = [];
			var oldifaces = zone.options.filter(function (el) {
				return el.option == "interfaces";
			})[0].data;

			for (var i = 0, len = data.length; i < len; i++) {

				var inold = oldifaces.indexOf(data[i]) >= 0;
				var innew = newifaces.indexOf(data[i]) >= 0;

				if (inold && !innew) {
					args = "--remove-interface " + data[i];
				} else if (!inold && innew) {
					args = "--add-interface " + data[i];
				} else {
					continue;
				}

				promises.push(
					function () {
						return globals.execAsync('firewall-cmd --zone ' + zone.name + ' --permanent ' + args + ' 2>&1 </dev/null').then(function (data) {
							console.log(data);
							return data;
						});
					}
				);
			}

			return Promise.all(promises);

		}).then(function (data) {
			return data;
		});

	};

	// create_firewalld_zone(name)
	// Add a new zone with the given name
	this.create_firewalld_zone = function (name) {
		return globals.execAsync('firewall-cmd --permanent --new-zone ' + name + ' 2>&1 </dev/null').then(function (data) {
			return data;
		});
	};

	// delete_firewalld_zone(zone)
	// Removes the specified zone
	this.delete_firewalld_zone = function (zone) {
		return globals.execAsync('firewall-cmd --permanent --delete-zone ' + zone.name + ' 2>&1 </dev/null').then(function (data) {
			return data;
		});
	};

	// default_firewalld_zone(zone)
	// Makes the specified zone the default
	this.default_firewalld_zone = function (zone) {
		return globals.execAsync('firewall-cmd --set-default-zone ' + zone.name + ' 2>&1 </dev/null').then(function (data) {
			return data;
		});
	};

	/*
	// parse_port_field(&in, name)
	// Either returns a port expression, or calls error
	sub parse_port_field
	{
	my ($in, $pfx) = @_;
	if ($in->{$pfx.'mode'} == 0) {
		$in->{$pfx.'port'} =~ /^\d+$/ &&
		  $in->{$pfx.'port'} > 0 && $in->{$pfx.'port'} < 65536 ||
		  getservbyname($in->{$pfx.'port'}, $in->{'proto'}) ||
		     &error($text{'port_eport'});
		return $in->{$pfx.'port'};
		}
	elsif ($in->{$pfx.'mode'} == 1) {
		$in->{$pfx.'portlow'} =~ /^\d+$/ &&
		  $in->{$pfx.'portlow'} > 0 && $in->{$pfx.'portlow'} < 65536 ||
		     &error($text{'port_eportlow'});
		$in->{$pfx.'porthigh'} =~ /^\d+$/ &&
		  $in->{$pfx.'porthigh'} > 0 && $in->{$pfx.'porthigh'} < 65536 ||
		     &error($text{'port_eporthigh'});
		$in->{$pfx.'portlow'} < $in->{$pfx.'porthigh'} ||
		     &error($text{'port_eportrange'});
		return $in->{$pfx.'portlow'}."-".$in->{$pfx.'porthigh'};
		}
	else {
		# No port chosen
		return undef;
		}
	}*/

	return this;
};