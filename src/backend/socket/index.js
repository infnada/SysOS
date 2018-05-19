 // socket/index.js

var validator = require('validator');
var path = require('path');
var config = require('read-config')(path.join(__dirname, '../filesystem/etc/expressjs/config.json'));

// public
module.exports = function socket (socket) {
  var ssh = require('./modules/ssh.js')(socket);
  var snmp = require('./modules/snmp.js')(socket);

  // if websocket connection arrives without an express session, kill it
  if (!socket.request.session) {
    socket.emit('401 UNAUTHORIZED');
    socket.disconnect(true);
    return;
  }

  // Default socket.io messages
  socket.on('disconnecting', function (reason) {});
  socket.on('disconnect', function (reason) {
    ssh.closeConnection(null, null);
  });
  socket.on('error', function (err) {
    ssh.closeConnection(null, null);
  });

  var newConnection = function (type, host, credential, port, uuid, so) {
    host = (validator.isIP(host + '') && host) || (validator.isFQDN(host) && host) || (/^(([a-z]|[A-Z]|[0-9]|[!^(){}\-_~])+)?\w$/.test(host) && host);

    //snmp connection
    if (so === "snmp") {
      return snmp.newConnection(type, uuid, host);
    }

    //get username and password from credential
    var credentials = require('read-config')(path.join(__dirname, '../filesystem/etc/applications/cmanager/config.json'));

    credential = credentials.saved_credentials.filter(function( obj ) {
      return obj.uuid === credential;
    })[0];

    // linux connection
    console.log(type);
    if (so === "linux" || type === "ssh" || type === "sftp") {
      port = (validator.isInt(port + '', {min: 1, max: 65535}) && port) || config.ssh.port;
      if (credential) {
        ssh.newConnection(type, uuid, host, port, credential.username, credential.password);
      }
    }

  };

/*
 *
 * GLOBAL session
 *
 */

  socket.on('session__disconnect', function (session_type, uuid) {
    ssh.closeConnection(session_type, uuid);
  });

  socket.on('session__new', function (session_type, host, credential, port, uuid, so) {
    newConnection(session_type, host, credential, port, uuid, so);
  });

};
