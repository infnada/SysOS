var config = require('./app').config;
var server = require('./app').server;

server.listen({ host: config.listen.ip, port: config.listen.port});

server.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    config.listen.port++;
    console.warn('WebSSH2 Address in use, retrying on port ' + config.listen.port);
    setTimeout(function () {
      server.listen(config.listen.port)
    }, 250)
  } else {
    console.log('WebSSH2 server.listen ERROR: ' + err.code)
  }
});
