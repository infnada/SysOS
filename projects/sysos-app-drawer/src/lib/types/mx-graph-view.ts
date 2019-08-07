/**
 * Extends <mxEventSource> to implement a view for a graph. This class is in
 * charge of computing the absolute coordinates for the relative child
 * geometries, the points for perimeters and edge styles and keeping them
 * cached in <mxCellStates> for faster retrieval. The states are updated
 * whenever the model or the view state (translate, scale) changes. The scale
 * and translate are honoured in the bounds.
 *
 * Event: mxEvent.UNDO
 *
 * Fires after the root was changed in <setCurrentRoot>. The <code>edit</code>
 * property contains the <mxUndoableEdit> which contains the
 * <mxCurrentRootChange>.
 *
 * Event: mxEvent.SCALE_AND_TRANSLATE
 *
 * Fires after the scale and translate have been changed in <scaleAndTranslate>.
 * The <code>scale</code>, <code>previousScale</code>, <code>translate</code>
 * and <code>previousTranslate</code> properties contain the new and previous
 * scale and translate, respectively.
 *
 * Event: mxEvent.SCALE
 *
 * Fires after the scale was changed in <setScale>. The <code>scale</code> and
 * <code>previousScale</code> properties contain the new and previous scale.
 *
 * Event: mxEvent.TRANSLATE
 *
 * Fires after the translate was changed in <setTranslate>. The
 * <code>translate</code> and <code>previousTranslate</code> properties contain
 * the new and previous value for translate.
 *
 * Event: mxEvent.DOWN and mxEvent.UP
 *
 * Fire if the current root is changed by executing an <mxCurrentRootChange>.
 * The event name depends on the location of the root in the cell hierarchy
 * with respect to the current root. The <code>root</code> and
 * <code>previous</code> properties contain the new and previous root,
 * respectively.
 */
import {mxEventSource} from "./mx-event-source";
import {mxPoint} from "./mx-point";
import {mxGraph} from "./mx-graph";
import {mxCell} from "./mx-cell";
import {mxRectangle} from "./mx-rectangle";
import {mxDictionary} from "./mx-dictionary";
import {mxCellState} from "./mx-cell-state";
import {mxRectangleShape} from "./mx-rectangle-shape";

