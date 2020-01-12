let fs = require('fs-extra');
const util = require('util');

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

console.log('Running mxgraph.js');

/**
 * mxGraph
 */
module.exports = fs.readFile('dist/external-libraries/mxgraph/bundles/anyopsos-ext-lib-mxgraph.umd.js', 'utf8').then(async function (data) {
  let mxClient = await readFile('node_modules/mxgraph/javascript/mxClient.js');

  let result = data;

  result = result.replace('\'use strict\';\n', '\'use strict\';\n' + '// Addeded with package.json postscript\n' +
    'let mx;\n' +
    'let mxGraphInitialized = false;\n' +
    'var mxgraphWrapper = function () {\n' +
    '// return object if mxgraph is already initialized\n' +
    'if (mxGraphInitialized) return mx;\n' +
    'mxGraphInitialized = true\n' +
    '\n' +
    'var mxBasePath = "/api/file/etc/applications/drawer";\n' +
    'var mxLoadResources = false;\n' +
    'var mxForceIncludes = false;\n' +
    'var mxResourceExtension = ".txt";\n' +
    'var mxLoadStylesheets = true;\n' +
    'var mxLanguage = mxLanguage || \'en\';\n' +
    'var mxLanguages = mxLanguages || [\'de\'];\n' +
    '// urlParams is null when used for embedding\n' +
    '    //window.urlParams = window.urlParams || {};\n' +
    '\n' +
    '    // Public global variables\n' +
    '    //window.MAX_REQUEST_SIZE = window.MAX_REQUEST_SIZE  || 10485760;\n' +
    '    //window.MAX_AREA = window.MAX_AREA || 15000 * 15000;\n' +
    '\n' +
    '    // URLs for save and export\n' +
    '    //window.EXPORT_URL = window.EXPORT_URL || \'/export\';\n' +
    '    //window.SAVE_URL = window.SAVE_URL || \'/save\';\n' +
    '    //window.OPEN_URL = window.OPEN_URL || \'/open\';\n' +
    '    //window.RESOURCES_PATH = window.RESOURCES_PATH || \'assets/js/drawer\';\n' +
    '    //window.RESOURCE_BASE = window.RESOURCE_BASE || window.RESOURCES_PATH + \'/grapheditor\';\n' +
    '    //window.STENCIL_PATH = window.STENCIL_PATH || \'stencils\';\n' +
    '    //window.IMAGE_PATH = window.IMAGE_PATH || \'images\';\n' +
    '    //window.STYLE_PATH = window.STYLE_PATH || \'styles\';\n' +
    '    //window.CSS_PATH = window.CSS_PATH || \'styles\';\n' +
    '    //window.OPEN_FORM = window.OPEN_FORM || \'open.html\';\n' +
    'var minY;\n' +
    'var maxY;\n' +
    'var minX;\n' +
    'var maxX;\n' +
    'var td;\n' +
    'var pt;\n' +
    '\n' + mxClient);

  result = result.replace(/\(\(.*\(window\)\)\)./g, '');

  result = result.replace('ctor = window[node.nodeName];', 'ctor = node.nodeName;');

  result = result.replace(/(var mx = {(.+?(?=};))};)/s, '$1};');

  result = result.replace('var mx = {', 'return mx = {');

  return fs.writeFile('dist/external-libraries/mxgraph/bundles/anyopsos-ext-lib-mxgraph.umd.js', result, 'utf8').then(function () {
    console.log("Mxgraph end");
  });
});
