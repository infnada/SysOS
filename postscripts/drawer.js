let fs = require('fs');
const util = require('util');

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

console.log('Running drawer.js');

/**
 * Drawer
 */
async function insertContent() {
  let Editor = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/mxgraph/Editor.js');
  let EditorUi = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/mxgraph/EditorUi.js');
  let Sidebar = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/mxgraph/Sidebar.js');
  let Graph = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/mxgraph/Graph.js');
  let Format = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/mxgraph/Format.js');
  let Shapes = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/mxgraph/Shapes.js');
  let Actions = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/mxgraph/Actions.js');
  let Menus = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/mxgraph/Menus.js');
  let Toolbar = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/mxgraph/Toolbar.js');
  let Dialogs = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/mxgraph/Dialogs.js');

  let Sidebars = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-ActiveDirectory.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Advanced.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-AlliedTelesis.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Android.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-ArchiMate.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-ArchiMate3.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Arrows2.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Atlassian.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-AWS.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-AWS3.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-AWS3D.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-AWS4.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-AWS4b.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Azure.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Basic.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Bootstrap.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-BPMN.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Cabinet.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-CiscoSafe.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Citrix.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Cumulus.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-DFD.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-EIP.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Electrical.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-ER.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Floorplan.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Flowchart.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-GCP.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-GCP2.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Gmdl.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-IBM.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Infographic.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Ios.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Ios7.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-LeanMapping.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Mockup.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-MSCAE.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Network.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Office.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-PID.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Rack.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Sitemap.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Sysml.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-Veeam.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-VVD.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/sidebar/Sidebar-WebIcons.js');

  let Utils = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/util/mxJsCanvas.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/util/mxAsyncCanvas.js');

  let Draw = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DrawioFile.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/LocalFile.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/LocalLibrary.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/StorageFile.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/StorageLibrary.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/RemoteFile.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/RemoteLibrary.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/Dialogs.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/Editor.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/EditorUi.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DiffSync.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/Settings.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DrawioFileSync.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DrawioComment.js')
  + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DriveComment.js');

  let Base = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DrawioClient.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DrawioUser.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/UrlLibrary.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DriveFile.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DriveLibrary.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DriveClient.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DropboxFile.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DropboxLibrary.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DropboxClient.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/GitHubFile.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/GitHubLibrary.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/GitHubClient.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/OneDriveFile.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/OneDriveLibrary.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/OneDriveClient.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/TrelloFile.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/TrelloLibrary.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/TrelloClient.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/GitLabFile.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/GitLabLibrary.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/GitLabClient.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/App.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/Menus.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/Pages.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/Trees.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/Minimal.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/DistanceGuides.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/ruler/mxRuler.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/mxFreehand.js');

  let Vsdx = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/vsdx/VsdxExport.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/vsdx/mxVsdxCanvas2D.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/vsdx/bmpDecoder.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/vsdx/importer.js')
    + await readFile('node_modules/draw.io/drawio/src/main/webapp/js/jszip/jszip.min.js');

  let MlCodec = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/diagramly/graphml/mxGraphMlCodec.js');

  return Editor + EditorUi + Sidebar + Graph + Format + Shapes + Actions + Menus + Toolbar + Dialogs + Sidebars + Utils + Draw + Base + Vsdx + MlCodec;
}

