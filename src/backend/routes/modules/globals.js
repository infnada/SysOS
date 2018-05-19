/*jslint node: true */
"use strict";

var Promise = require("bluebird");

module.exports = function (conn) {

  return {
    execAsync: function (command) {
      var streamed_data = "";
      return new Promise(function (resolve, reject) {
        if (conn === undefined) return reject("no conn");
        conn.exec(command, {pty: true}, function(err, stream) {
          if (err) return reject(err);
          stream.on('data', function(data, err) {
            streamed_data += data.toString('utf8')
          }).stderr.on('data', function(data) {
            return reject(data.toString('utf8'));
          }).on('close', function() {
            return resolve(streamed_data);
          });
        });
      });
    }
  };

};
