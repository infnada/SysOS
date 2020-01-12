let fs = require('fs');
const util = require('util');

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

console.log('Running notepad.js');

/**
 * mxGraph
 */
fs.readFile('dist/applications/notepad/bundles/anyopsos-app-notepad.umd.js', 'utf8', async function (err, data) {
  if (err) {
    return console.log(err);
  }

  let result = data;

  result = result.replace('path$2 = path$2 && path$2.hasOwnProperty(\'default\') ? path$2[\'default\'] : path$2;\n' +
    '    os$2 = os$2 && os$2.hasOwnProperty(\'default\') ? os$2[\'default\'] : os$2;\n' +
    '    crypto$1 = crypto$1 && crypto$1.hasOwnProperty(\'default\') ? crypto$1[\'default\'] : crypto$1;\n' +
    '    net = net && net.hasOwnProperty(\'default\') ? net[\'default\'] : net;', 'var path$2 =path$2;\n' +
    '    var os$2 = os$2;\n' +
    '    var crypto$1 = crypto$1;\n' +
    '    var net = net;\n' +
    '\n' +
    '    var process = {\n' +
    '      env: {\n' +
    '        NODE_ENV: "production"\n' +
    '      }\n' +
    '    }');

  result = result.replace(', \'path\', \'os\', \'crypto\', \'net\'', '');

  result = result.replace(', path$2, os$2, crypto$1, net', '');

  result = result.replace('URI.setUriThrowOnMissingScheme(false);', 'setUriThrowOnMissingScheme(false);');

  result = result.replace(', global.path$2, global.os$2, global.crypto$1, global.net', '');

  result = result.replace(', require(\'path\'), require(\'os\'), require(\'crypto\'), require(\'net\')', '');

  fs.writeFile('dist/applications/notepad/bundles/anyopsos-app-notepad.umd.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
