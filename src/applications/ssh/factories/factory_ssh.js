(function () {
	"use strict";
	sshApp.factory('sshFactory', ['socket', 'connectionsFactory', 'toastr', '$timeout',
		function (socket, connectionsFactory, toastr, $timeout) {

			// Private
			var activeConnection = null;
			var sessionLog = [];
			var sessionLogEnable = false;
			var logDate;
			var currentDate;

			var newData = function (data) {
				var terminals = connectionsFactory.getSSHTerminals();

				terminals[data.uuid].write(data.text);
				if (sessionLogEnable) {
					sessionLog[data.uuid] += data.text
				}
			};

			var newProp = function (data) {
				connectionsFactory.getConnectionByUuid(data.uuid)[data.prop] = data.text;

				// CONN CLOSE
				if (data.prop === "status" && data.text === "CONN CLOSE") {
					connectionsFactory.getConnectionByUuid(data.uuid).state = "disconnected";

					// CON ERROR
				} else if (data.prop === "status" && data.text !== "SSH CONNECTION ESTABLISHED") {

					// Error connecting
					if (connectionsFactory.getConnectionByUuid(data.uuid).state === "new") {
						connectionsFactory.getConnectionByUuid(data.uuid).state = "disconnected";
					}
					connectionsFactory.getConnectionByUuid(data.uuid).error = data.text;
					toastr.error(data.text, 'Error (' + connectionsFactory.getConnectionByUuid(data.uuid).host + ')');

					// CONN OK
				} else if (data.text === "SSH CONNECTION ESTABLISHED") {
					connectionsFactory.getConnectionByUuid(data.uuid).state = "connected";
					connectionsFactory.getConnectionByUuid(data.uuid).error = null;
					toastr.success(data.text, 'Connected (' + connectionsFactory.getConnectionByUuid(data.uuid).host + ')');
				}
			};

			// Public
			var resizeTerminal = function () {
				var cols;
				var rows;

				var terminals = connectionsFactory.getSSHTerminals();

				for (var i in terminals){
					if (terminals.hasOwnProperty(i)) {

						var term = terminals[i];
						if (!term.element || !term.element.parentElement) {
							return null;
						}
						var parentElementStyle = window.getComputedStyle(term.element.parentElement);
						var parentElementHeight = parseInt(parentElementStyle.getPropertyValue('height'));
						var parentElementWidth = Math.max(0, parseInt(parentElementStyle.getPropertyValue('width')));

						if (!term.renderer.dimensions.actualCellWidth) term.renderer.dimensions.actualCellWidth = 9;
						if (!term.renderer.dimensions.actualCellHeight) term.renderer.dimensions.actualCellHeight = 17;

						var geometry = {
							cols: Math.floor((parentElementWidth - 10) / term.renderer.dimensions.actualCellWidth),
							rows: Math.floor(parentElementHeight / term.renderer.dimensions.actualCellHeight)
						};

						if (geometry) {
							if (term.rows !== geometry.rows || term.cols !== geometry.cols) {
								term.renderer.clear();
								term.resize(geometry.cols, geometry.rows);
							}
						}

						cols = terminals[i].cols;
						rows = terminals[i].rows;

						console.log(cols, rows);

						socket.emit('ssh_session__geometry', cols, rows);
					}
				}

			};

			/*
			 * SSH download log
			 */
			var downloadLog = function (uuid) {
				if (uuid === undefined) return;

				var myFile = 'WebSSH2-' + logDate.getFullYear() + (logDate.getMonth() + 1) + logDate.getDate() + '_' + logDate.getHours() + logDate.getMinutes() + logDate.getSeconds() + '.log';

				// regex should eliminate escape sequences from being logged.
				var blob = new Blob([sessionLog[uuid].replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')], {
					type: 'text/plain'
				});

				if (window.navigator.msSaveOrOpenBlob) {
					window.navigator.msSaveBlob(blob, myFile)
				} else {
					var elem = window.document.createElement('a');
					elem.href = window.URL.createObjectURL(blob);
					elem.download = myFile;
					document.body.appendChild(elem);
					elem.click();
					document.body.removeChild(elem);
				}
			};

			/*
			 * SSH toggle logging
			 */
			var toggleConnectionLog = function () {
				var connections = connectionsFactory.connections();

				if (sessionLogEnable === true) {
					currentDate = new Date();

					connections.sshApp.forEach(function (connection) {
						sessionLog[connection.uuid] += '\r\n\r\nLog End for ' + null + ': ' +
							currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/' +
							currentDate.getDate() + ' @ ' + currentDate.getHours() + ':' +
							currentDate.getMinutes() + ':' + currentDate.getSeconds() + '\r\n'
					});

					logDate = currentDate;
				} else {
					currentDate = new Date();

					connections.sshApp.forEach(function (connection) {
						sessionLog[connection.uuid] = 'Log Start for ' + null + ': ' +
							currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/' +
							currentDate.getDate() + ' @ ' + currentDate.getHours() + ':' +
							currentDate.getMinutes() + ':' + currentDate.getSeconds() + '\r\n\r\n'
					});

					logDate = currentDate;
				}

				sessionLogEnable = !sessionLogEnable;
			};

			return {
				resizeTerminal: resizeTerminal,
				setActiveConnection: function (uuid) {
					activeConnection = uuid;
					$timeout(function () {resizeTerminal();}, 100);
				},
				activeConnection: function () {
					return activeConnection;
				},
				newData: newData,
				newProp: newProp,
				downloadLog: downloadLog,
				toggleConnectionLog: toggleConnectionLog
			};

		}]);
}());