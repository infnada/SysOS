import {MedianCellSorter} from "./median-cell-sorter";
import {mxAbstractCanvas2D} from "./mx-abstract-canvas-2d";
import {mxActor} from "./mx-actor";
import {mxAnimation} from "./mx-animation";
import {mxArrow} from "./mx-arrow";
import {mxArrowConnector} from "./mx-arrow-connector";
import {mxAutoSaveManager} from "./mx-auto-save-manager";
import {mxCell} from "./mx-cell";
import {mxCellAttributeChange} from "./mx-cell-attribute-change";
import {mxCellEditor} from "./mx-cell-editor";
import {mxCellHighlight} from "./mx-cell-highlight";
import {mxCellMarker} from "./mx-cell-marker";
import {mxCellOverlay} from "./mx-cell-overlay";
import {mxCellPath} from "./mx-cell-path";
import {mxCellRenderer} from "./mx-cell-render";
import {mxCellState} from "./mx-cell-state";
import {mxCellStatePreview} from "./mx-cell-state-preview";
import {mxCellTracker} from "./mx-cell-tracker";
import {mxChildChange} from "./mx-child-change";
import {mxCircleLayout} from "./mx-circle-layout";
import {mxClient} from "./mx-client";
import {mxClipboard} from "./mx-clipboard";
import {mxCloud} from "./mx-cloud";
import {mxCodec} from "./mx-codec";
import {mxCodecRegistry} from "./mx-code-registry";
import {mxCollapseChange} from "./mx-collapse-change";
import {mxCompactTreeLayout} from "./mx-compact-tree-layout";
import {mxCompositeLayout} from "./mx-composite-layout";
import {mxConnectionConstraint} from "./mx-connection-constraint";
import {mxConnectionHandler} from "./mx-connection-handler";
import {mxConnector} from "./mx-connection";
import {mxConstants} from "./mx-constants";
import {mxConstraintHandler} from "./mx-constraint-handler";
import {mxCoordinateAssignment} from "./mx-coordinate-assignment";
import {mxCurrentRootChange} from "./mx-current-root-change";
import {mxCylinder} from "./mx-cylinder";
import {mxDefaultKeyHandler} from "./mx-default-key-handler";
import {mxDefaultPopupMenu} from "./mx-default-pop-menu";
import {mxDefaultToolbar} from "./mx-default-toolbar";
import {mxDictionary} from "./mx-dictionary";
import {mxDivResizer} from "./mx-div-resizer";
import {mxDoubleEllipse} from "./mx-double-ellipse";
import {mxDragSource} from "./mx-drag-source";
import {mxEdgeHandler} from "./mx-edge-handler";
import {mxEdgeLabelLayout} from "./mx-edge-label-layout";
import {mxEdgeStyle} from "./mx-edge-style";
import {mxEditor} from "./mx-editor";
import {mxEffects} from "./mx-effects";
import {mxElbowEdgeHandler} from "./mx-elbow-edge-handler";
import {mxEllipse} from "./mx-ellipse";
import {mxEvent} from "./mx-event";
import {mxEventObject} from "./mx-event-object";
import {mxEventSource} from "./mx-event-source";
import {mxFastOrganicLayout} from "./mx-fast-organic-layout";
import {mxForm} from "./mx-form";
import {mxGeometry} from "./mx-geometry";
import {mxGeometryChange} from "./mx-geometry-change";
import {mxGraph} from "./mx-graph";
import {mxGraphAbstractHierarchyCell} from "./mx-graph-abstract-hierarchy-cell";
import {mxGraphHandler} from "./mx-graph-handler";
import {mxGraphHierarchyEdge} from "./mx-graph-hierarchy-edge";
import {mxGraphHierarchyModel} from "./mx-graph-hierarchy-model";
import {mxGraphHierarchyNode} from "./mx-graph-hierarchy-node";
import {mxGraphLayout} from "./mx-graph-layout";
import {mxGraphModel} from "./mx-graph-model";
import {mxGraphSelectionModel} from "./mx-graph-selection-model";
import {mxGraphView} from "./mx-graph-view";
import {mxGuide} from "./mx-guide";
import {mxHandle} from "./mx-handle";
import {mxHexagon} from "./mx-hexagon";
import {mxHierarchicalLayout} from "./mx-hierarchical-layout";
import {mxHierarchicalLayoutStage} from "./mx-hierarchical-layout-stage";
import {mxImage} from "./mx-image";
import {mxImageBundle} from "./mx-image-bundle";
import {mxImageExport} from "./mx-image-export";
import {mxImageShape} from "./mx-image-shape";
import {mxKeyHandler} from "./mx-key-handler";
import {mxLabel} from "./mx-label";
import {mxLayoutManager} from "./mx-layout-manager";
import {mxLine} from "./mx-line";
import {mxLog} from "./mx-log";
import {mxMarker} from "./mx-marker";
import {mxMedianHybridCrossingReduction} from "./mx-median-hybrid-crossing-reduction";
import {mxMinimumCycleRemover} from "./mx-minimum-cycle-remover";
import {mxMorphing} from "./mx-morphing";
import {mxMouseEvent} from "./mx-mouse-event";
import {mxMultiplicity} from "./mx-multiplicity";
import {mxObjectCodec} from "./mx-object-codec";
import {mxObjectIdentity} from "./mx-object-identity";
import {mxOutline} from "./mx-outline";
import {mxPanningHandler} from "./mx-panning-handler";
import {mxParallelEdgeLayout} from "./mx-parallel-edge-layout";
import {mxPartitionLayout} from "./mx-partition-layout";
import {mxPerimeter} from "./mx-perimeter";
import {mxPoint} from "./mx-point";
import {mxPolyline} from "./mx-polyline";
import {mxPopupMenu} from "./mx-popup-menu";
import {mxPopupMenuHandler} from "./mx-popup-menu-handler";
import {mxPrintPreview} from "./mx-print-preview";
import {mxRadialTreeLayout} from "./mx-radial-tree-layout";
import {mxRectangle} from "./mx-rectangle";
import {mxRectangleShape} from "./mx-rectangle-shape";
import {mxResources} from "./mx-resources";
import {mxRhombus} from "./mx-rhombus";
import {mxRootChange} from "./mx-root-change";
import {mxRubberband} from "./mx-rubberband";
import {mxSelectionCellsHandler} from "./mx-selection-cells-handler";
import {mxSelectionChange} from "./mx-selection-change";
import {mxShape} from "./mx-shape";
import {mxStackLayout} from "./mx-stack-layout";
import {mxStencil} from "./mx-stencil";
import {mxStencilRegistry} from "./mx-stencil-registry";
import {mxStyleChange} from "./mx-style-change";
import {mxStyleRegistry} from "./mx-style-registry";
import {mxStylesheet} from "./mx-stylessheet";
import {mxSvgCanvas2D} from "./mx-svg-canvas-2d";
import {mxSwimlane} from "./mx-swimlane";
import {mxSwimlaneLayout} from "./mx-swimlane-layout";
import {mxSwimlaneManager} from "./mx-swimlane-manager";
import {mxSwimlaneModel} from "./mx-swimlane-model";
import {mxSwimlaneOrdering} from "./mx-swimlane-ordering";
import {mxTemporaryCellStates} from "./mx-temporary-cell-states";
import {mxTerminalChange} from "./mx-terminal-change";
import {mxText} from "./mx-text";
import {mxToolbar} from "./mx-toolbar";
import {mxTooltipHandler} from "./mx-tooltip-handler";
import {mxTriangle} from "./mx-triangle";
import {mxUndoableEdit} from "./mx-undoable-edit";
import {mxUndoManager} from "./mx-undo-manager";
import {mxUrlConverter} from "./mx-url-converter";
import {mxUtils} from "./mx-utils";
import {mxValueChange} from "./mx-value-change";
import {mxVertexHandler} from "./mx-vertex-handler";
import {mxVisibleChange} from "./mx-visible-change";
import {mxVmlCanvas2D} from "./mx-vml-canvas-2d";
import {mxWindow} from "./mx-window";
import {mxXmlCanvas2D} from "./mx-xml-canvas-2d";
import {mxXmlRequest} from "./mx-xml-request";