fs.readFile('dist/SysOS/filesystem/bin/applications/sysos-app-drawer.umd.js', 'utf8', async function (err, data) {
  if (err) {
    return console.log(err);
  }

  let result = '// Addeded with package.json postscript\n' +
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
    'var DRAWIO_GITLAB_ID = \'\'\n' +
    'var DRAWIO_GITLAB_URL = \'\'\n' +

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
    '\n' + data;


  let res = await insertContent();
  let initBlock = 'App.main();\n' +
    '}\n';

  let jscolor = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/jscolor/jscolor.js');
  let Pako = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/deflate/pako.min.js');
  let Base64 = await readFile('node_modules/draw.io/drawio/src/main/webapp/js/deflate/base64.js');
  let spinner = await readFile('node_modules/spin.js/spin.js');

  result = result.replace('window&&(window.html=ha,window.html_sanitize=la);})();', 'window&&(window.html=ha,window.html_sanitize=la);})();\n' + '\n\nvar Load = function (mx) {\n' +
    '    mx = mx\n' + spinner + Pako + Base64 + jscolor + res + initBlock);

  // Replace wrong var names (multiple times cos this regex only changes 1 match per line)
  result = result.replace(/([^.'<;/])(mxDefaultKeyHandler|mxDefaultPopupMenu|mxDefaultToolbar|mxEditor|mxCellHighlight|mxCellMarker|mxCellTracker|mxConnectionHandler|mxConstraintHandler|mxEdgeHandler|mxEdgeSegmentHandler.js|mxElbowEdgeHandler|mxGraphHandler|mxHandle|mxKeyHandler|mxPanningHandler|mxPopupMenuHandler|mxRubberband|mxSelectionCellsHandler|mxTooltipHandler|mxVertexHandler|mxCellCodec|mxChildChangeCodec|mxCodec|mxCodecRegistry|mxDefaultKeyHandlerCodec|mxDefaultPopupMenuCodec|mxDefaultToolbarCodec|mxEditorCodec|mxGenericChangeCodec|mxGraphCodec|mxGraphViewCodec|mxModelCodec|mxObjectCodec|mxRootChangeCodec|mxStylesheetCodec|mxTerminalChangeCodec|mxGraphAbstractHierarchyCell|mxGraphHierarchyEdge|mxGraphHierarchyModel|mxGraphHierarchyNode|mxSwimlaneModel|mxHierarchicalLayout|mxSwimlaneLayout|mxCoordinateAssignment|mxHierarchicalLayoutStage|mxMedianHybridCrossingReduction|mxMinimumCycleRemover|mxSwimlaneOrdering|mxCircleLayout|mxCompactTreeLayout|mxCompositeLayout|mxEdgeLabelLayout|mxFastOrganicLayout|mxGraphLayout|mxParallelEdgeLayout|mxPartitionLayout|mxRadialTreeLayout|mxStackLayout|mxCell|mxCellPath|mxGeometry|mxGraphModel|mxClient|mxActor|mxArrow|mxArrowConnector|mxCloud|mxConnector|mxCylinder|mxDoubleEllipse|mxEllipse|mxHexagon|mxImageShape|mxLabel|mxLine|mxMarker|mxPolyline|mxRectangleShape|mxRhombus|mxShape|mxStencil|mxStencilRegistry|mxSwimlane|mxText|mxTriangle|mxAbstractCanvas2D|mxAnimation|mxAutoSaveManager|mxClipboard|mxConstants|mxDictionary|mxDivResizer|mxDragSource|mxEffects|mxEvent|mxEventObject|mxEventSource|mxForm|mxGuide|mxImage|mxImageBundle|mxImageExport|mxLog|mxMorphing|mxMouseEvent|mxObjectIdentity|mxPanningManager|mxPoint|mxPopupMenu|mxRectangle|mxResources|mxSvgCanvas2D|mxToolbar|mxUndoableEdit|mxUndoManager|mxUrlConverter|mxUtils|mxVmlCanvas2D|mxWindow|mxXmlCanvas2D|mxXmlRequest|mxCellEditor|mxCellOverlay|mxCellRenderer|mxCellState|mxCellStatePreview|mxConnectionConstraint|mxEdgeStyle|mxGraph|mxGraphSelectionModel|mxGraphView|mxLayoutManager|mxMultiplicity|mxOutline|mxPerimeter|mxPrintPreview|mxStyleRegistry|mxStylesheet|mxSwimlaneManager|mxTemporaryCellStates|mxRootChange|mxChildChange)([^a-zA-Z])/g, '$1mx.$2$3');
  result = result.replace(/([^.'<;/])(mxDefaultKeyHandler|mxDefaultPopupMenu|mxDefaultToolbar|mxEditor|mxCellHighlight|mxCellMarker|mxCellTracker|mxConnectionHandler|mxConstraintHandler|mxEdgeHandler|mxEdgeSegmentHandler.js|mxElbowEdgeHandler|mxGraphHandler|mxHandle|mxKeyHandler|mxPanningHandler|mxPopupMenuHandler|mxRubberband|mxSelectionCellsHandler|mxTooltipHandler|mxVertexHandler|mxCellCodec|mxChildChangeCodec|mxCodec|mxCodecRegistry|mxDefaultKeyHandlerCodec|mxDefaultPopupMenuCodec|mxDefaultToolbarCodec|mxEditorCodec|mxGenericChangeCodec|mxGraphCodec|mxGraphViewCodec|mxModelCodec|mxObjectCodec|mxRootChangeCodec|mxStylesheetCodec|mxTerminalChangeCodec|mxGraphAbstractHierarchyCell|mxGraphHierarchyEdge|mxGraphHierarchyModel|mxGraphHierarchyNode|mxSwimlaneModel|mxHierarchicalLayout|mxSwimlaneLayout|mxCoordinateAssignment|mxHierarchicalLayoutStage|mxMedianHybridCrossingReduction|mxMinimumCycleRemover|mxSwimlaneOrdering|mxCircleLayout|mxCompactTreeLayout|mxCompositeLayout|mxEdgeLabelLayout|mxFastOrganicLayout|mxGraphLayout|mxParallelEdgeLayout|mxPartitionLayout|mxRadialTreeLayout|mxStackLayout|mxCell|mxCellPath|mxGeometry|mxGraphModel|mxClient|mxActor|mxArrow|mxArrowConnector|mxCloud|mxConnector|mxCylinder|mxDoubleEllipse|mxEllipse|mxHexagon|mxImageShape|mxLabel|mxLine|mxMarker|mxPolyline|mxRectangleShape|mxRhombus|mxShape|mxStencil|mxStencilRegistry|mxSwimlane|mxText|mxTriangle|mxAbstractCanvas2D|mxAnimation|mxAutoSaveManager|mxClipboard|mxConstants|mxDictionary|mxDivResizer|mxDragSource|mxEffects|mxEvent|mxEventObject|mxEventSource|mxForm|mxGuide|mxImage|mxImageBundle|mxImageExport|mxLog|mxMorphing|mxMouseEvent|mxObjectIdentity|mxPanningManager|mxPoint|mxPopupMenu|mxRectangle|mxResources|mxSvgCanvas2D|mxToolbar|mxUndoableEdit|mxUndoManager|mxUrlConverter|mxUtils|mxVmlCanvas2D|mxWindow|mxXmlCanvas2D|mxXmlRequest|mxCellEditor|mxCellOverlay|mxCellRenderer|mxCellState|mxCellStatePreview|mxConnectionConstraint|mxEdgeStyle|mxGraph|mxGraphSelectionModel|mxGraphView|mxLayoutManager|mxMultiplicity|mxOutline|mxPerimeter|mxPrintPreview|mxStyleRegistry|mxStylesheet|mxSwimlaneManager|mxTemporaryCellStates|mxRootChange|mxChildChange)([^a-zA-Z])/g, '$1mx.$2$3');
  result = result.replace(/([^.'<;/])(mxDefaultKeyHandler|mxDefaultPopupMenu|mxDefaultToolbar|mxEditor|mxCellHighlight|mxCellMarker|mxCellTracker|mxConnectionHandler|mxConstraintHandler|mxEdgeHandler|mxEdgeSegmentHandler.js|mxElbowEdgeHandler|mxGraphHandler|mxHandle|mxKeyHandler|mxPanningHandler|mxPopupMenuHandler|mxRubberband|mxSelectionCellsHandler|mxTooltipHandler|mxVertexHandler|mxCellCodec|mxChildChangeCodec|mxCodec|mxCodecRegistry|mxDefaultKeyHandlerCodec|mxDefaultPopupMenuCodec|mxDefaultToolbarCodec|mxEditorCodec|mxGenericChangeCodec|mxGraphCodec|mxGraphViewCodec|mxModelCodec|mxObjectCodec|mxRootChangeCodec|mxStylesheetCodec|mxTerminalChangeCodec|mxGraphAbstractHierarchyCell|mxGraphHierarchyEdge|mxGraphHierarchyModel|mxGraphHierarchyNode|mxSwimlaneModel|mxHierarchicalLayout|mxSwimlaneLayout|mxCoordinateAssignment|mxHierarchicalLayoutStage|mxMedianHybridCrossingReduction|mxMinimumCycleRemover|mxSwimlaneOrdering|mxCircleLayout|mxCompactTreeLayout|mxCompositeLayout|mxEdgeLabelLayout|mxFastOrganicLayout|mxGraphLayout|mxParallelEdgeLayout|mxPartitionLayout|mxRadialTreeLayout|mxStackLayout|mxCell|mxCellPath|mxGeometry|mxGraphModel|mxClient|mxActor|mxArrow|mxArrowConnector|mxCloud|mxConnector|mxCylinder|mxDoubleEllipse|mxEllipse|mxHexagon|mxImageShape|mxLabel|mxLine|mxMarker|mxPolyline|mxRectangleShape|mxRhombus|mxShape|mxStencil|mxStencilRegistry|mxSwimlane|mxText|mxTriangle|mxAbstractCanvas2D|mxAnimation|mxAutoSaveManager|mxClipboard|mxConstants|mxDictionary|mxDivResizer|mxDragSource|mxEffects|mxEvent|mxEventObject|mxEventSource|mxForm|mxGuide|mxImage|mxImageBundle|mxImageExport|mxLog|mxMorphing|mxMouseEvent|mxObjectIdentity|mxPanningManager|mxPoint|mxPopupMenu|mxRectangle|mxResources|mxSvgCanvas2D|mxToolbar|mxUndoableEdit|mxUndoManager|mxUrlConverter|mxUtils|mxVmlCanvas2D|mxWindow|mxXmlCanvas2D|mxXmlRequest|mxCellEditor|mxCellOverlay|mxCellRenderer|mxCellState|mxCellStatePreview|mxConnectionConstraint|mxEdgeStyle|mxGraph|mxGraphSelectionModel|mxGraphView|mxLayoutManager|mxMultiplicity|mxOutline|mxPerimeter|mxPrintPreview|mxStyleRegistry|mxStylesheet|mxSwimlaneManager|mxTemporaryCellStates|mxRootChange|mxChildChange)([^a-zA-Z])/g, '$1mx.$2$3');
  result = result.replace(/([^.'<;/])(mxDefaultKeyHandler|mxDefaultPopupMenu|mxDefaultToolbar|mxEditor|mxCellHighlight|mxCellMarker|mxCellTracker|mxConnectionHandler|mxConstraintHandler|mxEdgeHandler|mxEdgeSegmentHandler.js|mxElbowEdgeHandler|mxGraphHandler|mxHandle|mxKeyHandler|mxPanningHandler|mxPopupMenuHandler|mxRubberband|mxSelectionCellsHandler|mxTooltipHandler|mxVertexHandler|mxCellCodec|mxChildChangeCodec|mxCodec|mxCodecRegistry|mxDefaultKeyHandlerCodec|mxDefaultPopupMenuCodec|mxDefaultToolbarCodec|mxEditorCodec|mxGenericChangeCodec|mxGraphCodec|mxGraphViewCodec|mxModelCodec|mxObjectCodec|mxRootChangeCodec|mxStylesheetCodec|mxTerminalChangeCodec|mxGraphAbstractHierarchyCell|mxGraphHierarchyEdge|mxGraphHierarchyModel|mxGraphHierarchyNode|mxSwimlaneModel|mxHierarchicalLayout|mxSwimlaneLayout|mxCoordinateAssignment|mxHierarchicalLayoutStage|mxMedianHybridCrossingReduction|mxMinimumCycleRemover|mxSwimlaneOrdering|mxCircleLayout|mxCompactTreeLayout|mxCompositeLayout|mxEdgeLabelLayout|mxFastOrganicLayout|mxGraphLayout|mxParallelEdgeLayout|mxPartitionLayout|mxRadialTreeLayout|mxStackLayout|mxCell|mxCellPath|mxGeometry|mxGraphModel|mxClient|mxActor|mxArrow|mxArrowConnector|mxCloud|mxConnector|mxCylinder|mxDoubleEllipse|mxEllipse|mxHexagon|mxImageShape|mxLabel|mxLine|mxMarker|mxPolyline|mxRectangleShape|mxRhombus|mxShape|mxStencil|mxStencilRegistry|mxSwimlane|mxText|mxTriangle|mxAbstractCanvas2D|mxAnimation|mxAutoSaveManager|mxClipboard|mxConstants|mxDictionary|mxDivResizer|mxDragSource|mxEffects|mxEvent|mxEventObject|mxEventSource|mxForm|mxGuide|mxImage|mxImageBundle|mxImageExport|mxLog|mxMorphing|mxMouseEvent|mxObjectIdentity|mxPanningManager|mxPoint|mxPopupMenu|mxRectangle|mxResources|mxSvgCanvas2D|mxToolbar|mxUndoableEdit|mxUndoManager|mxUrlConverter|mxUtils|mxVmlCanvas2D|mxWindow|mxXmlCanvas2D|mxXmlRequest|mxCellEditor|mxCellOverlay|mxCellRenderer|mxCellState|mxCellStatePreview|mxConnectionConstraint|mxEdgeStyle|mxGraph|mxGraphSelectionModel|mxGraphView|mxLayoutManager|mxMultiplicity|mxOutline|mxPerimeter|mxPrintPreview|mxStyleRegistry|mxStylesheet|mxSwimlaneManager|mxTemporaryCellStates|mxRootChange|mxChildChange)([^a-zA-Z])/g, '$1mx.$2$3');
  result = result.replace('mxValueChange', 'mx.mxValueChange');

  result = result.replace('export { Spinner };', '');
  result = result.replace('\'use strict\';', '');

  result = result.replace('if (window.Sidebar != null)', 'if (Sidebar != null)');
  result = result.replace(/this\.defaultStrokeColor/g, 'StyleFormatPanel.prototype.defaultStrokeColor');
  result = result.replace('img == this.refreshTarget)', 'img == Sidebar.prototype.refreshTarget)');

  result = result.replace('null, null, null, urlParams[\'chrome\'] != \'0\'));', 'null, null, null, urlParams[\'chrome\'] != \'0\'), document.getElementById(\'graphContainer\'));');

  result = result.replace('!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,', 'var Spinner = ');
  result = result.replace('&&o.adj?i():j=d(o,"animation"),h});', '&&o.adj?i():j=d(o,"animation"),h};');

  result = result.replace(/document\.title = title;/g, '');

  result = result.replace(/document\.body/g, 'document.getElementById(\'graphContainer\')');

  fs.writeFile('dist/SysOS/filesystem/bin/applications/sysos-app-drawer.umd.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
