import {MedianCellSorter} from './median-cell-sorter';
import {mxAbstractCanvas2D} from './mx-abstract-canvas-2d';
import {mxActor} from './mx-actor';
import {mxAnimation} from './mx-animation';
import {mxArrow} from './mx-arrow';
import {mxArrowConnector} from './mx-arrow-connector';
import {mxAutoSaveManager} from './mx-auto-save-manager';
import {mxCell} from './mx-cell';
import {mxCellAttributeChange} from './mx-cell-attribute-change';
import {mxCellEditor} from './mx-cell-editor';
import {mxCellHighlight} from './mx-cell-highlight';
import {mxCellMarker} from './mx-cell-marker';
import {mxCellOverlay} from './mx-cell-overlay';
import {mxCellPath} from './mx-cell-path';
import {mxCellRenderer} from './mx-cell-render';
import {mxCellState} from './mx-cell-state';
import {mxCellStatePreview} from './mx-cell-state-preview';
import {mxCellTracker} from './mx-cell-tracker';
import {mxChildChange} from './mx-child-change';
import {mxCircleLayout} from './mx-circle-layout';
import {mxClient} from './mx-client';
import {mxClipboard} from './mx-clipboard';
import {mxCloud} from './mx-cloud';
import {mxCodec} from './mx-codec';
import {mxCodecRegistry} from './mx-code-registry';
import {mxCollapseChange} from './mx-collapse-change';
import {mxCompactTreeLayout} from './mx-compact-tree-layout';
import {mxCompositeLayout} from './mx-composite-layout';
import {mxConnectionConstraint} from './mx-connection-constraint';
import {mxConnectionHandler} from './mx-connection-handler';
import {mxConnector} from './mx-connection';
import {mxConstants} from './mx-constants';
import {mxConstraintHandler} from './mx-constraint-handler';
import {mxCoordinateAssignment} from './mx-coordinate-assignment';
import {mxCurrentRootChange} from './mx-current-root-change';
import {mxCylinder} from './mx-cylinder';
import {mxDefaultKeyHandler} from './mx-default-key-handler';
import {mxDefaultPopupMenu} from './mx-default-pop-menu';
import {mxDefaultToolbar} from './mx-default-toolbar';
import {mxDictionary} from './mx-dictionary';
import {mxDivResizer} from './mx-div-resizer';
import {mxDoubleEllipse} from './mx-double-ellipse';
import {mxDragSource} from './mx-drag-source';
import {mxEdgeHandler} from './mx-edge-handler';
import {mxEdgeLabelLayout} from './mx-edge-label-layout';
import {mxEdgeStyle} from './mx-edge-style';
import {mxEditor} from './mx-editor';
import {mxEffects} from './mx-effects';
import {mxElbowEdgeHandler} from './mx-elbow-edge-handler';
import {mxEllipse} from './mx-ellipse';
import {mxEvent} from './mx-event';
import {mxEventObject} from './mx-event-object';
import {mxEventSource} from './mx-event-source';
import {mxFastOrganicLayout} from './mx-fast-organic-layout';
import {mxForm} from './mx-form';
import {mxGeometry} from './mx-geometry';
import {mxGeometryChange} from './mx-geometry-change';
import {mxGraph} from './mx-graph';
import {mxGraphAbstractHierarchyCell} from './mx-graph-abstract-hierarchy-cell';
import {mxGraphHandler} from './mx-graph-handler';
import {mxGraphHierarchyEdge} from './mx-graph-hierarchy-edge';
import {mxGraphHierarchyModel} from './mx-graph-hierarchy-model';
import {mxGraphHierarchyNode} from './mx-graph-hierarchy-node';
import {mxGraphLayout} from './mx-graph-layout';
import {mxGraphModel} from './mx-graph-model';
import {mxGraphSelectionModel} from './mx-graph-selection-model';
import {mxGraphView} from './mx-graph-view';
import {mxGuide} from './mx-guide';
import {mxHandle} from './mx-handle';
import {mxHexagon} from './mx-hexagon';
import {mxHierarchicalLayout} from './mx-hierarchical-layout';
import {mxHierarchicalLayoutStage} from './mx-hierarchical-layout-stage';
import {mxImage} from './mx-image';
import {mxImageBundle} from './mx-image-bundle';
import {mxImageExport} from './mx-image-export';
import {mxImageShape} from './mx-image-shape';
import {mxKeyHandler} from './mx-key-handler';
import {mxLabel} from './mx-label';
import {mxLayoutManager} from './mx-layout-manager';
import {mxLine} from './mx-line';
import {mxLog} from './mx-log';
import {mxMarker} from './mx-marker';
import {mxMedianHybridCrossingReduction} from './mx-median-hybrid-crossing-reduction';
import {mxMinimumCycleRemover} from './mx-minimum-cycle-remover';
import {mxMorphing} from './mx-morphing';
import {mxMouseEvent} from './mx-mouse-event';
import {mxMultiplicity} from './mx-multiplicity';
import {mxObjectCodec} from './mx-object-codec';
import {mxObjectIdentity} from './mx-object-identity';
import {mxOutline} from './mx-outline';
import {mxPanningHandler} from './mx-panning-handler';
import {mxParallelEdgeLayout} from './mx-parallel-edge-layout';
import {mxPartitionLayout} from './mx-partition-layout';
import {mxPerimeter} from './mx-perimeter';
import {mxPoint} from './mx-point';
import {mxPolyline} from './mx-polyline';
import {mxPopupMenu} from './mx-popup-menu';
import {mxPopupMenuHandler} from './mx-popup-menu-handler';
import {mxPrintPreview} from './mx-print-preview';
import {mxRadialTreeLayout} from './mx-radial-tree-layout';
import {mxRectangle} from './mx-rectangle';
import {mxRectangleShape} from './mx-rectangle-shape';
import {mxResources} from './mx-resources';
import {mxRhombus} from './mx-rhombus';
import {mxRootChange} from './mx-root-change';
import {mxRubberband} from './mx-rubberband';
import {mxSelectionCellsHandler} from './mx-selection-cells-handler';
import {mxSelectionChange} from './mx-selection-change';
import {mxShape} from './mx-shape';
import {mxStackLayout} from './mx-stack-layout';
import {mxStencil} from './mx-stencil';
import {mxStencilRegistry} from './mx-stencil-registry';
import {mxStyleChange} from './mx-style-change';
import {mxStyleRegistry} from './mx-style-registry';
import {mxStylesheet} from './mx-stylessheet';
import {mxSvgCanvas2D} from './mx-svg-canvas-2d';
import {mxSwimlane} from './mx-swimlane';
import {mxSwimlaneLayout} from './mx-swimlane-layout';
import {mxSwimlaneManager} from './mx-swimlane-manager';
import {mxSwimlaneModel} from './mx-swimlane-model';
import {mxSwimlaneOrdering} from './mx-swimlane-ordering';
import {mxTemporaryCellStates} from './mx-temporary-cell-states';
import {mxTerminalChange} from './mx-terminal-change';
import {mxText} from './mx-text';
import {mxToolbar} from './mx-toolbar';
import {mxTooltipHandler} from './mx-tooltip-handler';
import {mxTriangle} from './mx-triangle';
import {mxUndoableEdit} from './mx-undoable-edit';
import {mxUndoManager} from './mx-undo-manager';
import {mxUrlConverter} from './mx-url-converter';
import {mxUtils} from './mx-utils';
import {mxValueChange} from './mx-value-change';
import {mxVertexHandler} from './mx-vertex-handler';
import {mxVisibleChange} from './mx-visible-change';
import {mxVmlCanvas2D} from './mx-vml-canvas-2d';
import {mxWindow} from './mx-window';
import {mxXmlCanvas2D} from './mx-xml-canvas-2d';
import {mxXmlRequest} from './mx-xml-request';

