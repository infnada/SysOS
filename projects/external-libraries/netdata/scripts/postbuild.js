console.log('Running monitor.js');

const replace = require('replace-in-file');

const mainFunction = 'var Dashboard = function(connection, $, Dygraph, Gauge, Ps, undefined$1) {\n' +
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
  'netdataCheckXSS = false;\n\n';


const options = {
  files: 'dist/external-libraries/netdata/bundles/anyopsos-ext-lib-netdata.umd.js',
  from: [
    /NETDATA\$1/g,

    // Remove global NETDATA var
    'var NETDATA = window.NETDATA || {};',

    // Remove global and make it inside Dashboard function to call it from angular
    '(function(window, document, $, undefined$1) {',
    '})(window, document, (typeof jQuery === \'function\')?jQuery:undefined);',
    '    var Dashboard = /*#__PURE__*/Object.freeze({\n        __proto__: null\n    });',

    // Make global vars as local
    /([^.])netdataShowAlarms/g,
    /([^.])netdataSnapshotData/g,
    /([^.])netdataCheckXSS/g,

    // Do not load dynamic css
    'NETDATA.loadRequiredCSS(0);',

    // Do not load external js, just start NETDATA
    /NETDATA\._loadjQuery\(function \(\) {(.+?(?=}\);))(.+?(?=}\);))}\);/s,

    // Set correct URLs
    /NETDATA\._scriptSource = function \(\) {(.+?(?=};))};/s,

    // Remove global and make it inside DashboardInfo function to call it from angular
    'var netdataDashboard = window.netdataDashboard || {};',
    '    var DashboardInfo = /*#__PURE__*/Object.freeze({\n        __proto__: null\n    });',

    // Do not load dygraph since its already loaded as external library
    /NETDATA\.dygraphInitialize = function \(callback\) {(.+?(?=};))};/s,
    /NETDATA\.dygraphSmoothInitialize = function \(callback\) {(.+?(?=};))};/s,
    /smoothPlotter/g,

    // Do not load easypiechart since its already loaded as external library
    /NETDATA\.easypiechartInitialize = function \(callback\) {(.+?(?=};))};/s,

    // Do not load gaugejs since its already loaded as external library
    /NETDATA\.gaugeInitialize = function \(callback\) {(.+?(?=};))};/s,

    // Change url where to fetch server data
    'data = NETDATA.xss.checkOptional(\'/api/v1/charts\', data);',
    'chart = NETDATA.xss.checkOptional(\'/api/v1/chart\', chart);',
    'data = NETDATA.xss.checkData(\'/api/v1/data\', data, that.library.xssRegexIgnore);',
    'data = NETDATA.xss.checkData(\'/api/v1/data\', data, this.library.xssRegexIgnore);',

    '"/api/v1/chart?chart="',
    '\'/api/v1/alarms?\'',
    '\'/api/v1/alarm_log?after=\'',

    /'\/api\/v1\/alarm_log'/g,
    /'\/api\/v1\/alarms'/g,
    /'\/api\/v1\/charts'/g,
    /'\/api\/v1\/chart'/g,
    /'\/api\/v1\/data'/g,

    'this.chart.data_url',

    // Make sure listeners are on correct div
    'window.addEventListener(\'resize\', NETDATA.onresize, NETDATA.supportsPassiveEvents() ? {passive: true} : false);',
    'window.addEventListener(\'scroll\', NETDATA.onscroll, NETDATA.supportsPassiveEvents() ? {passive: true} : false);',

    // Not necessary
    '$(\'a[data-toggle="tab"]\').on(\'shown.bs.tab\', NETDATA.onscroll);',
    /.*\$modal.*/g,
    /.*\$collapse.*/g,

    'key = key + \'.\' + _this_1.dataStore.connections[connection.uuid].netdataDashboard.sparklines_registry[key].count;',
    /this.timeoutId = undefined\$1;/g
  ],
  to: [
    'NETDATA',
    '',
    mainFunction,
    'return NETDATA;\n};',
    '',
    '$1NETDATA.netdataShowAlarms',
    '$1NETDATA.netdataSnapshotData',
    '$1NETDATA.netdataCheckXSS',
    '',
    'NETDATA.start();',
    'NETDATA._scriptSource = function () {\n        return (NETDATA.connection && (NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\') ? NETDATA.connection.url : window.location.origin);\n};',
    'var DashboardInfo = function(NETDATA, netdataDashboard) {',
    'return netdataDashboard\n};',

    'NETDATA.dygraphInitialize = function (callback) {\n' +
    '      NETDATA.registerChartLibrary(\'dygraph\', NETDATA.dygraph_js);\n' +
    '\n' +
    '      if (NETDATA.chartLibraries.dygraph.enabled && NETDATA.options.current.smooth_plot) {\n' +
    '        NETDATA.dygraphSmoothInitialize(callback);\n' +
    '      } else if (typeof callback === "function") {\n' +
    '        return callback();\n' +
    '      }\n' +
    '    };',

    'NETDATA.dygraphSmoothInitialize = function (callback) {\n' +
    '      NETDATA.dygraph.smooth = true;\n' +
    '      smoothPlotter.smoothing = 0.3;\n' +
    '\n' +
    '      if (typeof callback === "function") {\n' +
    '        return callback();\n' +
    '      }\n' +
    '    };',

    'Dygraph.smoothPlotter',

    'NETDATA.easypiechartInitialize = function (callback) {\n' +
    '      NETDATA.registerChartLibrary(\'easypiechart\', NETDATA.easypiechart_js);\n' +
    '\n' +
    '      if (typeof callback === "function") {\n' +
    '        return callback();\n' +
    '      }\n' +
    '    };',

    'NETDATA.gaugeInitialize = function (callback) {\n' +
    '      NETDATA.registerChartLibrary(\'gauge\', NETDATA.gauge_js);\n' +
    '\n' +
    '      if (typeof callback === "function") {\n' +
    '        return callback();\n' +
    '      }\n' +
    '    };',

    'data = NETDATA.xss.checkOptional(\'/api/v1/charts\', (!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'netdata-credential\' || NETDATA.connection.type === \'snapshot\' ? data : data.data));',
    'chart = NETDATA.xss.checkOptional(\'/api/v1/chart\', (!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'netdata-credential\' || NETDATA.connection.type === \'snapshot\' ? chart : chart.data));',
    'data = NETDATA.xss.checkData(\'/api/v1/data\', (!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'netdata-credential\' || NETDATA.connection.type === \'snapshot\' ? data : data.data), that.library.xssRegexIgnore);',
    'data = NETDATA.xss.checkData(\'/api/v1/data\', (!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'netdata-credential\' || NETDATA.connection.type === \'snapshot\' ? data : data.data), this.library.xssRegexIgnore);',

    '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? "/api/v1/chart?chart=" : \'/api/monitor/chart/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/?chart=\')',
    '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/alarms?\' : \'/api/monitor/alarms/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/?\')',
    '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/alarm_log?after=\' : \'/api/monitor/alarm_log/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/?after=\')',

    '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/alarm_log\' : \'/api/monitor/alarm_log/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/\')',
    '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/alarms\' : \'/api/monitor/alarms/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/\')',
    '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/charts\' : \'/api/monitor/charts/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/\')',
    '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/chart\' : \'/api/monitor/chart/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/\')',
    '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? \'/api/v1/data\' : \'/api/monitor/data/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/\')',

    '(!NETDATA.connection || NETDATA.connection.type === \'netdata\' || NETDATA.connection.type === \'snapshot\' ? this.chart.data_url : this.chart.data_url.replace(\'api/v1/data\', \'api/monitor/data/\' + NETDATA.connection.uuid + \'/\' + NETDATA.connection.type + \'/\'))',

    '',
    '',

    '',
    '',
    '',

    'key = key + \'.\' + 1',
    'NETDATA.globalSelectionSync.timeoutId = undefined$1;'
  ],
};

/**
 * Netdata
 */
module.exports = replace(options).then(() => {
  return console.log('Netdata end');
})
.catch(error => {
  console.error('Error occurred:', error);
});