/*export function MxGraphFactory(opts: {
  // Specifies the path in mxClient.basePath.
  mxBasePath?: string;
  // Specifies the path in mxClient.imageBasePath.
  mxImageBasePath?: string;
  // Specifies the language for resources in mxClient.language.
  mxLanguage?: string;
  // Array of all supported language extensions.
  mxLanguages?: string[];
  // Specifies the default language in mxClient.defaultLanguage. *
  mxDefaultLanguage?: string;
  // Specifies if any resources should be loaded.  Default is true.
  mxLoadResources?: boolean;
  // Specifies if any stylesheets should be loaded.  Default is true.
  mxLoadStylesheets?: boolean;
  // Force loading the JavaScript files in development mode
  mxForceIncludes?: boolean;
  // Specify the extension of resource files.
  mxResourceExtension?: string;
});*/

export const mx: mxgraph = {
  MedianCellSorter: window['MedianCellSorter'],
  mxAbstractCanvas2D: window['mxAbstractCanvas2D'],
  mxActor: window['mxActor'],
  mxAnimation: window['mxAnimation'],
  mxArrow: window['mxArrow'],
  mxArrowConnector: window['mxArrowConnector'],
  mxAutoSaveManager: window['mxAutoSaveManager'],
  mxCell: window['mxCell'],
  mxCellAttributeChange: window['mxCellAttributeChange'],
  //mxCellCodec: window['mxCellCodec'],
  mxCellEditor: window['mxCellEditor'],
  mxCellHighlight: window['mxCellHighlight'],
  mxCellMarker: window['mxCellMarker'],
  mxCellOverlay: window['mxCellOverlay'],
  mxCellPath: window['mxCellPath'],
  mxCellRenderer: window['mxCellRenderer'],
  mxCellState: window['mxCellState'],
  mxCellStatePreview: window['mxCellStatePreview'],
  mxCellTracker: window['mxCellTracker'],
  mxChildChange: window['mxChildChange'],
  //mxChildChangeCodec: window['mxChildChangeCodec'],
  mxCircleLayout: window['mxCircleLayout'],
  mxClient: window['mxClient'],
  mxClipboard: window['mxClipboard'],
  mxCloud: window['mxCloud'],
  mxCodec: window['mxCodec'],
  mxCodecRegistry: window['mxCodecRegistry'],
  mxCollapseChange: window['mxCollapseChange'],
  mxCompactTreeLayout: window['mxCompactTreeLayout'],
  mxCompositeLayout: window['mxCompositeLayout'],
  mxConnectionConstraint: window['mxConnectionConstraint'],
  mxConnectionHandler: window['mxConnectionHandler'],
  mxConnector: window['mxConnector'],
  mxConstants: window['mxConstants'],
  mxConstraintHandler: window['mxConstraintHandler'],
  mxCoordinateAssignment: window['mxCoordinateAssignment'],
  mxCurrentRootChange: window['mxCurrentRootChange'],
  mxCylinder: window['mxCylinder'],
  mxDefaultKeyHandler: window['mxDefaultKeyHandler'],
  //mxDefaultKeyHandlerCodec: window['mxDefaultKeyHandlerCodec'],
  mxDefaultPopupMenu: window['mxDefaultPopupMenu'],
  //mxDefaultPopupMenuCodec: window['mxDefaultPopupMenuCodec'],
  mxDefaultToolbar: window['mxDefaultToolbar'],
  //mxDefaultToolbarCodec: window['mxDefaultToolbarCodec'],
  mxDictionary: window['mxDictionary'],
  mxDivResizer: window['mxDivResizer'],
  mxDoubleEllipse: window['mxDoubleEllipse'],
  mxDragSource: window['mxDragSource'],
  mxEdgeHandler: window['mxEdgeHandler'],
  mxEdgeLabelLayout: window['mxEdgeLabelLayout'],
  mxEdgeStyle: window['mxEdgeStyle'],
  mxEditor: window['mxEditor'],
  //mxEditorCodec: window['mxEditorCodec'],
  mxEffects: window['mxEffects'],
  mxElbowEdgeHandler: window['mxElbowEdgeHandler'],
  mxEllipse: window['mxEllipse'],
  mxEvent: window['mxEvent'],
  mxEventObject: window['mxEventObject'],
  mxEventSource: window['mxEventSource'],
  mxFastOrganicLayout: window['mxFastOrganicLayout'],
  mxForm: window['mxForm'],
  //mxGenericChangeCodec: window['mxGenericChangeCodec'],
  mxGeometry: window['mxGeometry'],
  mxGeometryChange: window['mxGeometryChange'],
  mxGraph: window['mxGraph'],
  mxGraphAbstractHierarchyCell: window['mxGraphAbstractHierarchyCell'],
  //mxGraphCodec: window['mxGraphCodec'],
  mxGraphHandler: window['mxGraphHandler'],
  mxGraphHierarchyEdge: window['mxGraphHierarchyEdge'],
  mxGraphHierarchyModel: window['mxGraphHierarchyModel'],
  mxGraphHierarchyNode: window['mxGraphHierarchyNode'],
  mxGraphLayout: window['mxGraphLayout'],
  mxGraphModel: window['mxGraphModel'],
  mxGraphSelectionModel: window['mxGraphSelectionModel'],
  mxGraphView: window['mxGraphView'],
  //mxGraphViewCodec: window['mxGraphViewCodec'],
  mxGuide: window['mxGuide'],
  mxHandle: window['mxHandle'],
  mxHexagon: window['mxHexagon'],
  mxHierarchicalLayout: window['mxHierarchicalLayout'],
  mxHierarchicalLayoutStage: window['mxHierarchicalLayoutStage'],
  mxImage: window['mxImage'],
  mxImageBundle: window['mxImageBundle'],
  mxImageExport: window['mxImageExport'],
  mxImageShape: window['mxImageShape'],
  mxKeyHandler: window['mxKeyHandler'],
  mxLabel: window['mxLabel'],
  mxLayoutManager: window['mxLayoutManager'],
  mxLine: window['mxLine'],
  mxLog: window['mxLog'],
  mxMarker: window['mxMarker'],
  mxMedianHybridCrossingReduction: window['mxMedianHybridCrossingReduction'],
  mxMinimumCycleRemover: window['mxMinimumCycleRemover'],
  //mxModelCodec: window['mxModelCodec'],
  mxMorphing: window['mxMorphing'],
  mxMouseEvent: window['mxMouseEvent'],
  mxMultiplicity: window['mxMultiplicity'],
  mxObjectCodec: window['mxObjectCodec'],
  mxObjectIdentity: window['mxObjectIdentity'],
  mxOutline: window['mxOutline'],
  mxPanningHandler: window['mxPanningHandler'],
  //mxPanningManager: window['mxPanningManager'],
  mxParallelEdgeLayout: window['mxParallelEdgeLayout'],
  mxPartitionLayout: window['mxPartitionLayout'],
  mxPerimeter: window['mxPerimeter'],
  mxPoint: window['mxPoint'],
  mxPolyline: window['mxPolyline'],
  mxPopupMenu: window['mxPopupMenu'],
  mxPopupMenuHandler: window['mxPopupMenuHandler'],
  mxPrintPreview: window['mxPrintPreview'],
  mxRadialTreeLayout: window['mxRadialTreeLayout'],
  mxRectangle: window['mxRectangle'],
  mxRectangleShape: window['mxRectangleShape'],
  mxResources: window['mxResources'],
  mxRhombus: window['mxRhombus'],
  mxRootChange: window['mxRootChange'],
  //mxRootChangeCodec: window['mxRootChangeCodec'],
  mxRubberband: window['mxRubberband'],
  mxSelectionCellsHandler: window['mxSelectionCellsHandler'],
  mxSelectionChange: window['mxSelectionChange'],
  mxShape: window['mxShape'],
  mxStackLayout: window['mxStackLayout'],
  mxStencil: window['mxStencil'],
  mxStencilRegistry: window['mxStencilRegistry'],
  mxStyleChange: window['mxStyleChange'],
  mxStyleRegistry: window['mxStyleRegistry'],
  mxStylesheet: window['mxStylesheet'],
  //mxStylesheetCodec: window['mxStylesheetCodec'],
  mxSvgCanvas2D: window['mxSvgCanvas2D'],
  mxSwimlane: window['mxSwimlane'],
  mxSwimlaneLayout: window['mxSwimlaneLayout'],
  mxSwimlaneManager: window['mxSwimlaneManager'],
  mxSwimlaneModel: window['mxSwimlaneModel'],
  mxSwimlaneOrdering: window['mxSwimlaneOrdering'],
  mxTemporaryCellStates: window['mxTemporaryCellStates'],
  mxTerminalChange: window['mxTerminalChange'],
  //mxTerminalChangeCodec: window['mxTerminalChangeCodec'],
  mxText: window['mxText'],
  mxToolbar: window['mxToolbar'],
  mxTooltipHandler: window['mxTooltipHandler'],
  mxTriangle: window['mxTriangle'],
  mxUndoableEdit: window['mxUndoableEdit'],
  mxUndoManager: window['mxUndoManager'],
  mxUrlConverter: window['mxUrlConverter'],
  mxUtils: window['mxUtils'],
  mxValueChange: window['mxValueChange'],
  mxVertexHandler: window['mxVertexHandler'],
  mxVisibleChange: window['mxVisibleChange'],
  mxVmlCanvas2D: window['mxVmlCanvas2D'],
  mxWindow: window['mxWindow'],
  mxXmlCanvas2D: window['mxXmlCanvas2D'],
  mxXmlRequest: window['mxXmlRequest']
};

