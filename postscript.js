let fs = require('fs');

/**
 * mxGraph
 */
fs.readFile('dist/SysOS/filesystem/bin/libs/sysos-lib-ext-mxgraph.umd.js', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let result = '// Addeded with package.json postscript\n' +
    'mxBasePath = "assets/mxgraph";\n' +
    'mxLoadResources = true;\n' +
    'mxForceIncludes = false;\n' +
    'mxResourceExtension = ".txt";\n' +
    'mxLoadStylesheets = true;\n' +
    '\n' + data;

  result = result.replace(/\(\(.*\(window\)\)\)./g, '');

  fs.writeFile('dist/SysOS/filesystem/bin/libs/sysos-lib-ext-mxgraph.umd.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

/**
 * Drawer
 */
const util = require('util');

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

async function insertContent() {
  let Editor = await readFile('node_modules/mxgraph_dl/javascript/examples/grapheditor/www/js/Editor.js');
  let EditorUi = await readFile('node_modules/mxgraph_dl/javascript/examples/grapheditor/www/js/EditorUi.js');
  let Sidebar = await readFile('node_modules/mxgraph_dl/javascript/examples/grapheditor/www/js/Sidebar.js');
  let Graph = await readFile('node_modules/mxgraph_dl/javascript/examples/grapheditor/www/js/Graph.js');
  let Format = await readFile('node_modules/mxgraph_dl/javascript/examples/grapheditor/www/js/Format.js');
  let Shapes = await readFile('node_modules/mxgraph_dl/javascript/examples/grapheditor/www/js/Shapes.js');
  let Actions = await readFile('node_modules/mxgraph_dl/javascript/examples/grapheditor/www/js/Actions.js');
  let Menus = await readFile('node_modules/mxgraph_dl/javascript/examples/grapheditor/www/js/Menus.js');
  let Toolbar = await readFile('node_modules/mxgraph_dl/javascript/examples/grapheditor/www/js/Toolbar.js');
  let Dialogs = await readFile('node_modules/mxgraph_dl/javascript/examples/grapheditor/www/js/Dialogs.js');

  return Editor + EditorUi + Sidebar + Graph + Format + Shapes + Actions + Menus + Toolbar + Dialogs;
}

fs.readFile('dist/SysOS/filesystem/bin/applications/sysos-app-drawer.umd.js', 'utf8', async function (err, data) {
  if (err) {
    return console.log(err);
  }

  let result = '// Addeded with package.json postscript\n' +
    'var Editor;\n' +
    'var EditorUi\n' +
    'var Sidebar\n' +
    'var Graph\n' +
    'var Format\n' +
    'var Shapes\n' +
    'var Actions\n' +
    'var Menus\n' +
    'var Toolbar\n' +
    'var Dialogs\n' +
    'var mx;\n' +

    'var IMAGE_PATH = \'/img\';\n' +
    'var STENCIL_PATH = \'/stencils\';\n' +
    'var RESOURCE_BASE = \'assets/js/drawer/grapheditor\';\n' +
    'var STYLE_PATH = \'assets/js/drawer\';\n' +
    'var OPEN_URL = \'/open\';\n' +
    'var mxLanguage;\n' +
    'var OpenFile;\n' +
    'var HoverIcons;\n' +
    'var mxCellEditorGetInitialValue;\n' +
    'var mxCellEditorGetCurrentValue;\n' +
    'var BaseFormatPanel;\n' +
    'var ArrangePanel;\n' +
    'var TextFormatPanel;\n' +
    'var StyleFormatPanel;\n' +
    'var DiagramFormatPanel;\n' +
    'var urlParams = {};\n' +
    '\n' + data;


  let res = await insertContent();
  let initBlock = 'var editorUiInit = EditorUi.prototype.init;\n' +
    '\n' +
    '    EditorUi.prototype.init = function()\n' +
    '    {\n' +
    '      editorUiInit.apply(this, arguments);\n' +
    '      this.actions.get(\'export\').setEnabled(false);\n' +
    '\n' +
    '      // Updates action states which require a backend\n' +
    '      if (!Editor.useLocalStorage)\n' +
    '      {\n' +
    '        mxUtils.post(OPEN_URL, \'\', mxUtils.bind(this, function(req)\n' +
    '        {\n' +
    '          var enabled = req.getStatus() != 404;\n' +
    '          this.actions.get(\'open\').setEnabled(enabled || Graph.fileSupport);\n' +
    '          this.actions.get(\'import\').setEnabled(enabled || Graph.fileSupport);\n' +
    '          this.actions.get(\'save\').setEnabled(enabled);\n' +
    '          this.actions.get(\'saveAs\').setEnabled(enabled);\n' +
    '          this.actions.get(\'export\').setEnabled(enabled);\n' +
    '        }));\n' +
    '      }\n' +
    '    };\n' +
    '\n' +
    '    // Adds required resources (disables loading of fallback properties, this can only\n' +
    '    // be used if we know that all keys are defined in the language specific file)\n' +
    '    mxResources.loadDefaultBundle = false;\n' +
    '    var bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ||\n' +
    '      mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);\n' +
    '\n' +
    '    // Fixes possible asynchronous requests\n' +
    '    mxUtils.getAll([bundle, STYLE_PATH + \'/default.xml\'], function(xhr)\n' +
    '    {\n' +
    '      // Adds bundle text to resources\n' +
    '      mxResources.parse(xhr[0].getText());\n' +
    '\n' +
    '      // Configures the default graph theme\n' +
    '      var themes = new Object();\n' +
    '      themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();\n' +
    '\n' +
    '      // Main\n' +
    '      new EditorUi(new Editor(urlParams[\'chrome\'] == \'0\', themes), document.getElementById(\'graphContainer\'));\n' +
    '    }, function()\n' +
    '    {\n' +
    '      document.body.innerHTML = \'<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>\';\n' +
    '    });\n' +
    '}\n';

  result = result.replace('window&&(window.html=ha,window.html_sanitize=la);})();', 'window&&(window.html=ha,window.html_sanitize=la);})();\n' + res + initBlock);

  // Declare mxGraph
  result = result.replace('Editor = function(chromeless, themes, model, graph, editable)\n' +
    '{', 'var Load = function (mx) {\n' +
    '    mx = mx\n' +
    '    \n' +
    'Editor = function(chromeless, themes, model, graph, editable)\n' +
    '{');


  // Replace wrong var names (multiple times cos this regex only changes 1 match per line)
  result = result.replace(/([^.])(mxDefaultKeyHandler|mxDefaultPopupMenu|mxDefaultToolbar|mxEditor|mxCellHighlight|mxCellMarker|mxCellTracker|mxConnectionHandler|mxConstraintHandler|mxEdgeHandler|mxEdgeSegmentHandler.js|mxElbowEdgeHandler|mxGraphHandler|mxHandle|mxKeyHandler|mxPanningHandler|mxPopupMenuHandler|mxRubberband|mxSelectionCellsHandler|mxTooltipHandler|mxVertexHandler|mxCellCodec|mxChildChangeCodec|mxCodec|mxCodecRegistry|mxDefaultKeyHandlerCodec|mxDefaultPopupMenuCodec|mxDefaultToolbarCodec|mxEditorCodec|mxGenericChangeCodec|mxGraphCodec|mxGraphViewCodec|mxModelCodec|mxObjectCodec|mxRootChangeCodec|mxStylesheetCodec|mxTerminalChangeCodec|mxGraphAbstractHierarchyCell|mxGraphHierarchyEdge|mxGraphHierarchyModel|mxGraphHierarchyNode|mxSwimlaneModel|mxHierarchicalLayout|mxSwimlaneLayout|mxCoordinateAssignment|mxHierarchicalLayoutStage|mxMedianHybridCrossingReduction|mxMinimumCycleRemover|mxSwimlaneOrdering|mxCircleLayout|mxCompactTreeLayout|mxCompositeLayout|mxEdgeLabelLayout|mxFastOrganicLayout|mxGraphLayout|mxParallelEdgeLayout|mxPartitionLayout|mxRadialTreeLayout|mxStackLayout|mxCell|mxCellPath|mxGeometry|mxGraphModel|mxClient|mxActor|mxArrow|mxArrowConnector|mxCloud|mxConnector|mxCylinder|mxDoubleEllipse|mxEllipse|mxHexagon|mxImageShape|mxLabel|mxLine|mxMarker|mxPolyline|mxRectangleShape|mxRhombus|mxShape|mxStencil|mxStencilRegistry|mxSwimlane|mxText|mxTriangle|mxAbstractCanvas2D|mxAnimation|mxAutoSaveManager|mxClipboard|mxConstants|mxDictionary|mxDivResizer|mxDragSource|mxEffects|mxEvent|mxEventObject|mxEventSource|mxForm|mxGuide|mxImage|mxImageBundle|mxImageExport|mxLog|mxMorphing|mxMouseEvent|mxObjectIdentity|mxPanningManager|mxPoint|mxPopupMenu|mxRectangle|mxResources|mxSvgCanvas2D|mxToolbar|mxUndoableEdit|mxUndoManager|mxUrlConverter|mxUtils|mxVmlCanvas2D|mxWindow|mxXmlCanvas2D|mxXmlRequest|mxCellEditor|mxCellOverlay|mxCellRenderer|mxCellState|mxCellStatePreview|mxConnectionConstraint|mxEdgeStyle|mxGraph|mxGraphSelectionModel|mxGraphView|mxLayoutManager|mxMultiplicity|mxOutline|mxPerimeter|mxPrintPreview|mxStyleRegistry|mxStylesheet|mxSwimlaneManager|mxTemporaryCellStates)([^a-zA-Z])/g, '$1mx.$2$3');
  result = result.replace(/([^.])(mxDefaultKeyHandler|mxDefaultPopupMenu|mxDefaultToolbar|mxEditor|mxCellHighlight|mxCellMarker|mxCellTracker|mxConnectionHandler|mxConstraintHandler|mxEdgeHandler|mxEdgeSegmentHandler.js|mxElbowEdgeHandler|mxGraphHandler|mxHandle|mxKeyHandler|mxPanningHandler|mxPopupMenuHandler|mxRubberband|mxSelectionCellsHandler|mxTooltipHandler|mxVertexHandler|mxCellCodec|mxChildChangeCodec|mxCodec|mxCodecRegistry|mxDefaultKeyHandlerCodec|mxDefaultPopupMenuCodec|mxDefaultToolbarCodec|mxEditorCodec|mxGenericChangeCodec|mxGraphCodec|mxGraphViewCodec|mxModelCodec|mxObjectCodec|mxRootChangeCodec|mxStylesheetCodec|mxTerminalChangeCodec|mxGraphAbstractHierarchyCell|mxGraphHierarchyEdge|mxGraphHierarchyModel|mxGraphHierarchyNode|mxSwimlaneModel|mxHierarchicalLayout|mxSwimlaneLayout|mxCoordinateAssignment|mxHierarchicalLayoutStage|mxMedianHybridCrossingReduction|mxMinimumCycleRemover|mxSwimlaneOrdering|mxCircleLayout|mxCompactTreeLayout|mxCompositeLayout|mxEdgeLabelLayout|mxFastOrganicLayout|mxGraphLayout|mxParallelEdgeLayout|mxPartitionLayout|mxRadialTreeLayout|mxStackLayout|mxCell|mxCellPath|mxGeometry|mxGraphModel|mxClient|mxActor|mxArrow|mxArrowConnector|mxCloud|mxConnector|mxCylinder|mxDoubleEllipse|mxEllipse|mxHexagon|mxImageShape|mxLabel|mxLine|mxMarker|mxPolyline|mxRectangleShape|mxRhombus|mxShape|mxStencil|mxStencilRegistry|mxSwimlane|mxText|mxTriangle|mxAbstractCanvas2D|mxAnimation|mxAutoSaveManager|mxClipboard|mxConstants|mxDictionary|mxDivResizer|mxDragSource|mxEffects|mxEvent|mxEventObject|mxEventSource|mxForm|mxGuide|mxImage|mxImageBundle|mxImageExport|mxLog|mxMorphing|mxMouseEvent|mxObjectIdentity|mxPanningManager|mxPoint|mxPopupMenu|mxRectangle|mxResources|mxSvgCanvas2D|mxToolbar|mxUndoableEdit|mxUndoManager|mxUrlConverter|mxUtils|mxVmlCanvas2D|mxWindow|mxXmlCanvas2D|mxXmlRequest|mxCellEditor|mxCellOverlay|mxCellRenderer|mxCellState|mxCellStatePreview|mxConnectionConstraint|mxEdgeStyle|mxGraph|mxGraphSelectionModel|mxGraphView|mxLayoutManager|mxMultiplicity|mxOutline|mxPerimeter|mxPrintPreview|mxStyleRegistry|mxStylesheet|mxSwimlaneManager|mxTemporaryCellStates)([^a-zA-Z])/g, '$1mx.$2$3');
  result = result.replace(/([^.])(mxDefaultKeyHandler|mxDefaultPopupMenu|mxDefaultToolbar|mxEditor|mxCellHighlight|mxCellMarker|mxCellTracker|mxConnectionHandler|mxConstraintHandler|mxEdgeHandler|mxEdgeSegmentHandler.js|mxElbowEdgeHandler|mxGraphHandler|mxHandle|mxKeyHandler|mxPanningHandler|mxPopupMenuHandler|mxRubberband|mxSelectionCellsHandler|mxTooltipHandler|mxVertexHandler|mxCellCodec|mxChildChangeCodec|mxCodec|mxCodecRegistry|mxDefaultKeyHandlerCodec|mxDefaultPopupMenuCodec|mxDefaultToolbarCodec|mxEditorCodec|mxGenericChangeCodec|mxGraphCodec|mxGraphViewCodec|mxModelCodec|mxObjectCodec|mxRootChangeCodec|mxStylesheetCodec|mxTerminalChangeCodec|mxGraphAbstractHierarchyCell|mxGraphHierarchyEdge|mxGraphHierarchyModel|mxGraphHierarchyNode|mxSwimlaneModel|mxHierarchicalLayout|mxSwimlaneLayout|mxCoordinateAssignment|mxHierarchicalLayoutStage|mxMedianHybridCrossingReduction|mxMinimumCycleRemover|mxSwimlaneOrdering|mxCircleLayout|mxCompactTreeLayout|mxCompositeLayout|mxEdgeLabelLayout|mxFastOrganicLayout|mxGraphLayout|mxParallelEdgeLayout|mxPartitionLayout|mxRadialTreeLayout|mxStackLayout|mxCell|mxCellPath|mxGeometry|mxGraphModel|mxClient|mxActor|mxArrow|mxArrowConnector|mxCloud|mxConnector|mxCylinder|mxDoubleEllipse|mxEllipse|mxHexagon|mxImageShape|mxLabel|mxLine|mxMarker|mxPolyline|mxRectangleShape|mxRhombus|mxShape|mxStencil|mxStencilRegistry|mxSwimlane|mxText|mxTriangle|mxAbstractCanvas2D|mxAnimation|mxAutoSaveManager|mxClipboard|mxConstants|mxDictionary|mxDivResizer|mxDragSource|mxEffects|mxEvent|mxEventObject|mxEventSource|mxForm|mxGuide|mxImage|mxImageBundle|mxImageExport|mxLog|mxMorphing|mxMouseEvent|mxObjectIdentity|mxPanningManager|mxPoint|mxPopupMenu|mxRectangle|mxResources|mxSvgCanvas2D|mxToolbar|mxUndoableEdit|mxUndoManager|mxUrlConverter|mxUtils|mxVmlCanvas2D|mxWindow|mxXmlCanvas2D|mxXmlRequest|mxCellEditor|mxCellOverlay|mxCellRenderer|mxCellState|mxCellStatePreview|mxConnectionConstraint|mxEdgeStyle|mxGraph|mxGraphSelectionModel|mxGraphView|mxLayoutManager|mxMultiplicity|mxOutline|mxPerimeter|mxPrintPreview|mxStyleRegistry|mxStylesheet|mxSwimlaneManager|mxTemporaryCellStates)([^a-zA-Z])/g, '$1mx.$2$3');
  result = result.replace(/([^.])(mxDefaultKeyHandler|mxDefaultPopupMenu|mxDefaultToolbar|mxEditor|mxCellHighlight|mxCellMarker|mxCellTracker|mxConnectionHandler|mxConstraintHandler|mxEdgeHandler|mxEdgeSegmentHandler.js|mxElbowEdgeHandler|mxGraphHandler|mxHandle|mxKeyHandler|mxPanningHandler|mxPopupMenuHandler|mxRubberband|mxSelectionCellsHandler|mxTooltipHandler|mxVertexHandler|mxCellCodec|mxChildChangeCodec|mxCodec|mxCodecRegistry|mxDefaultKeyHandlerCodec|mxDefaultPopupMenuCodec|mxDefaultToolbarCodec|mxEditorCodec|mxGenericChangeCodec|mxGraphCodec|mxGraphViewCodec|mxModelCodec|mxObjectCodec|mxRootChangeCodec|mxStylesheetCodec|mxTerminalChangeCodec|mxGraphAbstractHierarchyCell|mxGraphHierarchyEdge|mxGraphHierarchyModel|mxGraphHierarchyNode|mxSwimlaneModel|mxHierarchicalLayout|mxSwimlaneLayout|mxCoordinateAssignment|mxHierarchicalLayoutStage|mxMedianHybridCrossingReduction|mxMinimumCycleRemover|mxSwimlaneOrdering|mxCircleLayout|mxCompactTreeLayout|mxCompositeLayout|mxEdgeLabelLayout|mxFastOrganicLayout|mxGraphLayout|mxParallelEdgeLayout|mxPartitionLayout|mxRadialTreeLayout|mxStackLayout|mxCell|mxCellPath|mxGeometry|mxGraphModel|mxClient|mxActor|mxArrow|mxArrowConnector|mxCloud|mxConnector|mxCylinder|mxDoubleEllipse|mxEllipse|mxHexagon|mxImageShape|mxLabel|mxLine|mxMarker|mxPolyline|mxRectangleShape|mxRhombus|mxShape|mxStencil|mxStencilRegistry|mxSwimlane|mxText|mxTriangle|mxAbstractCanvas2D|mxAnimation|mxAutoSaveManager|mxClipboard|mxConstants|mxDictionary|mxDivResizer|mxDragSource|mxEffects|mxEvent|mxEventObject|mxEventSource|mxForm|mxGuide|mxImage|mxImageBundle|mxImageExport|mxLog|mxMorphing|mxMouseEvent|mxObjectIdentity|mxPanningManager|mxPoint|mxPopupMenu|mxRectangle|mxResources|mxSvgCanvas2D|mxToolbar|mxUndoableEdit|mxUndoManager|mxUrlConverter|mxUtils|mxVmlCanvas2D|mxWindow|mxXmlCanvas2D|mxXmlRequest|mxCellEditor|mxCellOverlay|mxCellRenderer|mxCellState|mxCellStatePreview|mxConnectionConstraint|mxEdgeStyle|mxGraph|mxGraphSelectionModel|mxGraphView|mxLayoutManager|mxMultiplicity|mxOutline|mxPerimeter|mxPrintPreview|mxStyleRegistry|mxStylesheet|mxSwimlaneManager|mxTemporaryCellStates)([^a-zA-Z])/g, '$1mx.$2$3');
  result = result.replace('mxValueChange', 'mx.mxValueChange');

  result = result.replace('if (window.Sidebar != null)', 'if (Sidebar != null)');
  result = result.replace('img == this.refreshTarget)', 'img == Sidebar.prototype.refreshTarget)');

  fs.writeFile('dist/SysOS/filesystem/bin/applications/sysos-app-drawer.umd.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

/**
 * Monitor
 */
fs.readFile('dist/SysOS/filesystem/bin/applications/sysos-app-monitor.umd.js', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let result = '// Addeded with package.json postscript\n' +
    'let netdataSnapshotData;\n' +
    'let netdataShowHelp;\n' +
    'let netdataShowAlarms;\n' +
    'let netdataRegistryAfterMs;\n' +
    'let netdataRegistry;\n' +
    '\n' + data;


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
  result = result.replace('(function(window, document, $, undefined$1) {', 'var Dashboard = function(connection, $, Dygraph, Gauge, Ps, undefined$1) {');
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


  result = result.replace('key = key + \'.\' + _this.dataStore.netdataDashboard.sparklines_registry[key].count;', 'key = key + \'.\' + 1');

  result = result.replace(/this.timeoutId = undefined\$1;/g, 'NETDATA.globalSelectionSync.timeoutId = undefined$1;');

  //result = result.replace(/= \(\) =>/g, '= function()');

  fs.writeFile('dist/SysOS/filesystem/bin/applications/sysos-app-monitor.umd.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
