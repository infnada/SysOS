/**
 * Graph event handler that reconnects edges and modifies control points and
 * the edge label location. Uses <mxTerminalMarker> for finding and
 * highlighting new source and target vertices. This handler is automatically
 * created in <mxGraph.createHandler> for each selected edge.
 *
 * To enable adding/removing control points, the following code can be used:
 *
 * (code)
 * mxEdgeHandler.prototype.addEnabled = true;
 * mxEdgeHandler.prototype.removeEnabled = true;
 * (end)
 *
 * Note: This experimental feature is not recommended for production use.
 *
 * Constructor: mxEdgeHandler
 *
 * Constructs an edge handler for the specified <mxCellState>.
 *
 * Parameters:
 *
 * state - <mxCellState> of the cell to be handled.
 */
import {mxRectangleShape} from './mx-rectangle-shape';
import {mxPoint} from './mx-point';

export interface mxEdgeHandler {
  (state: any): void;
  /**
   * Initializes the shapes required for this edge handler.
   */
  init(): void;
  /**
   * Returns an array of custom handles. This implementation returns null.
   */
  createCustomHandles(): any;
  /**
   * Returns true if virtual bends should be added. This returns true if
   * <virtualBendsEnabled> is true and the current style allows and
   * renders custom waypoints.
   */
  isVirtualBendsEnabled(evt: any): boolean;
  /**
   * Returns true if the given event is a trigger to add a new point. This
   * implementation returns true if shift is pressed.
   */
  isAddPointEvent(evt: any): boolean;
  /**
   * Returns true if the given event is a trigger to remove a point. This
   * implementation returns true if shift is pressed.
   */
  isRemovePointEvent(evt: any): boolean;
  /**
   * Returns the list of points that defines the selection stroke.
   */
  getSelectionPoints(state: any): any;
  /**
   * Creates the shape used to draw the selection border.
   */
  createParentHighlightShape(bounds: any): mxRectangleShape;
  /**
   * Creates the shape used to draw the selection border.
   */
  createSelectionShape(points: any): any;
  /**
   * Returns <mxConstants.EDGE_SELECTION_COLOR>.
   */
  getSelectionColor(): string;
  /**
   * Returns <mxConstants.EDGE_SELECTION_STROKEWIDTH>.
   */
  getSelectionStrokeWidth(): number;
  /**
   * Returns <mxConstants.EDGE_SELECTION_DASHED>.
   */
  isSelectionDashed(): boolean;
  /**
   * Returns true if the given cell is connectable. This is a hook to
   * disable floating connections. This implementation returns true.
   */
  isConnectableCell(cell: any): boolean;
  /**
   * Creates and returns the <mxCellMarker> used in <marker>.
   */
  getCellAt(x: any, y: any): any;
  /**
   * Creates and returns the <mxCellMarker> used in <marker>.
   */
  createMarker(): any;
  /**
   * Returns the error message or an empty string if the connection for the
   * given source, target pair is not valid. Otherwise it returns null. This
   * implementation uses <mxGraph.getEdgeValidationError>.
   *
   * Parameters:
   *
   * source - <mxCell> that represents the source terminal.
   * target - <mxCell> that represents the target terminal.
   */
  validateConnection(source: any, target: any): any;
  /**
   * Creates and returns the bends used for modifying the edge. This is
   * typically an array of <mxRectangleShapes>.
   */
  createBends(): any[];
  /**
   * Creates and returns the bends used for modifying the edge. This is
   * typically an array of <mxRectangleShapes>.
   */
  createVirtualBends(): any[];
  /**
   * Creates the shape used to display the given bend.
   */
  isHandleEnabled(index: any): boolean;
  /**
   * Returns true if the handle at the given index is visible.
   */
  isHandleVisible(index: any): boolean;
  /**
   * Creates the shape used to display the given bend. Note that the index may be
   * null for special cases, such as when called from
   * <mxElbowEdgeHandler.createVirtualBend>. Only images and rectangles should be
   * returned if support for HTML labels with not foreign objects is required.
   * Index if null for virtual handles.
   */
  createHandleShape(index: any): any;
  /**
   * Creates the shape used to display the the label handle.
   */
  createLabelHandleShape(): any;
  /**
   * Helper method to initialize the given bend.
   *
   * Parameters:
   *
   * bend - <mxShape> that represents the bend to be initialized.
   */
  initBend(bend: any, dblClick: any): void;
  /**
   * Returns the index of the handle for the given event.
   */
  getHandleForEvent(me: any): any;
  /**
   * Returns true if the given event allows virtual bends to be added. This
   * implementation returns true.
   */
  isAddVirtualBendEvent(me: any): boolean;
  /**
   * Returns true if the given event allows custom handles to be changed. This
   * implementation returns true.
   */
  isCustomHandleEvent(me: any): boolean;
  /**
   * Handles the event by checking if a special element of the handler
   * was clicked, in which case the index parameter is non-null. The
   * indices may be one of <LABEL_HANDLE> or the number of the respective
   * control point. The source and target points are used for reconnecting
   * the edge.
   */
  mouseDown(sender: any, me: any): void;
  /**
   * Starts the handling of the mouse gesture.
   */
  start(x: any, y: any, index: any): void;
  /**
   * Returns a clone of the current preview state for the given point and terminal.
   */
  clonePreviewState(point: any, terminal: any): any;
  /**
   * Returns the tolerance for the guides. Default value is
   * gridSize * scale / 2.
   */
  getSnapToTerminalTolerance(): number;
  /**
   * Hook for subclassers do show details while the handler is active.
   */
  updateHint(me: any, point: any): void;
  /**
   * Hooks for subclassers to hide details when the handler gets inactive.
   */
  removeHint(): void;
  /**
   * Hook for rounding the unscaled width or height. This uses Math.round.
   */
  roundLength(length: any): number;
  /**
   * Returns true if <snapToTerminals> is true and if alt is not pressed.
   */
  isSnapToTerminalsEvent(me: any): boolean;
  /**
   * Returns the point for the given event.
   */
  getPointForEvent(me: any): mxPoint;
  /**
   * Updates the given preview state taking into account the state of the constraint handler.
   */
  getPreviewTerminalState(me: any): any;
  /**
   * Updates the given preview state taking into account the state of the constraint handler.
   *
   * Parameters:
   *
   * pt - <mxPoint> that contains the current pointer position.
   * me - Optional <mxMouseEvent> that contains the current event.
   */
  getPreviewPoints(pt: any, me: any): any;
  /**
   * Returns true if <outlineConnect> is true and the source of the event is the outline shape
   * or shift is pressed.
   */
  isOutlineConnectEvent(me: any): any;
  /**
   * Updates the given preview state taking into account the state of the constraint handler.
   */
  updatePreviewState(edge: any, point: any, terminalState: any, me: any, outline: any): void;
  /**
   * Handles the event by updating the preview.
   */
  mouseMove(sender: any, me: any): void;
  /**
   * Handles the event to applying the previewed changes on the edge by
   * using <moveLabel>, <connect> or <changePoints>.
   */
  mouseUp(sender: any, me: any): void;
  /**
   * Resets the state of this handler.
   */
  reset(): void;
  /**
   * Sets the color of the preview to the given value.
   */
  setPreviewColor(color: any): void;
  /**
   * Converts the given point in-place from screen to unscaled, untranslated
   * graph coordinates and applies the grid. Returns the given, modified
   * point instance.
   *
   * Parameters:
   *
   * point - <mxPoint> to be converted.
   * gridEnabled - Boolean that specifies if the grid should be applied.
   */
  convertPoint(point: any, gridEnabled: any): any;
  /**
   * Changes the coordinates for the label of the given edge.
   *
   * Parameters:
   *
   * edge - <mxCell> that represents the edge.
   * x - Integer that specifies the x-coordinate of the new location.
   * y - Integer that specifies the y-coordinate of the new location.
   */
  moveLabel(edgeState: any, x: any, y: any): void;
  /**
   * Changes the terminal or terminal point of the given edge in the graph
   * model.
   *
   * Parameters:
   *
   * edge - <mxCell> that represents the edge to be reconnected.
   * terminal - <mxCell> that represents the new terminal.
   * isSource - Boolean indicating if the new terminal is the source or
   * target terminal.
   * isClone - Boolean indicating if the new connection should be a clone of
   * the old edge.
   * me - <mxMouseEvent> that contains the mouse up event.
   */
  connect(edge: any, terminal: any, isSource: any, isClone: any, me: any): any;
  /**
   * Changes the terminal point of the given edge.
   */
  changeTerminalPoint(edge: any, point: any, isSource: any, clone: any): any;
  /**
   * Changes the control points of the given edge in the graph model.
   */
  changePoints(edge: any, points: any, clone: any): any;
  /**
   * Adds a control point for the given state and event.
   */
  addPoint(state: any, evt: any): void;
  /**
   * Adds a control point at the given point.
   */
  addPointAt(state: any, x: any, y: any): void;
  /**
   * Removes the control point at the given index from the given state.
   */
  removePoint(state: any, index: any): void;
  /**
   * Returns the fillcolor for the handle at the given index.
   */
  getHandleFillColor(index: any): string;
  /**
   * Redraws the preview, and the bends- and label control points.
   */
  redraw(): void;
  /**
   * Redraws the handles.
   */
  redrawHandles(): void;
  /**
   * Shortcut to <hideSizers>.
   */
  setHandlesVisible(visible: any): void;
  /**
   * Updates and redraws the inner bends.
   *
   * Parameters:
   *
   * p0 - <mxPoint> that represents the location of the first point.
   * pe - <mxPoint> that represents the location of the last point.
   */
  redrawInnerBends(p0: any, pe: any): void;
  /**
   * Checks if the label handle intersects the given bounds and moves it if it
   * intersects.
   */
  checkLabelHandle(b: any): void;
  /**
   * Redraws the preview.
   */
  drawPreview(): void;
  /**
   * Refreshes the bends of this handler.
   */
  refresh(): void;
  /**
   * Destroys all elements in <bends>.
   */
  destroyBends(bends: any): void;
  /**
   * Destroys the handler and all its resources and DOM nodes. This does
   * normally not need to be called as handlers are destroyed automatically
   * when the corresponding cell is deselected.
   */
  destroy(): void;
}
