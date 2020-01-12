let fs = require('fs-extra');
const util = require('util');

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

console.log('Running drawer.js');

/*
https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/PreConfig.js
mxscript(drawDevUrl + 'js/PreConfig.js');

https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/diagramly/Init.js
mxscript(drawDevUrl + 'js/diagramly/Init.js');

https://github.com/jgraph/mxgraph/blob/master/javascript/examples/grapheditor/www/js/Init.js
mxscript(geBasePath + '/Init.js');

// https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/mxClient.js
mxscript(mxDevUrl + '/javascript/src/js/mxClient.js');

// Adds all JS code that depends on mxClient. This indirection via Devel.js is
// required in some browsers to make sure mxClient.js (and the files that it
// loads asynchronously) are available when the code loaded in Devel.js runs.

// https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/diagramly/Devel.js
mxscript(drawDevUrl + 'js/diagramly/Devel.js');

// https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/PostConfig.js
mxscript(drawDevUrl + 'js/PostConfig.js');

*/



/**
 * Drawer
 */
async function insertContent() {
  const externalLibraries = [
    'node_modules/draw.io/src/main/webapp/js/cryptojs/aes.min.js',
    //'node_modules/draw.io/src/main/webapp/js/spin/spin.min.js',
    //'node_modules/draw.io/src/main/webapp/js/deflate/pako.min.js',
    'node_modules/draw.io/src/main/webapp/js/deflate/base64.js',
    'node_modules/draw.io/src/main/webapp/js/jscolor/jscolor.js',
    'node_modules/draw.io/src/main/webapp/js/sanitizer/sanitizer.min.js'
  ];
  const externalLibrariesCode = await Promise.all(externalLibraries.map(async (library) => await readFile(library)));

  const grapheditorFiles = [
    'node_modules/draw.io/src/main/webapp/js/mxgraph/Editor.js',
    'node_modules/draw.io/src/main/webapp/js/mxgraph/EditorUi.js',
    'node_modules/draw.io/src/main/webapp/js/mxgraph/Sidebar.js',
    'node_modules/draw.io/src/main/webapp/js/mxgraph/Graph.js',
    'node_modules/draw.io/src/main/webapp/js/mxgraph/Format.js',
    'node_modules/draw.io/src/main/webapp/js/mxgraph/Shapes.js',
    'node_modules/draw.io/src/main/webapp/js/mxgraph/Actions.js',
    'node_modules/draw.io/src/main/webapp/js/mxgraph/Menus.js',
    'node_modules/draw.io/src/main/webapp/js/mxgraph/Toolbar.js',
    'node_modules/draw.io/src/main/webapp/js/mxgraph/Dialogs.js'
  ];
  const grapheditorCode = await Promise.all(grapheditorFiles.map(async (library) => await readFile(library)));

  const mainClassesFiles = [
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-ActiveDirectory.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Advanced.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-AlliedTelesis.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Android.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-ArchiMate.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-ArchiMate3.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Arrows2.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Atlassian.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-AWS.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-AWS3.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-AWS3D.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-AWS4.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-AWS4b.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Azure.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Basic.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Bootstrap.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-BPMN.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-C4.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Cabinet.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Cisco19.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-CiscoSafe.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Citrix.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Cumulus.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-DFD.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-EIP.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Electrical.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-ER.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Floorplan.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Flowchart.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-GCP.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-GCP2.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Gmdl.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-IBM.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Infographic.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Ios.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Ios7.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Kubernetes.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-LeanMapping.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Mockup.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-MSCAE.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Network.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Office.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-PID.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Rack.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Sitemap.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Sysml.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-Veeam.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-VVD.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/sidebar/Sidebar-WebIcons.js',

    'node_modules/draw.io/src/main/webapp/js/diagramly/util/mxJsCanvas.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/util/mxAsyncCanvas.js',

    'node_modules/draw.io/src/main/webapp/js/diagramly/DrawioFile.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/LocalFile.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/LocalLibrary.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/StorageFile.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/StorageLibrary.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/RemoteFile.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/RemoteLibrary.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/Dialogs.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/Editor.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/EditorUi.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/DiffSync.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/Settings.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/DrawioFileSync.js',

    //Comments
    'node_modules/draw.io/src/main/webapp/js/diagramly/DrawioComment.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/DriveComment.js',

    'node_modules/draw.io/src/main/webapp/js/diagramly/DrawioClient.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/DrawioUser.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/UrlLibrary.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/DriveFile.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/DriveLibrary.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/DriveClient.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/DropboxFile.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/DropboxLibrary.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/DropboxClient.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/GitHubFile.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/GitHubLibrary.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/GitHubClient.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/OneDriveFile.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/OneDriveLibrary.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/OneDriveClient.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/TrelloFile.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/TrelloLibrary.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/TrelloClient.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/GitLabFile.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/GitLabLibrary.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/GitLabClient.js',

    'node_modules/draw.io/src/main/webapp/js/diagramly/App.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/Menus.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/Pages.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/Trees.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/Minimal.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/DistanceGuides.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/mxRuler.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/mxFreehand.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/DevTools.js',

    // Vsdx/vssx support
    'node_modules/draw.io/src/main/webapp/js/diagramly/vsdx/VsdxExport.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/vsdx/mxVsdxCanvas2D.js',
    'node_modules/draw.io/src/main/webapp/js/diagramly/vsdx/bmpDecoder.js',
    'node_modules/draw.io/src/main/webapp/js/jszip/jszip.min.js',

    //GraphMl Import
    'node_modules/draw.io/src/main/webapp/js/diagramly/graphml/mxGraphMlCodec.js'
  ];
  const mainClassesCode = await Promise.all(mainClassesFiles.map(async (library) => await readFile(library)));

  const shapesFiles = [
    'node_modules/draw.io/src/main/webapp/shapes/mxAndroid.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxArchiMate.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxArchiMate3.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxArrows.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxAtlassian.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxAWS3D.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxAWS4.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxBasic.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxBootstrap.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxC4.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxCabinets.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxCisco19.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxDFD.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxEip.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxElectrical.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxFloorplan.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxFlowchart.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxGCP2.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxGmdl.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxInfographic.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxKubernetes.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxLeanMap.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxNetworks.js',
    'node_modules/draw.io/src/main/webapp/shapes/mxSysML.js',

    'node_modules/draw.io/src/main/webapp/shapes/bpmn/mxBpmnShape2.js',

    'node_modules/draw.io/src/main/webapp/shapes/er/mxER.js',

    'node_modules/draw.io/src/main/webapp/shapes/ios7/mxIOS7Ui.js',

    'node_modules/draw.io/src/main/webapp/shapes/mockup/mxMockupButtons.js',
    'node_modules/draw.io/src/main/webapp/shapes/mockup/mxMockupContainers.js',
    'node_modules/draw.io/src/main/webapp/shapes/mockup/mxMockupForms.js',
    'node_modules/draw.io/src/main/webapp/shapes/mockup/mxMockupGraphics.js',
    //'node_modules/draw.io/src/main/webapp/shapes/mockup/mxMockupiOS.js',
    'node_modules/draw.io/src/main/webapp/shapes/mockup/mxMockupMarkup.js',
    'node_modules/draw.io/src/main/webapp/shapes/mockup/mxMockupMisc.js',
    'node_modules/draw.io/src/main/webapp/shapes/mockup/mxMockupNavigation.js',
    'node_modules/draw.io/src/main/webapp/shapes/mockup/mxMockupText.js',

    'node_modules/draw.io/src/main/webapp/shapes/pid2/mxPidInstruments.js',
    'node_modules/draw.io/src/main/webapp/shapes/pid2/mxPidMisc.js',
    'node_modules/draw.io/src/main/webapp/shapes/pid2/mxPidValves.js',

    'node_modules/draw.io/src/main/webapp/shapes/rack/mxRack.js'
  ];
  const shapesCode = await Promise.all(shapesFiles.map(async (library) => await readFile(library)));

  return externalLibrariesCode.join('\n') + grapheditorCode.join('') + mainClassesCode.join('') + shapesCode.join('');
}