export interface mxgraph {
  MedianCellSorter: MedianCellSorter;
  mxAbstractCanvas2D: mxAbstractCanvas2D;
  mxActor: mxActor;
  mxAnimation: mxAnimation;
  mxArrow: mxArrow;
  mxArrowConnector: mxArrowConnector;
  mxAutoSaveManager: mxAutoSaveManager;
  mxCell: mxCell;
  mxCellAttributeChange: mxCellAttributeChange;
  //mxCellCodec: mxCellCodec;
  mxCellEditor: mxCellEditor;
  mxCellHighlight: mxCellHighlight;
  mxCellMarker: mxCellMarker;
  mxCellOverlay: mxCellOverlay;
  mxCellPath: mxCellPath;
  mxCellRenderer: mxCellRenderer;
  mxCellState: mxCellState;
  mxCellStatePreview: mxCellStatePreview;
  mxCellTracker: mxCellTracker;
  mxChildChange: mxChildChange;
  //mxChildChangeCodec: mxChildChangeCodec;
  mxCircleLayout: mxCircleLayout;
  mxClient: mxClient;
  mxClipboard: mxClipboard;
  mxCloud: mxCloud;
  mxCodec: mxCodec;
  mxCodecRegistry: mxCodecRegistry;
  mxCollapseChange: mxCollapseChange;
  mxCompactTreeLayout: mxCompactTreeLayout;
  mxCompositeLayout: mxCompositeLayout;
  mxConnectionConstraint: mxConnectionConstraint;
  mxConnectionHandler: mxConnectionHandler;
  mxConnector: mxConnector;
  mxConstants: mxConstants;
  mxConstraintHandler: mxConstraintHandler;
  mxCoordinateAssignment: mxCoordinateAssignment;
  mxCurrentRootChange: mxCurrentRootChange;
  mxCylinder: mxCylinder;
  mxDefaultKeyHandler: mxDefaultKeyHandler;
  //mxDefaultKeyHandlerCodec: mxDefaultKeyHandlerCodec;
  mxDefaultPopupMenu: mxDefaultPopupMenu;
  //mxDefaultPopupMenuCodec: mxDefaultPopupMenuCodec;
  mxDefaultToolbar: mxDefaultToolbar;
  //mxDefaultToolbarCodec: mxDefaultToolbarCodec;
  mxDictionary: mxDictionary;
  mxDivResizer: mxDivResizer;
  mxDoubleEllipse: mxDoubleEllipse;
  mxDragSource: mxDragSource;
  mxEdgeHandler: mxEdgeHandler;
  mxEdgeLabelLayout: mxEdgeLabelLayout;
  mxEdgeStyle: mxEdgeStyle;
  mxEditor: mxEditor;
  //mxEditorCodec: mxEditorCodec;
  mxEffects: mxEffects;
  mxElbowEdgeHandler: mxElbowEdgeHandler;
  mxEllipse: mxEllipse;
  mxEvent: mxEvent;
  mxEventObject: mxEventObject;
  mxEventSource: mxEventSource;
  mxFastOrganicLayout: mxFastOrganicLayout;
  mxForm: mxForm;
  //mxGenericChangeCodec: mxGenericChangeCodec;
  mxGeometry: mxGeometry;
  mxGeometryChange: mxGeometryChange;
  mxGraph: mxGraph;
  mxGraphAbstractHierarchyCell: mxGraphAbstractHierarchyCell;
  //mxGraphCodec: mxGraphCodec;
  mxGraphHandler: mxGraphHandler;
  mxGraphHierarchyEdge: mxGraphHierarchyEdge;
  mxGraphHierarchyModel: mxGraphHierarchyModel;
  mxGraphHierarchyNode: mxGraphHierarchyNode;
  mxGraphLayout: mxGraphLayout;
  mxGraphModel: mxGraphModel;
  mxGraphSelectionModel: mxGraphSelectionModel;
  mxGraphView: mxGraphView;
  //mxGraphViewCodec: mxGraphViewCodec;
  mxGuide: mxGuide;
  mxHandle: mxHandle;
  mxHexagon: mxHexagon;
  mxHierarchicalLayout: mxHierarchicalLayout;
  mxHierarchicalLayoutStage: mxHierarchicalLayoutStage;
  mxImage: mxImage;
  mxImageBundle: mxImageBundle;
  mxImageExport: mxImageExport;
  mxImageShape: mxImageShape;
  mxKeyHandler: mxKeyHandler;
  mxLabel: mxLabel;
  mxLayoutManager: mxLayoutManager;
  mxLine: mxLine;
  mxLog: mxLog;
  mxMarker: mxMarker;
  mxMedianHybridCrossingReduction: mxMedianHybridCrossingReduction;
  mxMinimumCycleRemover: mxMinimumCycleRemover;
  //mxModelCodec: mxModelCodec;
  mxMorphing: mxMorphing;
  mxMouseEvent: mxMouseEvent;
  mxMultiplicity: mxMultiplicity;
  mxObjectCodec: mxObjectCodec;
  mxObjectIdentity: mxObjectIdentity;
  mxOutline: mxOutline;
  mxPanningHandler: mxPanningHandler;
  //mxPanningManager: mxPanningManager;
  mxParallelEdgeLayout: mxParallelEdgeLayout;
  mxPartitionLayout: mxPartitionLayout;
  mxPerimeter: mxPerimeter;
  mxPoint: mxPoint;
  mxPolyline: mxPolyline;
  mxPopupMenu: mxPopupMenu;
  mxPopupMenuHandler: mxPopupMenuHandler;
  mxPrintPreview: mxPrintPreview;
  mxRadialTreeLayout: mxRadialTreeLayout;
  mxRectangle: mxRectangle;
  mxRectangleShape: mxRectangleShape;
  mxResources: mxResources;
  mxRhombus: mxRhombus;
  mxRootChange: mxRootChange;
  //mxRootChangeCodec: mxRootChangeCodec;
  mxRubberband: mxRubberband;
  mxSelectionCellsHandler: mxSelectionCellsHandler;
  mxSelectionChange: mxSelectionChange;
  mxShape: mxShape;
  mxStackLayout: mxStackLayout;
  mxStencil: mxStencil;
  mxStencilRegistry: mxStencilRegistry;
  mxStyleChange: mxStyleChange;
  mxStyleRegistry: mxStyleRegistry;
  mxStylesheet: mxStylesheet;
  //mxStylesheetCodec: mxStylesheetCodec;
  mxSvgCanvas2D: mxSvgCanvas2D;
  mxSwimlane: mxSwimlane;
  mxSwimlaneLayout: mxSwimlaneLayout;
  mxSwimlaneManager: mxSwimlaneManager;
  mxSwimlaneModel: mxSwimlaneModel;
  mxSwimlaneOrdering: mxSwimlaneOrdering;
  mxTemporaryCellStates: mxTemporaryCellStates;
  mxTerminalChange: mxTerminalChange;
  //mxTerminalChangeCodec: mxTerminalChangeCodec;
  mxText: mxText;
  mxToolbar: mxToolbar;
  mxTooltipHandler: mxTooltipHandler;
  mxTriangle: mxTriangle;
  mxUndoableEdit: mxUndoableEdit;
  mxUndoManager: mxUndoManager;
  mxUrlConverter: mxUrlConverter;
  mxUtils: mxUtils;
  mxValueChange: mxValueChange;
  mxVertexHandler: mxVertexHandler;
  mxVisibleChange: mxVisibleChange;
  mxVmlCanvas2D: mxVmlCanvas2D;
  mxWindow: mxWindow;
  mxXmlCanvas2D: mxXmlCanvas2D;
  mxXmlRequest: mxXmlRequest;
}
