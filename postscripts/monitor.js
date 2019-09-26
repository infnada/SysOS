let fs = require('fs');

console.log('Running monitor.js');

/**
 * Monitor
 */
fs.readFile('dist/SysOS/filesystem/bin/applications/sysos-app-monitor.umd.js', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let result = data;


  result = result.replace(/NETDATA\$1/g, 'NETDATA');

  // Set correct URL
  result = result.replace(/NETDATA\._scriptSource = function \(\) {(.+?(?=};))};/s, 'NETDATA._scriptSource = function () {\n' +
    '        return (connection.type === \'netdata\' ? connection.url : window.location.origin);\n' +
    '    };');

  // Do not load dynamic css
  result = result.replace('NETDATA.loadRequiredCSS(0);', '//NETDATA.loadRequiredCSS(0);');

  // Do not load external js, just start NETDATA
  result = result.replace(/NETDATA\._loadjQuery\(function \(\) {(.+?(?=}\);))(.+?(?=}\);))}\);/s, 'NETDATA.start();');

  // Remove global and make it inside Dashboard function to call it from angular
  result = result.replace('(function(window, document, $, undefined$1) {', 'var Dashboard = function(connection, $, Dygraph, Gauge, Ps, undefined$1) {' + '// Addeded with package.json postscript\n' +
    'let netdataSnapshotData;\n' +
    'let netdataShowHelp;\n' +
    'let netdataShowAlarms = true;\n' +
    'let netdataRegistryAfterMs;\n' +
    'let netdataRegistry;\n' +
    '\n');
  result = result.replace('})(window, document, (typeof jQuery === \'function\')?jQuery:undefined);', '};');
  result = result.replace('    var Dashboard = /*#__PURE__*/Object.freeze({\n' +
    '\n' +
    '    });', '');

  // Remove global and make it inside DashboardInfo function to call it from angular
  result = result.replace('var netdataDashboard = window.netdataDashboard || {};', 'var DashboardInfo = function(netdataDashboard) {');
  result = result.replace('    var DashboardInfo = /*#__PURE__*/Object.freeze({\n' +
    '\n' +
    '    });', '};');

  // Do not load dygraph since its already loaded as external library
  result = result.replace(/NETDATA\.dygraphInitialize = function \(callback\) {(.+?(?=};))};/s, 'NETDATA.dygraphInitialize = function (callback) {\n' +
    '      NETDATA.registerChartLibrary(\'dygraph\', NETDATA.dygraph_js);\n' +
    '\n' +
    '      if (NETDATA.chartLibraries.dygraph.enabled && NETDATA.options.current.smooth_plot) {\n' +
    '        NETDATA.dygraphSmoothInitialize(callback);\n' +
    '      } else if (typeof callback === "function") {\n' +
    '        return callback();\n' +
    '      }\n' +
    '    };');

  result = result.replace(/NETDATA\.dygraphSmoothInitialize = function \(callback\) {(.+?(?=};))};/s, 'NETDATA.dygraphSmoothInitialize = function (callback) {\n' +
    '      NETDATA.dygraph.smooth = true;\n' +
    '      smoothPlotter.smoothing = 0.3;\n' +
    '\n' +
    '      if (typeof callback === "function") {\n' +
    '        return callback();\n' +
    '      }\n' +
    '    };');

  // Do not load easypiechart since its already loaded as external library
  result = result.replace(/NETDATA\.easypiechartInitialize = function \(callback\) {(.+?(?=};))};/s, 'NETDATA.easypiechartInitialize = function (callback) {\n' +
    '      NETDATA.registerChartLibrary(\'easypiechart\', NETDATA.easypiechart_js);\n' +
    '\n' +
    '      if (typeof callback === "function") {\n' +
    '        return callback();\n' +
    '      }\n' +
    '    };');

  // Do not load gaugejs since its already loaded as external library
  result = result.replace(/NETDATA\.gaugeInitialize = function \(callback\) {(.+?(?=};))};/s, 'NETDATA.gaugeInitialize = function (callback) {\n' +
    '      NETDATA.registerChartLibrary(\'gauge\', NETDATA.gauge_js);\n' +
    '\n' +
    '      if (typeof callback === "function") {\n' +
    '        return callback();\n' +
    '      }\n' +
    '    };');

  result = result.replace(/smoothPlotter/g, 'Dygraph.smoothPlotter');

  // Change url where to fetch server data
  result = result.replace('data = NETDATA.xss.checkOptional(\'/api/v1/charts\', data);', 'data = NETDATA.xss.checkOptional(\'/api/v1/charts\', (connection.type === \'netdata\' ? data : data.data));');
  result = result.replace('chart = NETDATA.xss.checkOptional(\'/api/v1/chart\', chart);', 'chart = NETDATA.xss.checkOptional(\'/api/v1/chart\', (connection.type === \'netdata\' ? chart : chart.data));');
  result = result.replace('data = NETDATA.xss.checkData(\'/api/v1/data\', data, that.library.xssRegexIgnore);', 'data = NETDATA.xss.checkData(\'/api/v1/data\', (connection.type === \'netdata\' ? data : data.data), that.library.xssRegexIgnore);');
  result = result.replace('data = NETDATA.xss.checkData(\'/api/v1/data\', data, this.library.xssRegexIgnore);', 'data = NETDATA.xss.checkData(\'/api/v1/data\', (connection.type === \'netdata\' ? data : data.data), this.library.xssRegexIgnore);');

  result = result.replace(/'\/api\/v1\/charts'/g, '(connection.type === \'netdata\' ? \'/api/v1/charts\' : \'/api/monitor/charts/\' + connection.uuid + \'/\')');
  result = result.replace(/'\/api\/v1\/chart'/g, '(connection.type === \'netdata\' ? \'/api/v1/chart\' : \'/api/monitor/chart/\' + connection.uuid + \'/\')');
  result = result.replace(/'\/api\/v1\/data'/g, '(connection.type === \'netdata\' ? \'/api/v1/data\' : \'/api/monitor/data/\' + connection.uuid + \'/\')');

  result = result.replace(/\$\.ajax\({/g, '$.ajax({\n' +
    '            beforeSend: function (xhr) {\n' +
    '              if (connection.credentialBtoa) xhr.setRequestHeader("Authorization", "Basic " + connection.credentialBtoa);\n' +
    '            },');


  result = result.replace('key = key + \'.\' + _this.dataStore.netdataDashboard.sparklines_registry[key].count;', 'key = key + \'.\' + 1');

  result = result.replace(/this.timeoutId = undefined\$1;/g, 'NETDATA.globalSelectionSync.timeoutId = undefined$1;');

  //result = result.replace(/= \(\) =>/g, '= function()');

  fs.writeFile('dist/SysOS/filesystem/bin/applications/sysos-app-monitor.umd.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