module.exports = fs.readFile('dist/applications/drawer/bundles/anyopsos-app-drawer.umd.js', 'utf8').then(async function (data) {
  let result = data;
  let res = await insertContent();

  let initBlock = 'App.main();\n}\n';

  result = result.replace('}(this, (function (exports, core, common, libApplication, extLibMxgraph, extLibPako, extLibSpinJs) { ', '}(this, (function (exports, core, common, libApplication, extLibMxgraph, extLibPako, extLibSpinJs) { \n' + '// postscript\n' +
    'var Editor;\n' +
    'var EditorUi;\n' +
    'var Sidebar;\n' +
    'var Graph;\n' +
    'var Format;\n' +
    'var Shapes;\n' +
    'var Actions;\n' +
    'var Menus;\n' +
    'var Toolbar;\n' +
    'var Dialogs;\n' +
    'var App;\n' +
    'var mx;\n' +

    'var IMAGE_PATH = \'/api/file/etc/applications/drawer/images\';\n' +
    'var STENCIL_PATH = \'/api/file/etc/applications/drawer/stencils\';\n' +
    'var RESOURCE_BASE = \'/api/file/etc/applications/drawer/resources/dia\';\n' +
    'var STYLE_PATH = \'assets/js/drawer\';\n' +
    'var SHAPES_PATH = \'/api/file/etc/applications/drawer/shapes\';\n' +
    'var TEMPLATE_PATH = \'/api/file/etc/applications/drawer/templates\';\n' +
    'var DRAW_MATH_URL = \'\';\n' +
    'var GRAPH_IMAGE_PATH = \'img\';\n' +
    'var OPEN_URL = \'/open\';\n' +
    'var DRAWIO_GITLAB_ID = \'\';\n' +
    'var DRAWIO_GITLAB_URL = \'\';\n' +

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
    'var DrawioComment;\n' +
    'var DriveComment;\n' +
    'var DrawioFile;\n' +
    'var LocalFile;\n' +
    'var LocalLibrary;\n' +
    'var StorageFile;\n' +
    'var StorageLibrary;\n' +
    'var RemoteFile;\n' +
    'var RemoteLibrary;\n' +
    'var uiTheme;\n' +
    'var isLocalStorage;\n' +
    'var DrawioFileSync;\n' +
    'var DrawioClient;\n' +
    'var DrawioUser;\n' +
    'var UrlLibrary;\n' +
    'var DriveFile;\n' +
    'var DriveLibrary;\n' +
    'var DriveClient;\n' +
    'var DropboxFile;\n' +
    'var DropboxLibrary;\n' +
    'var DropboxClient;\n' +
    'var GitHubFile;\n' +
    'var GitHubLibrary;\n' +
    'var GitHubClient;\n' +
    'var OneDriveFile;\n' +
    'var OneDriveLibrary;\n' +
    'var OneDriveClient;\n' +
    'var TrelloFile;\n' +
    'var TrelloLibrary;\n' +
    'var TrelloClient;\n' +
    'var GitLabFile;\n' +
    'var GitLabLibrary;\n' +
    'var GitLabClient;\n' +
    'var sb;\n' +
    'var clip;\n' +
    'var urlParams = {};\n' +
    '\n'
  + '\n\nvar Load = function (fmx, pako, Spinner) {\n' +
    '    mx = fmx;\n' +
    '    mx.mxClient.IS_CHROMEAPP = true;\n' + res + initBlock);

  // Replace wrong var names (multiple times cos this regex only changes 1 match per line)
  result = result.replace(/([^.'<;/])(mxDefaultKeyHandler|mxDefaultPopupMenu|mxDefaultToolbar|mxEditor|mxCellHighlight|mxCellMarker|mxCellTracker|mxConnectionHandler|mxConstraintHandler|mxEdgeHandler|mxEdgeSegmentHandler.js|mxElbowEdgeHandler|mxGraphHandler|mxHandle|mxKeyHandler|mxPanningHandler|mxPopupMenuHandler|mxRubberband|mxSelectionCellsHandler|mxTooltipHandler|mxVertexHandler|mxCellCodec|mxChildChangeCodec|mxCodec|mxCodecRegistry|mxDefaultKeyHandlerCodec|mxDefaultPopupMenuCodec|mxDefaultToolbarCodec|mxEditorCodec|mxGenericChangeCodec|mxGraphCodec|mxGraphViewCodec|mxModelCodec|mxObjectCodec|mxRootChangeCodec|mxStylesheetCodec|mxTerminalChangeCodec|mxGraphAbstractHierarchyCell|mxGraphHierarchyEdge|mxGraphHierarchyModel|mxGraphHierarchyNode|mxSwimlaneModel|mxHierarchicalLayout|mxSwimlaneLayout|mxCoordinateAssignment|mxHierarchicalLayoutStage|mxMedianHybridCrossingReduction|mxMinimumCycleRemover|mxSwimlaneOrdering|mxCircleLayout|mxCompactTreeLayout|mxCompositeLayout|mxEdgeLabelLayout|mxFastOrganicLayout|mxGraphLayout|mxParallelEdgeLayout|mxPartitionLayout|mxRadialTreeLayout|mxStackLayout|mxCell|mxCellPath|mxGeometry|mxGraphModel|mxClient|mxActor|mxArrow|mxArrowConnector|mxCloud|mxConnector|mxCylinder|mxDoubleEllipse|mxEllipse|mxHexagon|mxImageShape|mxLabel|mxLine|mxMarker|mxPolyline|mxRectangleShape|mxRhombus|mxShape|mxStencil|mxStencilRegistry|mxSwimlane|mxText|mxTriangle|mxAbstractCanvas2D|mxAnimation|mxAutoSaveManager|mxClipboard|mxConstants|mxDictionary|mxDivResizer|mxDragSource|mxEffects|mxEvent|mxEventObject|mxEventSource|mxForm|mxGuide|mxImage|mxImageBundle|mxImageExport|mxLog|mxMorphing|mxMouseEvent|mxObjectIdentity|mxPanningManager|mxPoint|mxPopupMenu|mxRectangle|mxResources|mxSvgCanvas2D|mxToolbar|mxUndoableEdit|mxUndoManager|mxUrlConverter|mxUtils|mxVmlCanvas2D|mxWindow|mxXmlCanvas2D|mxXmlRequest|mxCellEditor|mxCellOverlay|mxCellRenderer|mxCellState|mxCellStatePreview|mxConnectionConstraint|mxEdgeStyle|mxGraph|mxGraphSelectionModel|mxGraphView|mxLayoutManager|mxMultiplicity|mxOutline|mxPerimeter|mxPrintPreview|mxStyleRegistry|mxStylesheet|mxSwimlaneManager|mxTemporaryCellStates|mxRootChange|mxChildChange)([^a-zA-Z])/g, '$1mx.$2$3');
  result = result.replace(/([^.'<;/])(mxDefaultKeyHandler|mxDefaultPopupMenu|mxDefaultToolbar|mxEditor|mxCellHighlight|mxCellMarker|mxCellTracker|mxConnectionHandler|mxConstraintHandler|mxEdgeHandler|mxEdgeSegmentHandler.js|mxElbowEdgeHandler|mxGraphHandler|mxHandle|mxKeyHandler|mxPanningHandler|mxPopupMenuHandler|mxRubberband|mxSelectionCellsHandler|mxTooltipHandler|mxVertexHandler|mxCellCodec|mxChildChangeCodec|mxCodec|mxCodecRegistry|mxDefaultKeyHandlerCodec|mxDefaultPopupMenuCodec|mxDefaultToolbarCodec|mxEditorCodec|mxGenericChangeCodec|mxGraphCodec|mxGraphViewCodec|mxModelCodec|mxObjectCodec|mxRootChangeCodec|mxStylesheetCodec|mxTerminalChangeCodec|mxGraphAbstractHierarchyCell|mxGraphHierarchyEdge|mxGraphHierarchyModel|mxGraphHierarchyNode|mxSwimlaneModel|mxHierarchicalLayout|mxSwimlaneLayout|mxCoordinateAssignment|mxHierarchicalLayoutStage|mxMedianHybridCrossingReduction|mxMinimumCycleRemover|mxSwimlaneOrdering|mxCircleLayout|mxCompactTreeLayout|mxCompositeLayout|mxEdgeLabelLayout|mxFastOrganicLayout|mxGraphLayout|mxParallelEdgeLayout|mxPartitionLayout|mxRadialTreeLayout|mxStackLayout|mxCell|mxCellPath|mxGeometry|mxGraphModel|mxClient|mxActor|mxArrow|mxArrowConnector|mxCloud|mxConnector|mxCylinder|mxDoubleEllipse|mxEllipse|mxHexagon|mxImageShape|mxLabel|mxLine|mxMarker|mxPolyline|mxRectangleShape|mxRhombus|mxShape|mxStencil|mxStencilRegistry|mxSwimlane|mxText|mxTriangle|mxAbstractCanvas2D|mxAnimation|mxAutoSaveManager|mxClipboard|mxConstants|mxDictionary|mxDivResizer|mxDragSource|mxEffects|mxEvent|mxEventObject|mxEventSource|mxForm|mxGuide|mxImage|mxImageBundle|mxImageExport|mxLog|mxMorphing|mxMouseEvent|mxObjectIdentity|mxPanningManager|mxPoint|mxPopupMenu|mxRectangle|mxResources|mxSvgCanvas2D|mxToolbar|mxUndoableEdit|mxUndoManager|mxUrlConverter|mxUtils|mxVmlCanvas2D|mxWindow|mxXmlCanvas2D|mxXmlRequest|mxCellEditor|mxCellOverlay|mxCellRenderer|mxCellState|mxCellStatePreview|mxConnectionConstraint|mxEdgeStyle|mxGraph|mxGraphSelectionModel|mxGraphView|mxLayoutManager|mxMultiplicity|mxOutline|mxPerimeter|mxPrintPreview|mxStyleRegistry|mxStylesheet|mxSwimlaneManager|mxTemporaryCellStates|mxRootChange|mxChildChange)([^a-zA-Z])/g, '$1mx.$2$3');
  result = result.replace(/([^.'<;/])(mxDefaultKeyHandler|mxDefaultPopupMenu|mxDefaultToolbar|mxEditor|mxCellHighlight|mxCellMarker|mxCellTracker|mxConnectionHandler|mxConstraintHandler|mxEdgeHandler|mxEdgeSegmentHandler.js|mxElbowEdgeHandler|mxGraphHandler|mxHandle|mxKeyHandler|mxPanningHandler|mxPopupMenuHandler|mxRubberband|mxSelectionCellsHandler|mxTooltipHandler|mxVertexHandler|mxCellCodec|mxChildChangeCodec|mxCodec|mxCodecRegistry|mxDefaultKeyHandlerCodec|mxDefaultPopupMenuCodec|mxDefaultToolbarCodec|mxEditorCodec|mxGenericChangeCodec|mxGraphCodec|mxGraphViewCodec|mxModelCodec|mxObjectCodec|mxRootChangeCodec|mxStylesheetCodec|mxTerminalChangeCodec|mxGraphAbstractHierarchyCell|mxGraphHierarchyEdge|mxGraphHierarchyModel|mxGraphHierarchyNode|mxSwimlaneModel|mxHierarchicalLayout|mxSwimlaneLayout|mxCoordinateAssignment|mxHierarchicalLayoutStage|mxMedianHybridCrossingReduction|mxMinimumCycleRemover|mxSwimlaneOrdering|mxCircleLayout|mxCompactTreeLayout|mxCompositeLayout|mxEdgeLabelLayout|mxFastOrganicLayout|mxGraphLayout|mxParallelEdgeLayout|mxPartitionLayout|mxRadialTreeLayout|mxStackLayout|mxCell|mxCellPath|mxGeometry|mxGraphModel|mxClient|mxActor|mxArrow|mxArrowConnector|mxCloud|mxConnector|mxCylinder|mxDoubleEllipse|mxEllipse|mxHexagon|mxImageShape|mxLabel|mxLine|mxMarker|mxPolyline|mxRectangleShape|mxRhombus|mxShape|mxStencil|mxStencilRegistry|mxSwimlane|mxText|mxTriangle|mxAbstractCanvas2D|mxAnimation|mxAutoSaveManager|mxClipboard|mxConstants|mxDictionary|mxDivResizer|mxDragSource|mxEffects|mxEvent|mxEventObject|mxEventSource|mxForm|mxGuide|mxImage|mxImageBundle|mxImageExport|mxLog|mxMorphing|mxMouseEvent|mxObjectIdentity|mxPanningManager|mxPoint|mxPopupMenu|mxRectangle|mxResources|mxSvgCanvas2D|mxToolbar|mxUndoableEdit|mxUndoManager|mxUrlConverter|mxUtils|mxVmlCanvas2D|mxWindow|mxXmlCanvas2D|mxXmlRequest|mxCellEditor|mxCellOverlay|mxCellRenderer|mxCellState|mxCellStatePreview|mxConnectionConstraint|mxEdgeStyle|mxGraph|mxGraphSelectionModel|mxGraphView|mxLayoutManager|mxMultiplicity|mxOutline|mxPerimeter|mxPrintPreview|mxStyleRegistry|mxStylesheet|mxSwimlaneManager|mxTemporaryCellStates|mxRootChange|mxChildChange)([^a-zA-Z])/g, '$1mx.$2$3');
  result = result.replace(/([^.'<;/])(mxDefaultKeyHandler|mxDefaultPopupMenu|mxDefaultToolbar|mxEditor|mxCellHighlight|mxCellMarker|mxCellTracker|mxConnectionHandler|mxConstraintHandler|mxEdgeHandler|mxEdgeSegmentHandler.js|mxElbowEdgeHandler|mxGraphHandler|mxHandle|mxKeyHandler|mxPanningHandler|mxPopupMenuHandler|mxRubberband|mxSelectionCellsHandler|mxTooltipHandler|mxVertexHandler|mxCellCodec|mxChildChangeCodec|mxCodec|mxCodecRegistry|mxDefaultKeyHandlerCodec|mxDefaultPopupMenuCodec|mxDefaultToolbarCodec|mxEditorCodec|mxGenericChangeCodec|mxGraphCodec|mxGraphViewCodec|mxModelCodec|mxObjectCodec|mxRootChangeCodec|mxStylesheetCodec|mxTerminalChangeCodec|mxGraphAbstractHierarchyCell|mxGraphHierarchyEdge|mxGraphHierarchyModel|mxGraphHierarchyNode|mxSwimlaneModel|mxHierarchicalLayout|mxSwimlaneLayout|mxCoordinateAssignment|mxHierarchicalLayoutStage|mxMedianHybridCrossingReduction|mxMinimumCycleRemover|mxSwimlaneOrdering|mxCircleLayout|mxCompactTreeLayout|mxCompositeLayout|mxEdgeLabelLayout|mxFastOrganicLayout|mxGraphLayout|mxParallelEdgeLayout|mxPartitionLayout|mxRadialTreeLayout|mxStackLayout|mxCell|mxCellPath|mxGeometry|mxGraphModel|mxClient|mxActor|mxArrow|mxArrowConnector|mxCloud|mxConnector|mxCylinder|mxDoubleEllipse|mxEllipse|mxHexagon|mxImageShape|mxLabel|mxLine|mxMarker|mxPolyline|mxRectangleShape|mxRhombus|mxShape|mxStencil|mxStencilRegistry|mxSwimlane|mxText|mxTriangle|mxAbstractCanvas2D|mxAnimation|mxAutoSaveManager|mxClipboard|mxConstants|mxDictionary|mxDivResizer|mxDragSource|mxEffects|mxEvent|mxEventObject|mxEventSource|mxForm|mxGuide|mxImage|mxImageBundle|mxImageExport|mxLog|mxMorphing|mxMouseEvent|mxObjectIdentity|mxPanningManager|mxPoint|mxPopupMenu|mxRectangle|mxResources|mxSvgCanvas2D|mxToolbar|mxUndoableEdit|mxUndoManager|mxUrlConverter|mxUtils|mxVmlCanvas2D|mxWindow|mxXmlCanvas2D|mxXmlRequest|mxCellEditor|mxCellOverlay|mxCellRenderer|mxCellState|mxCellStatePreview|mxConnectionConstraint|mxEdgeStyle|mxGraph|mxGraphSelectionModel|mxGraphView|mxLayoutManager|mxMultiplicity|mxOutline|mxPerimeter|mxPrintPreview|mxStyleRegistry|mxStylesheet|mxSwimlaneManager|mxTemporaryCellStates|mxRootChange|mxChildChange)([^a-zA-Z])/g, '$1mx.$2$3');
  result = result.replace('mxValueChange', 'mx.mxValueChange');

  result = result.replace('\'use strict\';', '');

  result = result.replace('if (window.Sidebar != null)', 'if (Sidebar != null)');
  result = result.replace(/this\.defaultStrokeColor/g, 'StyleFormatPanel.prototype.defaultStrokeColor');
  result = result.replace('img == this.refreshTarget)', 'img == Sidebar.prototype.refreshTarget)');

  result = result.replace('null, null, null, urlParams[\'chrome\'] != \'0\'));', 'null, null, null, urlParams[\'chrome\'] != \'0\'), document.getElementById(\'graphContainer\'));');

  result = result.replace(/document\.title = title;/g, '');

  result = result.replace('wnd = window.open(url);', '');

  // Do not load shapes javascript (already included)
  result = result.replace('mx.mxStencilRegistry.allowEval = mx.mxStencilRegistry.allowEval && !this.isOfflineApp();', 'mx.mxStencilRegistry.allowEval = false');

  result = result.replace(/document\.body/g, 'document.getElementById(\'graphContainer\')');

  return fs.writeFile('dist/applications/drawer/bundles/anyopsos-app-drawer.umd.js', result, 'utf8').then(function () {

    /**
     * Copy required assets
     */
    fs.copySync('node_modules/mxgraph/javascript/src/css', 'dist/anyOpsOS/filesystem/etc/applications/drawer/css');
    fs.copySync('node_modules/draw.io/src/main/webapp/resources', 'dist/anyOpsOS/filesystem/etc/applications/drawer/resources');
    fs.copySync('node_modules/draw.io/src/main/webapp/stencils', 'dist/anyOpsOS/filesystem/etc/applications/drawer/stencils');
    fs.copySync('node_modules/draw.io/src/main/webapp/templates', 'dist/anyOpsOS/filesystem/etc/applications/drawer/templates');
    fs.copySync('node_modules/draw.io/src/main/webapp/images', 'dist/anyOpsOS/filesystem/etc/applications/drawer/images');

    console.log("Drawer end");
  });


});