export interface mxGraphView extends mxEventSource {
  /**
   *
   */
  EMPTY_POINT: mxPoint;
  /**
   * Specifies the resource key for the status message after a long operation.
   * If the resource for this key does not exist then the value is used as
   * the status message. Default is 'done'.
   */
  doneResource: string;
  /**
   * Specifies the resource key for the status message while the document is
   * being updated. If the resource for this key does not exist then the
   * value is used as the status message. Default is 'updatingDocument'.
   */
  updatingDocumentResource: string;
  /**
   * Specifies if string values in cell styles should be evaluated using
   * <mxUtils.eval>. This will only be used if the string values can't be mapped
   * to objects using <mxStyleRegistry>. Default is false. NOTE: Enabling this
   * switch carries a possible security risk.
   */
  allowEval: boolean;
  /**
   * Specifies if a gesture should be captured when it goes outside of the
   * graph container. Default is true.
   */
  captureDocumentGesture: boolean;
  /**
   * Specifies if the <canvas> should be hidden while rendering in IE8 standards
   * mode and quirks mode. This will significantly improve rendering performance.
   * Default is true.
   */
  optimizeVmlReflows: boolean;
  /**
   * Specifies if shapes should be created, updated and destroyed using the
   * methods of <mxCellRenderer> in <graph>. Default is true.
   */
  rendering: boolean;
  /**
   * Reference to the enclosing <mxGraph>.
   */
  graph: mxGraph;
  /**
   * <mxCell> that acts as the root of the displayed cell hierarchy.
   */
  currentRoot: mxCell;
  /**
   * <mxRectangle> that caches the scales, translated bounds of the current view.
   */
  graphBounds: mxRectangle;
  /**
   * Specifies the scale. Default is 1 (100%).
   */
  scale: number;
  /**
   * <mxPoint> that specifies the current translation. Default is a new
   * empty <mxPoint>.
   */
  translate: mxPoint;
  /**
   * <mxDictionary> that maps from cell IDs to <mxCellStates>.
   */
  states: mxDictionary;
  /**
   * Specifies if the style should be updated in each validation step. If this
   * is false then the style is only updated if the state is created or if the
   * style of the cell was changed. Default is false.
   */
  updateStyle: boolean;
  /**
   * During validation, this contains the last DOM node that was processed.
   */
  lastNode: HTMLElement;
  /**
   * During validation, this contains the last HTML DOM node that was processed.
   */
  lastHtmlNode: HTMLElement;
  /**
   * During validation, this contains the last edge's DOM node that was processed.
   */
  lastForegroundNode: HTMLElement;
  /**
   * During validation, this contains the last edge HTML DOM node that was processed.
   */
  lastForegroundHtmlNode: HTMLElement;
  /**
   * Implicit variable definitions
   */
  canvas: HTMLCanvasElement;
  placeholder: HTMLElement;
  textDiv: HTMLElement;
  backgroundPane: HTMLElement;
  drawPane: SVGElement;
  overlayPane: HTMLElement;
  decoratorPane: HTMLElement;
  /**
   * Constructs a new view for the given <mxGraph>.
   *
   * @param graph - Reference to the enclosing <mxGraph>.
   */
  constructor(graph: mxGraph);
  /**
   * Returns <graphBounds>.
   */
  getGraphBounds(): mxRectangle;
  /**
   * Sets <graphBounds>.
   */
  setGraphBounds(value: mxRectangle): void;
  /**
   * Returns the union of all <mxCellStates> for the given array of <mxCells>.
   *
   * @param cells - Array of <mxCells> whose bounds should be returned.
   */
  getBounds(cells: mxCell[]): mxRectangle;
  /**
   * Sets and returns the current root and fires an <undo> event before
   * calling <mxGraph.sizeDidChange>.
   *
   * @param root - <mxCell> that specifies the root of the displayed cell hierarchy.
   */
  setCurrentRoot(root: any): any;
  /**
   * Sets the scale and translation and fires a <scale> and <translate> event
   * before calling <revalidate> followed by <mxGraph.sizeDidChange>.
   *
   * @param scale - Decimal value that specifies the new scale (1 is 100%).
   * @param dx - X-coordinate of the translation.
   * @param dy - Y-coordinate of the translation.
   */
  scaleAndTranslate(scale: any, dx: any, dy: any): void;
  /**
   * Returns the <scale>.
   */
  getScale(): number;
  /**
   * Sets the scale and fires a <scale> event before calling <revalidate> followed
   * by <mxGraph.sizeDidChange>.
   *
   * @param value - Decimal value that specifies the new scale (1 is 100%).
   */
  setScale(value: any): void;
  /**
   * Returns the <translate>.
   */
  getTranslate(): mxPoint;
  /**
   * Sets the translation and fires a <translate> event before calling
   * <revalidate> followed by <mxGraph.sizeDidChange>. The translation is the
   * negative of the origin.
   *
   * @param dx - X-coordinate of the translation.
   * @param dy - Y-coordinate of the translation.
   */
  setTranslate(dx: number, dy: number): void;
  /**
   * Clears the view if <currentRoot> is not null and revalidates.
   */
  refresh(): void;
  /**
   * Revalidates the complete view with all cell states.
   */
  revalidate(): void;
  /**
   * Removes the state of the given cell and all descendants if the given
   * cell is not the current root.
   *
   * @param cell - Optional <mxCell> for which the state should be removed. Default
   * is the root of the model.
   * @param force - Boolean indicating if the current root should be ignored for
   * recursion.
   * @param recurse
   */
  clear(cell?: mxCell, force?: boolean, recurse?: boolean): void;
  /**
   * Invalidates the state of the given cell, all its descendants and
   * connected edges.
   *
   * @param cell - Optional <mxCell> to be invalidated. Default is the root of the
   * model.
   * @param recurse
   * @param includeEdges
   */
  invalidate(cell?: mxCell, recurse?: boolean, includeEdges?: boolean): void;
  /**
   * Calls <validateCell> and <validateCellState> and updates the <graphBounds>
   * using <getBoundingBox>. Finally the background is validated using
   * <validateBackground>.
   *
   * @param cell - Optional <mxCell> to be used as the root of the validation.
   * Default is <currentRoot> or the root of the model.
   */
  validate(cell?: mxCell): void;
  /**
   * Returns the bounds for an empty graph. This returns a rectangle at
   * <translate> with the size of 0 x 0.
   */
  getEmptyBounds(): mxRectangle;
  /**
   * Returns the bounding box of the shape and the label for the given
   * <mxCellState> and its children if recurse is true.
   *
   * @param state - <mxCellState> whose bounding box should be returned.
   * @param recurse - Optional boolean indicating if the children should be included.
   * Default is true.
   */
  getBoundingBox(state: mxCellState, recurse?: boolean): mxRectangle;
  /**
   * Creates and returns the shape used as the background page.
   *
   * bounds - <mxRectangle> that represents the bounds of the shape.
   */
  createBackgroundPageShape(bounds: any): mxRectangleShape;
  /**
   * Calls <validateBackgroundImage> and <validateBackgroundPage>.
   */
  validateBackground(): void;
  /**
   * Validates the background image.
   */
  validateBackgroundImage(): void;
  /**
   * Validates the background page.
   */
  validateBackgroundPage(): void;
  /**
   * Returns the bounds for the background page.
   */
  getBackgroundPageBounds(): mxRectangle;
  /**
   * Updates the bounds and redraws the background image.
   *
   * Example:
   *
   * If the background image should not be scaled, this can be replaced with
   * the following.
   *
   * (code)
   * mxGraphView.prototype.redrawBackground = function(backgroundImage, bg)
   * {
   *   backgroundImage.bounds.x = this.translate.x;
   *   backgroundImage.bounds.y = this.translate.y;
   *   backgroundImage.bounds.width = bg.width;
   *   backgroundImage.bounds.height = bg.height;
   *
   *   backgroundImage.redraw();
   * };
   * (end)
   *
   * @param backgroundImage - <mxImageShape> that represents the background image.
   * @param bg - <mxImage> that specifies the image and its dimensions.
   */
  redrawBackgroundImage(backgroundImage: any, bg: any): void;
  /**
   * Recursively creates the cell state for the given cell if visible is true and
   * the given cell is visible. If the cell is not visible but the state exists
   * then it is removed using <removeState>.
   *
   * @param cell - <mxCell> whose <mxCellState> should be created.
   * @param visible - Optional boolean indicating if the cell should be visible. Default
   * is true.
   */
  validateCell(cell: mxCell, visible?: boolean): mxCell;
  /**
   * Validates and repaints the <mxCellState> for the given <mxCell>.
   *
   * @param cell - <mxCell> whose <mxCellState> should be validated.
   * @param recurse - Optional boolean indicating if the children of the cell should be
   * validated. Default is true.
   */
  validateCellState(cell: mxCell, recurse?: boolean): mxCellState;
  /**
   * Updates the given <mxCellState>.
   *
   * @param state - <mxCellState> to be updated.
   */
  updateCellState(state: mxCellState): void;
  /**
   * Returns true if the children of the given cell should not be visible in the
   * view. This implementation uses <mxGraph.isCellVisible> but it can be
   * overidden to use a separate condition.
   *
   * @param cell
   */
  isCellCollapsed(cell: any): boolean;
  /**
   * Validates the given cell state.
   *
   * @param state
   * @param geo
   */
  updateVertexState(state: any, geo: any): void;
  /**
   * Validates the given cell state.
   *
   * @param state
   * @param geo
   */
  updateEdgeState(state: any, geo: any): void;
  /**
   * Updates the absoluteOffset of the given vertex cell state. This takes
   * into account the label position styles.
   *
   * @param state - <mxCellState> whose absolute offset should be updated.
   */
  updateVertexLabelOffset(state: any): void;
  /**
   * Resets the current validation state.
   */
  resetValidationState(): void;
  /**
   * Invoked when a state has been processed in <validatePoints>. This is used
   * to update the order of the DOM nodes of the shape.
   *
   * @param state - <mxCellState> that represents the cell state.
   */
  stateValidated(state: any): void;
  /**
   * Sets the initial absolute terminal points in the given state before the edge
   * style is computed.
   *
   * @param edge - <mxCellState> whose initial terminal points should be updated.
   * @param source - <mxCellState> which represents the source terminal.
   * @param target - <mxCellState> which represents the target terminal.
   */
  updateFixedTerminalPoints(edge: any, source: any, target: any): void;
  /**
   * Sets the fixed source or target terminal point on the given edge.
   *
   * @param edge - <mxCellState> whose terminal point should be updated.
   * @param terminal - <mxCellState> which represents the actual terminal.
   * @param source - Boolean that specifies if the terminal is the source.
   * @param constraint - <mxConnectionConstraint> that specifies the connection.
   */
  updateFixedTerminalPoint(edge: any, terminal: any, source: any, constraint: any): void;
  /**
   * Returns the fixed source or target terminal point for the given edge.
   *
   * @param edge - <mxCellState> whose terminal point should be returned.
   * @param terminal - <mxCellState> which represents the actual terminal.
   * @param source - Boolean that specifies if the terminal is the source.
   * @param constraint - <mxConnectionConstraint> that specifies the connection.
   */
  getFixedTerminalPoint(edge: any, terminal: any, source: any, constraint: any): any;
  /**
   * Updates the bounds of the given cell state to reflect the bounds of the stencil
   * if it has a fixed aspect and returns the previous bounds as an <mxRectangle> if
   * the bounds have been modified or null otherwise.
   *
   * @param state - <mxCellState> whose bounds should be updated.
   */
  updateBoundsFromStencil(state: any): any;
  /**
   * Updates the absolute points in the given state using the specified array
   * of <mxPoints> as the relative points.
   *
   * @param edge - <mxCellState> whose absolute points should be updated.
   * @param points - Array of <mxPoints> that constitute the relative points.
   * @param source - <mxCellState> that represents the source terminal.
   * @param target - <mxCellState> that represents the target terminal.
   */
  updatePoints(edge: any, points: any, source: any, target: any): void;
  /**
   * Transforms the given control point to an absolute point.
   *
   * @param state
   * @param pt
   */
  transformControlPoint(state: any, pt: any): mxPoint;
  /**
   * Returns true if the given edge should be routed with <mxGraph.defaultLoopStyle>
   * or the <mxConstants.STYLE_LOOP> defined for the given edge. This implementation
   * returns true if the given edge is a loop and does not
   *
   * @param edge
   * @param points
   * @param source
   * @param target
   */
  isLoopStyleEnabled(edge: mxCellState, points: any, source: any, target: any): boolean;
  /**
   * Returns the edge style function to be used to render the given edge state.
   *
   * @param edge
   * @param points
   * @param source
   * @param target
   */
  getEdgeStyle(edge: any, points?: any, source?: any, target?: any): any;
  /**
   * Updates the terminal points in the given state after the edge style was
   * computed for the edge.
   *
   * @param state - <mxCellState> whose terminal points should be updated.
   * @param source - <mxCellState> that represents the source terminal.
   * @param target - <mxCellState> that represents the target terminal.
   */
  updateFloatingTerminalPoints(state: any, source: any, target: any): void;
  /**
   * Updates the absolute terminal point in the given state for the given
   * start and end state, where start is the source if source is true.
   *
   * @param edge - <mxCellState> whose terminal point should be updated.
   * @param start - <mxCellState> for the terminal on "this" side of the edge.
   * @param end - <mxCellState> for the terminal on the other side of the edge.
   * @param source - Boolean indicating if start is the source terminal state.
   */
  updateFloatingTerminalPoint(edge: any, start: any, end: any, source: any): void;
  /**
   * Returns the floating terminal point for the given edge, start and end
   * state, where start is the source if source is true.
   *
   * @param edge - <mxCellState> whose terminal point should be returned.
   * @param start - <mxCellState> for the terminal on "this" side of the edge.
   * @param end - <mxCellState> for the terminal on the other side of the edge.
   * @param source - Boolean indicating if start is the source terminal state.
   */
  getFloatingTerminalPoint(edge: any, start: any, end: any, source: any): mxPoint;
  /**
   * Returns an <mxCellState> that represents the source or target terminal or
   * port for the given edge.
   *
   * @param state - <mxCellState> that represents the state of the edge.
   * @param terminal - <mxCellState> that represents the terminal.
   * @param source - Boolean indicating if the given terminal is the source terminal.
   */
  getTerminalPort(state: any, terminal: any, source: any): any;
  /**
   * Returns an <mxPoint> that defines the location of the intersection point between
   * the perimeter and the line between the center of the shape and the given point.
   *
   * @param terminal - <mxCellState> for the source or target terminal.
   * @param next - <mxPoint> that lies outside of the given terminal.
   * @param orthogonal - Boolean that specifies if the orthogonal projection onto
   * the perimeter should be returned. If this is false then the intersection
   * of the perimeter and the line between the next and the center point is
   * returned.
   * @param border - Optional border between the perimeter and the shape.
   */
  getPerimeterPoint(terminal: mxCellState, next: mxPoint, orthogonal: boolean, border?: number): mxPoint;
  /**
   * Returns the x-coordinate of the center point for automatic routing.
   */
  getRoutingCenterX(state: any): any;
  /**
   * Returns the y-coordinate of the center point for automatic routing.
   */
  getRoutingCenterY(state: any): any;
  /**
   * Returns the perimeter bounds for the given terminal, edge pair as an
   * <mxRectangle>.
   *
   * If you have a model where each terminal has a relative child that should
   * act as the graphical endpoint for a connection from/to the terminal, then
   * this method can be replaced as follows:
   *
   * (code)
   * var oldGetPerimeterBounds = mxGraphView.prototype.getPerimeterBounds;
   * mxGraphView.prototype.getPerimeterBounds = function(terminal, edge, isSource)
   * {
   *   var model = this.graph.getModel();
   *   var childCount = model.getChildCount(terminal.cell);
   *
   *   if (childCount > 0)
   *   {
   *     var child = model.getChildAt(terminal.cell, 0);
   *     var geo = model.getGeometry(child);
   *
   *     if (geo != null &&
   *         geo.relative)
   *     {
   *       var state = this.getState(child);
   *
   *       if (state != null)
   *       {
   *         terminal = state;
   *       }
   *     }
   *   }
   *
   *   return oldGetPerimeterBounds.apply(this, arguments);
   * };
   * (end)
   *
   * @param terminal - <mxCellState> that represents the terminal.
   * @param border - Number that adds a border between the shape and the perimeter.
   */
  getPerimeterBounds(terminal: mxCellState, border?: number): mxRectangle;
  /**
   * Returns the perimeter function for the given state.
   *
   * @param state
   */
  getPerimeterFunction(state: mxCellState): any;
  /**
   * Returns the nearest point in the list of absolute points or the center
   * of the opposite terminal.
   *
   * @param edge - <mxCellState> that represents the edge.
   * @param opposite - <mxCellState> that represents the opposite terminal.
   * @param source - Boolean indicating if the next point for the source or target
   */
  getNextPoint(edge: any, opposite: any, source: any): any;
  /**
   * Returns the nearest ancestor terminal that is visible. The edge appears
   * to be connected to this terminal on the display. The result of this method
   * is cached in <mxCellState.getVisibleTerminalState>.
   *
   * @param edge - <mxCell> whose visible terminal should be returned.
   * @param source - Boolean that specifies if the source or target terminal
   * should be returned.
   */
  getVisibleTerminal(edge: any, source: any): mxCell;
  /**
   * Updates the given state using the bounding box of t
   * he absolute points.
   * Also updates <mxCellState.terminalDistance>, <mxCellState.length> and
   * <mxCellState.segments>.
   *
   * @param state - <mxCellState> whose bounds should be updated.
   */
  updateEdgeBounds(state: any): void;
  /**
   * Returns the absolute point on the edge for the given relative
   * <mxGeometry> as an <mxPoint>. The edge is represented by the given
   * <mxCellState>.
   *
   * @param state - <mxCellState> that represents the state of the parent edge.
   * @param geometry - <mxGeometry> that represents the relative location.
   */
  getPoint(state: any, geometry?: any): mxPoint;
  /**
   * Gets the relative point that describes the given, absolute label
   * position for the given edge state.
   *
   * @param edgeState - <mxCellState> that represents the state of the parent edge.
   * @param x - Specifies the x-coordinate of the absolute label location.
   * @param y - Specifies the y-coordinate of the absolute label location.
   */
  getRelativePoint(edgeState: any, x: any, y: any): mxPoint;
  /**
   * Updates <mxCellState.absoluteOffset> for the given state. The absolute
   * offset is normally used for the position of the edge label. Is is
   * calculated from the geometry as an absolute offset from the center
   * between the two endpoints if the geometry is absolute, or as the
   * relative distance between the center along the line and the absolute
   * orthogonal distance if the geometry is relative.
   *
   * @param state - <mxCellState> whose absolute offset should be updated.
   */
  updateEdgeLabelOffset(state: any): void;
  /**
   * Returns the <mxCellState> for the given cell. If create is true, then
   * the state is created if it does not yet exist.
   *
   * @param cell - <mxCell> for which the <mxCellState> should be returned.
   * @param create - Optional boolean indicating if a new state should be created
   * if it does not yet exist. Default is false.
   */
  getState(cell: mxCell, create?: boolean): mxCellState;
  /**
   * Returns <rendering>.
   */
  isRendering(): boolean;
  /**
   * Sets <rendering>.
   *
   * @param value
   */
  setRendering(value: boolean): void;
  /**
   * Returns <allowEval>.
   */
  isAllowEval(): boolean;
  /**
   * Sets <allowEval>.
   *
   * @param value
   */
  setAllowEval(value: boolean): void;
  /**
   * Returns <states>.
   */
  getStates(): mxDictionary;
  /**
   * Sets <states>.
   *
   * @param value
   */
  setStates(value: mxDictionary): void;
  /**
   * Returns the <mxCellStates> for the given array of <mxCells>. The array
   * contains all states that are not null, that is, the returned array may
   * have less elements than the given array. If no argument is given, then
   * this returns <states>.
   *
   * @param cells
   */
  getCellStates(cells: mxCell[]): any[] | mxDictionary;
  /**
   * Removes and returns the <mxCellState> for the given cell.
   *
   * @param cell - <mxCell> for which the <mxCellState> should be removed.
   */
  removeState(cell: any): any;
  /**
   * Creates and returns an <mxCellState> for the given cell and initializes
   * it using <mxCellRenderer.initialize>.
   *
   * @param cell - <mxCell> for which a new <mxCellState> should be created.
   */
  createState(cell: any): mxCellState;
  /**
   * Returns the DOM node that contains the background-, draw- and
   * overlay- and decoratorpanes.
   */
  getCanvas(): HTMLCanvasElement;
  /**
   * Returns the DOM node that represents the background layer.
   */
  getBackgroundPane(): HTMLElement;
  /**
   * Returns the DOM node that represents the main drawing layer.
   */
  getDrawPane(): SVGElement;
  /**
   * Returns the DOM node that represents the layer above the drawing layer.
   */
  getOverlayPane(): HTMLElement;
  /**
   * Returns the DOM node that represents the topmost drawing layer.
   */
  getDecoratorPane(): HTMLElement;
  /**
   * Returns true if the event origin is one of the drawing panes or
   * containers of the view.
   */
  isContainerEvent(evt: any): boolean;
  /**
   * Returns true if the event origin is one of the scrollbars of the
   * container in IE. Such events are ignored.
   */
  isScrollEvent(evt: any): boolean;
  /**
   * Initializes the graph event dispatch loop for the specified container
   * and invokes <create> to create the required DOM nodes for the display.
   */
  init(): void;
  /**
   * Installs the required listeners in the container.
   */
  installListeners(): void;
  /**
   * Creates the DOM nodes for the HTML display.
   */
  createHtml(): void;
  /**
   * Updates the size of the HTML canvas.
   */
  updateHtmlCanvasSize(width: any, height: any): void;
  /**
   * Creates and returns a drawing pane in HTML (DIV).
   */
  createHtmlPane(width: any, height: any): HTMLElement;
  /**
   * Creates the DOM nodes for the VML display.
   */
  createVml(): void;
  /**
   * Creates a drawing pane in VML (group).
   */
  createVmlPane(width: any, height: any): HTMLElement;
  /**
   * Creates and returns the DOM nodes for the SVG display.
   */
  createSvg(): void;
  /**
   * Updates the style of the container after installing the SVG DOM elements.
   */
  updateContainerStyle(container: any): void;
  /**
   * Destroys the view and all its resources.
   */
  destroy(): void;
}
