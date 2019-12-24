let fs = require('fs');

console.log('Running monitor.js');

/**
 * Netdata
 */
fs.readFile('dist/anyOpsOS/filesystem/bin/libs/anyopsos-lib-ext-netdata.umd.js', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let result = data;

  result = result.replace(/NETDATA\$1/g, 'NETDATA');
  // Remove global NETDATA var
  result = result.replace('var NETDATA = window.NETDATA || {};', '');

  // Remove global and make it inside Dashboard function to call it from angular
  result = result.replace('(function(window, document, $, undefined$1) {', 'var Dashboard = function(connection, $, Dygraph, Gauge, Ps, undefined$1) {\n' +
    '\n' +
    '// Addeded with package.json postscript\n' +
    'var NETDATA = {}\n' +
    'NETDATA.connection = connection;\n' +
    '\n' +
    'let netdataNoSparklines = false;\n' +
    'let netdataNoPeitys = false;\n' +
    'let netdataNoGoogleCharts = false;\n' +
    'let netdataNoD3pie = false;\n' +
    'let netdataNoBootstrap = false;\n' +
    'let netdataNoFontAwesome = false;\n' +
    'let netdataIcons;\n' +
    'let netdataErrorCallback = null;\n' +
    'let netdataRegistry = false;\n' +
    'let netdataNoRegistry = false;\n' +
    'let netdataRegistryCallback = null;\n' +
    'let netdataShowHelp = true;\n' +
    'netdataShowAlarms = true;\n' +
    'let netdataRegistryAfterMs = 1500;\n' +
    'let netdataCallback = null;\n' +
    'let netdataPrepCallback = null;\n' +
    'let netdataServer;\n' +
    'let netdataServerStatic;\n' +
    'netdataSnapshotData = null;\n' +
    'let netdataAlarmsRecipients = null;\n' +
    'let netdataAlarmsRemember = true;\n' +
    'let netdataAlarmsActiveCallback;\n' +
    'let netdataAlarmsNotifCallback;\n' +
    'let netdataIntersectionObserver = true;\n' +
    'netdataCheckXSS = false;\n\n' + '');

  result = result.replace('})(window, document, (typeof jQuery === \'function\')?jQuery:undefined);', 'return NETDATA;\n' +
    '};');
  result = result.replace('    var Dashboard = /*#__PURE__*/Object.freeze({\n' +
    '        __proto__: null\n' +
    '    });', '');

  // Make global vars as local
  result = result.replace(/([^.])netdataShowAlarms/g, '$1NETDATA.netdataShowAlarms');
  result = result.replace(/([^.])netdataSnapshotData/g, '$1NETDATA.netdataSnapshotData');
  result = result.replace(/([^.])netdataCheckXSS/g, '$1NETDATA.netdataCheckXSS');

  // Set correct URL
  result = result.replace(/NETDATA\._scriptSource = function \(\) {(.+?(?=};))};/s, 'NETDATA._scriptSource = function () {\n' +
    '        return (NETDATA.connection && (NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\') ? NETDATA.connection.url : window.location.origin);\n' +
    '    };');

  // Do not load dynamic css
  result = result.replace('NETDATA.loadRequiredCSS(0);', '//NETDATA.loadRequiredCSS(0);');

  // Do not load external js, just start NETDATA
  result = result.replace(/NETDATA\._loadjQuery\(function \(\) {(.+?(?=}\);))(.+?(?=}\);))}\);/s, 'NETDATA.start();');

  // Remove global and make it inside DashboardInfo function to call it from angular
  result = result.replace('var netdataDashboard = window.netdataDashboard || {};', 'var DashboardInfo = function(NETDATA, netdataDashboard) {');
  result = result.replace('    var DashboardInfo = /*#__PURE__*/Object.freeze({\n' +
    '        __proto__: null\n' +
    '    });', 'return netdataDashboard\n' +
    '};');

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
  result = result.replace('data = NETDATA.xss.checkOptional(\'/api/v1/charts\', data);', 'data = NETDATA.xss.checkOptional(\'/api/v1/charts\', (!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'netdata-credential\' || NETDATA.connection.type === \'snapshot\' ? data : data.data));');
  result = result.replace('chart = NETDATA.xss.checkOptional(\'/api/v1/chart\', chart);', 'chart = NETDATA.xss.checkOptional(\'/api/v1/chart\', (!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'netdata-credential\' || NETDATA.connection.type === \'snapshot\' ? chart : chart.data));');
  result = result.replace('data = NETDATA.xss.checkData(\'/api/v1/data\', data, that.library.xssRegexIgnore);', 'data = NETDATA.xss.checkData(\'/api/v1/data\', (!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'netdata-credential\' || NETDATA.connection.type === \'snapshot\' ? data : data.data), that.library.xssRegexIgnore);');
  result = result.replace('data = NETDATA.xss.checkData(\'/api/v1/data\', data, this.library.xssRegexIgnore);', 'data = NETDATA.xss.checkData(\'/api/v1/data\', (!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'netdata-credential\' || NETDATA.connection.type === \'snapshot\' ? data : data.data), this.library.xssRegexIgnore);');

  result = result.replace('"/api/v1/chart?chart="', '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? "/api/v1/chart?chart=" : \'/api/monitor/chart/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/?chart=\')');
  result = result.replace('\'/api/v1/alarms?\'', '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/alarms?\' : \'/api/monitor/alarms/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/?\')');
  result = result.replace('\'/api/v1/alarm_log?after=\'', '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/alarm_log?after=\' : \'/api/monitor/alarm_log/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/?after=\')');

  result = result.replace(/'\/api\/v1\/alarm_log'/g, '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/alarm_log\' : \'/api/monitor/alarm_log/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/\')');
  result = result.replace(/'\/api\/v1\/alarms'/g, '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/alarms\' : \'/api/monitor/alarms/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/\')');
  result = result.replace(/'\/api\/v1\/charts'/g, '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/charts\' : \'/api/monitor/charts/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/\')');
  result = result.replace(/'\/api\/v1\/chart'/g, '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/chart\' : \'/api/monitor/chart/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/\')');
  result = result.replace(/'\/api\/v1\/data'/g, '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/data\' : \'/api/monitor/data/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/\')');

  result = result.replace('this.chart.data_url', '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? this.chart.data_url : this.chart.data_url.replace(\'api/v1/data\', \'api/monitor/data/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/\'))');

  result = result.replace('key = key + \'.\' + _this_1.dataStore.connections[connection.uuid].netdataDashboard.sparklines_registry[key].count;', 'key = key + \'.\' + 1');

  result = result.replace(/this.timeoutId = undefined\$1;/g, 'NETDATA.globalSelectionSync.timeoutId = undefined$1;');

  // Make sure listeners are on correct div
  result = result.replace('window.addEventListener(\'resize\', NETDATA.onresize, NETDATA.supportsPassiveEvents() ? {passive: true} : false);', '');
  result = result.replace('window.addEventListener(\'scroll\', NETDATA.onscroll, NETDATA.supportsPassiveEvents() ? {passive: true} : false);', '');

  // Not necessary
  result = result.replace('$(\'a[data-toggle="tab"]\').on(\'shown.bs.tab\', NETDATA.onscroll);', '');
  result = result.replace(/.*\$modal.*/g, '');
  result = result.replace(/.*\$collapse.*/g, '');

  fs.writeFile('dist/anyOpsOS/filesystem/bin/libs/anyopsos-lib-ext-netdata.umd.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