import {mxPanningManager} from './mx-panning-manager';

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
  MedianCellSorter: (window as any).MedianCellSorter,
  mxAbstractCanvas2D: (window as any).mxAbstractCanvas2D,
  mxActor: (window as any).mxActor,
  mxAnimation: (window as any).mxAnimation,
  mxArrow: (window as any).mxArrow,
  mxArrowConnector: (window as any).mxArrowConnector,
  mxAutoSaveManager: (window as any).mxAutoSaveManager,
  mxCell: (window as any).mxCell,
  mxCellAttributeChange: (window as any).mxCellAttributeChange,
  // mxCellCodec: (window as any).mxCellCodec,
  mxCellEditor: (window as any).mxCellEditor,
  mxCellHighlight: (window as any).mxCellHighlight,
  mxCellMarker: (window as any).mxCellMarker,
  mxCellOverlay: (window as any).mxCellOverlay,
  mxCellPath: (window as any).mxCellPath,
  mxCellRenderer: (window as any).mxCellRenderer,
  mxCellState: (window as any).mxCellState,
  mxCellStatePreview: (window as any).mxCellStatePreview,
  mxCellTracker: (window as any).mxCellTracker,
  mxChildChange: (window as any).mxChildChange,
  // mxChildChangeCodec: (window as any).mxChildChangeCodec,
  mxCircleLayout: (window as any).mxCircleLayout,
  mxClient: (window as any).mxClient,
  mxClipboard: (window as any).mxClipboard,
  mxCloud: (window as any).mxCloud,
  mxCodec: (window as any).mxCodec,
  mxCodecRegistry: (window as any).mxCodecRegistry,
  mxCollapseChange: (window as any).mxCollapseChange,
  mxCompactTreeLayout: (window as any).mxCompactTreeLayout,
  mxCompositeLayout: (window as any).mxCompositeLayout,
  mxConnectionConstraint: (window as any).mxConnectionConstraint,
  mxConnectionHandler: (window as any).mxConnectionHandler,
  mxConnector: (window as any).mxConnector,
  mxConstants: (window as any).mxConstants,
  mxConstraintHandler: (window as any).mxConstraintHandler,
  mxCoordinateAssignment: (window as any).mxCoordinateAssignment,
  mxCurrentRootChange: (window as any).mxCurrentRootChange,
  mxCylinder: (window as any).mxCylinder,
  mxDefaultKeyHandler: (window as any).mxDefaultKeyHandler,
  // mxDefaultKeyHandlerCodec: (window as any).mxDefaultKeyHandlerCodec,
  mxDefaultPopupMenu: (window as any).mxDefaultPopupMenu,
  // mxDefaultPopupMenuCodec: (window as any).mxDefaultPopupMenuCodec,
  mxDefaultToolbar: (window as any).mxDefaultToolbar,
  // mxDefaultToolbarCodec: (window as any).mxDefaultToolbarCodec,
  mxDictionary: (window as any).mxDictionary,
  mxDivResizer: (window as any).mxDivResizer,
  mxDoubleEllipse: (window as any).mxDoubleEllipse,
  mxDragSource: (window as any).mxDragSource,
  mxEdgeHandler: (window as any).mxEdgeHandler,
  mxEdgeLabelLayout: (window as any).mxEdgeLabelLayout,
  mxEdgeStyle: (window as any).mxEdgeStyle,
  mxEditor: (window as any).mxEditor,
  // mxEditorCodec: (window as any).mxEditorCodec,
  mxEffects: (window as any).mxEffects,
  mxElbowEdgeHandler: (window as any).mxElbowEdgeHandler,
  mxEllipse: (window as any).mxEllipse,
  mxEvent: (window as any).mxEvent,
  mxEventObject: (window as any).mxEventObject,
  mxEventSource: (window as any).mxEventSource,
  mxFastOrganicLayout: (window as any).mxFastOrganicLayout,
  mxForm: (window as any).mxForm,
  // mxGenericChangeCodec: (window as any).mxGenericChangeCodec,
  mxGeometry: (window as any).mxGeometry,
  mxGeometryChange: (window as any).mxGeometryChange,
  mxGraph: (window as any).mxGraph,
  mxGraphAbstractHierarchyCell: (window as any).mxGraphAbstractHierarchyCell,
  // mxGraphCodec: (window as any).mxGraphCodec,
  mxGraphHandler: (window as any).mxGraphHandler,
  mxGraphHierarchyEdge: (window as any).mxGraphHierarchyEdge,
  mxGraphHierarchyModel: (window as any).mxGraphHierarchyModel,
  mxGraphHierarchyNode: (window as any).mxGraphHierarchyNode,
  mxGraphLayout: (window as any).mxGraphLayout,
  mxGraphModel: (window as any).mxGraphModel,
  mxGraphSelectionModel: (window as any).mxGraphSelectionModel,
  mxGraphView: (window as any).mxGraphView,
  // mxGraphViewCodec: (window as any).mxGraphViewCodec,
  mxGuide: (window as any).mxGuide,
  mxHandle: (window as any).mxHandle,
  mxHexagon: (window as any).mxHexagon,
  mxHierarchicalLayout: (window as any).mxHierarchicalLayout,
  mxHierarchicalLayoutStage: (window as any).mxHierarchicalLayoutStage,
  mxImage: (window as any).mxImage,
  mxImageBundle: (window as any).mxImageBundle,
  mxImageExport: (window as any).mxImageExport,
  mxImageShape: (window as any).mxImageShape,
  mxKeyHandler: (window as any).mxKeyHandler,
  mxLabel: (window as any).mxLabel,
  mxLayoutManager: (window as any).mxLayoutManager,
  mxLine: (window as any).mxLine,
  mxLog: (window as any).mxLog,
  mxMarker: (window as any).mxMarker,
  mxMedianHybridCrossingReduction: (window as any).mxMedianHybridCrossingReduction,
  mxMinimumCycleRemover: (window as any).mxMinimumCycleRemover,
  // mxModelCodec: (window as any).mxModelCodec,
  mxMorphing: (window as any).mxMorphing,
  mxMouseEvent: (window as any).mxMouseEvent,
  mxMultiplicity: (window as any).mxMultiplicity,
  mxObjectCodec: (window as any).mxObjectCodec,
  mxObjectIdentity: (window as any).mxObjectIdentity,
  mxOutline: (window as any).mxOutline,
  mxPanningHandler: (window as any).mxPanningHandler,
  mxPanningManager: (window as any).mxPanningManager,
  mxParallelEdgeLayout: (window as any).mxParallelEdgeLayout,
  mxPartitionLayout: (window as any).mxPartitionLayout,
  mxPerimeter: (window as any).mxPerimeter,
  mxPoint: (window as any).mxPoint,
  mxPolyline: (window as any).mxPolyline,
  mxPopupMenu: (window as any).mxPopupMenu,
  mxPopupMenuHandler: (window as any).mxPopupMenuHandler,
  mxPrintPreview: (window as any).mxPrintPreview,
  mxRadialTreeLayout: (window as any).mxRadialTreeLayout,
  mxRectangle: (window as any).mxRectangle,
  mxRectangleShape: (window as any).mxRectangleShape,
  mxResources: (window as any).mxResources,
  mxRhombus: (window as any).mxRhombus,
  mxRootChange: (window as any).mxRootChange,
  // mxRootChangeCodec: (window as any).mxRootChangeCodec,
  mxRubberband: (window as any).mxRubberband,
  mxSelectionCellsHandler: (window as any).mxSelectionCellsHandler,
  mxSelectionChange: (window as any).mxSelectionChange,
  mxShape: (window as any).mxShape,
  mxStackLayout: (window as any).mxStackLayout,
  mxStencil: (window as any).mxStencil,
  mxStencilRegistry: (window as any).mxStencilRegistry,
  mxStyleChange: (window as any).mxStyleChange,
  mxStyleRegistry: (window as any).mxStyleRegistry,
  mxStylesheet: (window as any).mxStylesheet,
  // mxStylesheetCodec: (window as any).mxStylesheetCodec,
  mxSvgCanvas2D: (window as any).mxSvgCanvas2D,
  mxSwimlane: (window as any).mxSwimlane,
  mxSwimlaneLayout: (window as any).mxSwimlaneLayout,
  mxSwimlaneManager: (window as any).mxSwimlaneManager,
  mxSwimlaneModel: (window as any).mxSwimlaneModel,
  mxSwimlaneOrdering: (window as any).mxSwimlaneOrdering,
  mxTemporaryCellStates: (window as any).mxTemporaryCellStates,
  mxTerminalChange: (window as any).mxTerminalChange,
  // mxTerminalChangeCodec: (window as any).mxTerminalChangeCodec,
  mxText: (window as any).mxText,
  mxToolbar: (window as any).mxToolbar,
  mxTooltipHandler: (window as any).mxTooltipHandler,
  mxTriangle: (window as any).mxTriangle,
  mxUndoableEdit: (window as any).mxUndoableEdit,
  mxUndoManager: (window as any).mxUndoManager,
  mxUrlConverter: (window as any).mxUrlConverter,
  mxUtils: (window as any).mxUtils,
  mxValueChange: (window as any).mxValueChange,
  mxVertexHandler: (window as any).mxVertexHandler,
  mxVisibleChange: (window as any).mxVisibleChange,
  mxVmlCanvas2D: (window as any).mxVmlCanvas2D,
  mxWindow: (window as any).mxWindow,
  mxXmlCanvas2D: (window as any).mxXmlCanvas2D,
  mxXmlRequest: (window as any).mxXmlRequest
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
  // mxCellCodec: mxCellCodec;
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
  // mxChildChangeCodec: mxChildChangeCodec;
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
  // mxDefaultKeyHandlerCodec: mxDefaultKeyHandlerCodec;
  mxDefaultPopupMenu: mxDefaultPopupMenu;
  // mxDefaultPopupMenuCodec: mxDefaultPopupMenuCodec;
  mxDefaultToolbar: mxDefaultToolbar;
  // mxDefaultToolbarCodec: mxDefaultToolbarCodec;
  mxDictionary: mxDictionary;
  mxDivResizer: mxDivResizer;
  mxDoubleEllipse: mxDoubleEllipse;
  mxDragSource: mxDragSource;
  mxEdgeHandler: mxEdgeHandler;
  mxEdgeLabelLayout: mxEdgeLabelLayout;
  mxEdgeStyle: mxEdgeStyle;
  mxEditor: mxEditor;
  // mxEditorCodec: mxEditorCodec;
  mxEffects: mxEffects;
  mxElbowEdgeHandler: mxElbowEdgeHandler;
  mxEllipse: mxEllipse;
  mxEvent: mxEvent;
  mxEventObject: mxEventObject;
  mxEventSource: mxEventSource;
  mxFastOrganicLayout: mxFastOrganicLayout;
  mxForm: mxForm;
  // mxGenericChangeCodec: mxGenericChangeCodec;
  mxGeometry: mxGeometry;
  mxGeometryChange: mxGeometryChange;
  mxGraph: mxGraph;
  mxGraphAbstractHierarchyCell: mxGraphAbstractHierarchyCell;
  // mxGraphCodec: mxGraphCodec;
  mxGraphHandler: mxGraphHandler;
  mxGraphHierarchyEdge: mxGraphHierarchyEdge;
  mxGraphHierarchyModel: mxGraphHierarchyModel;
  mxGraphHierarchyNode: mxGraphHierarchyNode;
  mxGraphLayout: mxGraphLayout;
  mxGraphModel: mxGraphModel;
  mxGraphSelectionModel: mxGraphSelectionModel;
  mxGraphView: mxGraphView;
  // mxGraphViewCodec: mxGraphViewCodec;
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
  // mxModelCodec: mxModelCodec;
  mxMorphing: mxMorphing;
  mxMouseEvent: mxMouseEvent;
  mxMultiplicity: mxMultiplicity;
  mxObjectCodec: mxObjectCodec;
  mxObjectIdentity: mxObjectIdentity;
  mxOutline: mxOutline;
  mxPanningHandler: mxPanningHandler;
  mxPanningManager: mxPanningManager;
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
  // mxRootChangeCodec: mxRootChangeCodec;
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
  // mxStylesheetCodec: mxStylesheetCodec;
  mxSvgCanvas2D: mxSvgCanvas2D;
  mxSwimlane: mxSwimlane;
  mxSwimlaneLayout: mxSwimlaneLayout;
  mxSwimlaneManager: mxSwimlaneManager;
  mxSwimlaneModel: mxSwimlaneModel;
  mxSwimlaneOrdering: mxSwimlaneOrdering;
  mxTemporaryCellStates: mxTemporaryCellStates;
  mxTerminalChange: mxTerminalChange;
  // mxTerminalChangeCodec: mxTerminalChangeCodec;
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
