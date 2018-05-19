module.exports = function (socket) {

	var path = require('path');
	var config = require('read-config')(path.join(__dirname, '../../filesystem/etc/expressjs/config.json'));
	var socketFactory = require('./socketFactory.js')(socket);
	var sshSession = require('./sshSessions.js')();

	var term = config.ssh.term;
	var termCols = 80;
	var termRows = 24;

	return {
		newConnection: function (type, uuid, host, port, username, password) {

			var closeOnError = function (err) {
				console.log(err);
				//sshSession.closeSession(type, uuid);
				socketFactory.emitProp(type, err, uuid, 'status');
			  	//socketFactory.emitProp(type, 'disconnected', uuid, 'type');
			};

			sshSession.createSession(type, uuid, host, port, username, password, function (session) {
				//session.on('end', function (err) { socketFactory.emitProp(type, "CONN END BY HOST " + err, uuid, 'status'); });
				session.on('close', function (err) { socketFactory.emitProp(type, "CONN CLOSE", uuid, 'status'); });
				session.on('error', function (err) { socketFactory.emitProp(type, "CONN ERROR " + err, uuid, 'status'); });
				session.on('banner', function (data) {
				  // need to convert to cr/lf for proper formatting
					data = data.replace(/\r?\n/g, '\r\n');
					socketFactory.emitData(type, data, uuid);
				});

				if (type === "ssh") {
					session.on('keyboard-interactive', function (name, instructions, instructionsLang, prompts, finish) {
				  		finish([password])
					});
				}

				session.on('ready', function () {
					socketFactory.emitProp(type, 'ssh://' + username + '@' + host + ':' + port, uuid, 'footer');
					socketFactory.emitProp(type, 'SSH CONNECTION ESTABLISHED', uuid, 'status');

					/*
					 * SSH
					 */
					if (type === "ssh") {
						session.shell({
					    	term: term,
					    	cols: termCols,
					    	rows: termRows
					  	}, function (err, stream) {
						  	if (err) return closeOnError(err);

						  	socketFactory.emitProp(type, 'connected', uuid, 'type');
						  	socket.on('ssh_session__geometry', function (cols, rows) {
						      stream.setWindow(rows, cols);
						    });
						    socket.on('ssh_session__data', function (data, id) {
						      if (id !== uuid) return;
						      stream.write(data)
						    });

						    stream.on('data', function (data) {
						    	socketFactory.emitData(type, data, uuid);
						    });
						    stream.on('close', function (code, signal) {
						    	err = { message: ((code || signal) ? (((code) ? 'CODE: ' + code : '') + ((code && signal) ? ' ' : '') + ((signal) ? 'SIGNAL: ' + signal : '')) : undefined) };
						    	closeOnError(err);
						    });
						    stream.stderr.on('data', function () {
						      socketFactory.emitProp(type, err, uuid, 'status');
						    });

						});

				  	/*
				   	 * SFTP
				   	 */
					} else if (type === "sftp") {
						session.sftp(function(err, sftp) {
		         			if (err) return closeOnError(err);

		         			session.sftpSession = sftp;

					  		socketFactory.emitProp(type, 'connected', uuid, 'type');

		          			sftp.readdir('/', function(err, data) {
		            			if (err) return closeOnError(err);

		            			socketFactory.emitPath(type, data, uuid, '/');
		          			});

				         	/*
				        	 * sftp_session__file_upload
				        	 */
				        	socket.on('sftp_session__file_upload', function (source, destination, id) {
				          		if (id !== uuid) return;
				          		var percentage = 0;
				            	sftp.fastPut(path.join(__dirname, '../../filesystem') + source, destination, {
				            		step: function (a,b,c) {

					            		var result = ((a * 100) / c).toFixed();
					            		if (result !== percentage) {
					            			percentage = result;

					            			socketFactory.emitProgress(result, source, destination, 'upload', id);
					            			//emit percentage
					            		}
					            	}
					            }, function(err) {
					            	console.log(err);
						            if (err) return closeOnError(err);
						        });
					        });

					        /*
					         * sftp_session__file_download
					         */
					        socket.on('sftp_session__file_download', function (destination, source, id) {
					          	if (id !== uuid) return;

					          	console.log(source, destination);

					          	var percentage = 0;
					            sftp.fastGet(source, path.join(__dirname, '../../filesystem') + destination, {
					            	step: function (a,b,c) {

					            		var result = ((a * 100) / c).toFixed();
					            		if (result !== percentage) {
					            			percentage = result;

					            			socketFactory.emitProgress(result, source, destination, 'download', id);
					            			//emit percentage
					            		}
			            			}
			            		}, function(err) {
					            	console.log(err);
						            if (err) return closeOnError(err);
						        });
					        });

		        			sftp.on('close', function streamOnClose (code, signal) {
		            			err = { message: ((code || signal) ? (((code) ? 'CODE: ' + code : '') + ((code && signal) ? ' ' : '') + ((signal) ? 'SIGNAL: ' + signal : '')) : undefined) };
		            			closeOnError(err);
		          			});
		        		});

		        	/*
				   	 * SMANAGER
				   	 */
					} else if (type === "smanager") {
            			socketFactory.emitProp(type, 'connected', uuid, 'type');
          			}
				});
			});
		},
		closeConnection: function (type, uuid) {
			if (uuid === null) {
				sshSession.getAllSessions(function (sessions) {
					sessions['ssh'].forEach(function(session) {
            session.end();
          });
          sessions['sftp'].forEach(function(session) {
            session.end();
          });
				});
			} else {
				socketFactory.emitProp(type, 'disconnected', uuid, 'type');
				sshSession.closeSession(type, uuid);
			}
		}
	}

};
