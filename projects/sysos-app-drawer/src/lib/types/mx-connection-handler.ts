/**
 * Graph event handler that creates new connections. Uses <mxTerminalMarker>
 * for finding and highlighting the source and target vertices and
 * <factoryMethod> to create the edge instance. This handler is built-into
 * <mxGraph.connectionHandler> and enabled using <mxGraph.setConnectable>.
 *
 * Example:
 *
 * (code)
 * new mxConnectionHandler(graph, function(source, target, style)
 * {
 *   edge = new mxCell('', new mxGeometry());
 *   edge.setEdge(true);
 *   edge.setStyle(style);
 *   edge.geometry.relative = true;
 *   return edge;
 * });
 * (end)
 *
 * Here is an alternative solution that just sets a specific user object for
 * new edges by overriding <insertEdge>.
 *
 * (code)
 * mxConnectionHandlerInsertEdge = mxConnectionHandler.prototype.insertEdge;
 * mxConnectionHandler.prototype.insertEdge = function(parent, id, value, source, target, style)
 * {
 *   value = 'Test';
 *
 *   return mxConnectionHandlerInsertEdge.apply(this, arguments);
 * };
 * (end)
 *
 * Using images to trigger connections:
 *
 * This handler uses mxTerminalMarker to find the source and target cell for
 * the new connection and creates a new edge using <connect>. The new edge is
 * created using <createEdge> which in turn uses <factoryMethod> or creates a
 * new default edge.
 *
 * The handler uses a "highlight-paradigm" for indicating if a cell is being
 * used as a source or target terminal, as seen in other diagramming products.
 * In order to allow both, moving and connecting cells at the same time,
 * <mxConstants.DEFAULT_HOTSPOT> is used in the handler to determine the hotspot
 * of a cell, that is, the region of the cell which is used to trigger a new
 * connection. The constant is a value between 0 and 1 that specifies the
 * amount of the width and height around the center to be used for the hotspot
 * of a cell and its default value is 0.5. In addition,
 * <mxConstants.MIN_HOTSPOT_SIZE> defines the minimum number of pixels for the
 * width and height of the hotspot.
 *
 * This solution, while standards compliant, may be somewhat confusing because
 * there is no visual indicator for the hotspot and the highlight is seen to
 * switch on and off while the mouse is being moved in and out. Furthermore,
 * this paradigm does not allow to create different connections depending on
 * the highlighted hotspot as there is only one hotspot per cell and it
 * normally does not allow cells to be moved and connected at the same time as
 * there is no clear indication of the connectable area of the cell.
 *
 * To come across these issues, the handle has an additional <createIcons> hook
 * with a default implementation that allows to create one icon to be used to
 * trigger new connections. If this icon is specified, then new connections can
 * only be created if the image is clicked while the cell is being highlighted.
 * The <createIcons> hook may be overridden to create more than one
 * <mxImageShape> for creating new connections, but the default implementation
 * supports one image and is used as follows:
 *
 * In order to display the "connect image" whenever the mouse is over the cell,
 * an DEFAULT_HOTSPOT of 1 should be used:
 *
 * (code)
 * mxConstants.DEFAULT_HOTSPOT = 1;
 * (end)
 *
 * In order to avoid confusion with the highlighting, the highlight color
 * should not be used with a connect image:
 *
 * (code)
 * mxConstants.HIGHLIGHT_COLOR = null;
 * (end)
 *
 * To install the image, the connectImage field of the mxConnectionHandler must
 * be assigned a new <mxImage> instance:
 *
 * (code)
 * mxConnectionHandler.prototype.connectImage = new mxImage('images/green-dot.gif', 14, 14);
 * (end)
 *
 * This will use the green-dot.gif with a width and height of 14 pixels as the
 * image to trigger new connections. In createIcons the icon field of the
 * handler will be set in order to remember the icon that has been clicked for
 * creating the new connection. This field will be available under selectedIcon
 * in the connect method, which may be overridden to take the icon that
 * triggered the new connection into account. This is useful if more than one
 * icon may be used to create a connection.
 *
 * Group: Events
 *
 * Event: mxEvent.START
 *
 * Fires when a new connection is being created by the user. The <code>state</code>
 * property contains the state of the source cell.
 *
 * Event: mxEvent.CONNECT
 *
 * Fires between begin- and endUpdate in <connect>. The <code>cell</code>
 * property contains the inserted edge, the <code>event</code> and <code>target</code>
 * properties contain the respective arguments that were passed to <connect> (where
 * target corresponds to the dropTarget argument). Finally, the <code>terminal</code>
 * property corresponds to the target argument in <connect> or the clone of the source
 * terminal if <createTarget> is enabled.
 *
 * Note that the target is the cell under the mouse where the mouse button was released.
 * Depending on the logic in the handler, this doesn't necessarily have to be the target
 * of the inserted edge. To print the source, target or any optional ports IDs that the
 * edge is connected to, the following code can be used. To get more details about the
 * actual connection point, <mxGraph.getConnectionConstraint> can be used. To resolve
 * the port IDs, use <mxGraphModel.getCell>.
 *
 * (code)
 * graph.connectionHandler.addListener(mxEvent.CONNECT, function(sender, evt)
 * {
 *   var edge = evt.getProperty('cell');
 *   var source = graph.getModel().getTerminal(edge, true);
 *   var target = graph.getModel().getTerminal(edge, false);
 *
 *   var style = graph.getCellStyle(edge);
 *   var sourcePortId = style[mxConstants.STYLE_SOURCE_PORT];
 *   var targetPortId = style[mxConstants.STYLE_TARGET_PORT];
 *
 *   mxLog.show();
 *   mxLog.debug('connect', edge, source.id, target.id, sourcePortId, targetPortId);
 * });
 * (end)
 *
 * Event: mxEvent.RESET
 *
 * Fires when the <reset> method is invoked.
 */
import {mxEventSource} from "./mx-event-source";
import {mxPoint} from "./mx-point";

export interface mxConnectionHandler extends mxEventSource {
  /**
   * Reference to the enclosing <mxGraph>.
   */
  graph: any;
  /**
   * Function that is used for creating new edges. The function takes the
   * source and target <mxCell> as the first and second argument and returns
   * a new <mxCell> that represents the edge. This is used in <createEdge>.
   */
  factoryMethod: boolean;
  /**
   * Specifies if icons should be displayed inside the graph container instead
   * of the overlay pane. This is used for HTML labels on vertices which hide
   * the connect icon. This has precendence over <moveIconBack> when set
   * to true. Default is false.
   */
  moveIconFront: boolean;
  /**
   * Specifies if icons should be moved to the back of the overlay pane. This can
   * be set to true if the icons of the connection handler conflict with other
   * handles, such as the vertex label move handle. Default is false.
   */
  moveIconBack: boolean;
  /**
   * <mxImage> that is used to trigger the creation of a new connection. This
   * is used in <createIcons>. Default is null.
   */
  connectImage: any;
  /**
   * Specifies if the connect icon should be centered on the target state
   * while connections are being previewed. Default is false.
   */
  targetConnectImage: boolean;
  /**
   * Specifies if events are handled. Default is true.
   */
  enabled: boolean;
  /**
   * Specifies if new edges should be selected. Default is true.
   */
  select: boolean;
  /**
   * Specifies if <createTargetVertex> should be called if no target was under the
   * mouse for the new connection. Setting this to true means the connection
   * will be drawn as valid if no target is under the mouse, and
   * <createTargetVertex> will be called before the connection is created between
   * the source cell and the newly created vertex in <createTargetVertex>, which
   * can be overridden to create a new target. Default is false.
   */
  createTarget: boolean;
  /**
   * Holds the <mxTerminalMarker> used for finding source and target cells.
   */
  marker: any;
  /**
   * Holds the <mxConstraintHandler> used for drawing and highlighting
   * constraints.
   */
  constraintHandler: any;
  /**
   * Holds the current validation error while connections are being created.
   */
  error: any;
  /**
   * Specifies if single clicks should add waypoints on the new edge. Default is
   * false.
   */
  waypointsEnabled: boolean;
  /**
   * Specifies if the connection handler should ignore the state of the mouse
   * button when highlighting the source. Default is false, that is, the
   * handler only highlights the source if no button is being pressed.
   */
  ignoreMouseDown: boolean;
  /**
   * Holds the <mxPoint> where the mouseDown took place while the handler is
   * active.
   */
  first: any;
  /**
   * Holds the offset for connect icons during connection preview.
   * Default is mxPoint(0, <mxConstants.TOOLTIP_VERTICAL_OFFSET>).
   * Note that placing the icon under the mouse pointer with an
   * offset of (0,0) will affect hit detection.
   */
  connectIconOffset: mxPoint;
  /**
   * Optional <mxCellState> that represents the preview edge while the
   * handler is active. This is created in <createEdgeState>.
   */
  edgeState: any;
  /**
   * Holds the change event listener for later removal.
   */
  changeHandler: any;
  /**
   * Holds the drill event listener for later removal.
   */
  drillHandler: any;
  /**
   * Counts the number of mouseDown events since the start. The initial mouse
   * down event counts as 1.
   */
  mouseDownCounter: number;
  /**
   * Switch to enable moving the preview away from the mousepointer. This is required in browsers
   * where the preview cannot be made transparent to events and if the built-in hit detection on
   * the HTML elements in the page should be used. Default is the value of <mxClient.IS_VML>.
   */
  movePreviewAway: boolean;
  /**
   * Specifies if connections to the outline of a highlighted target should be
   * enabled. This will allow to place the connection point along the outline of
   * the highlighted target. Default is false.
   */
  outlineConnect: boolean;
  /**
   * Specifies if the actual shape of the edge state should be used for the preview.
   * Default is false. (Ignored if no edge state is created in <createEdgeState>.)
   */
  livePreview: boolean;
  /**
   * Specifies the cursor to be used while the handler is active. Default is null.
   */
  cursor: any;
  /**
   * Specifies if new edges should be inserted before the source vertex in the
   * cell hierarchy. Default is false for backwards compatibility.
   */
  insertBeforeSource: boolean;
  /**
   * Implicit variable declarations
   */
  previous: any;
  escapeHandler: any;
  /**
   * Constructs an event handler that connects vertices using the specified
   * factory method to create the new edges. Modify
   * <mxConstants.ACTIVE_REGION> to setup the region on a cell which triggers
   * the creation of a new connection or use connect icons as explained
   * above.
   *
   * @param graph - Reference to the enclosing <mxGraph>.
   * @param factoryMethod - Optional function to create the edge. The function takes
   * the source and target <mxCell> as the first and second argument and an
   * optional cell style from the preview as the third argument. It returns
   * the <mxCell> that represents the new edge.
   */
  constructor(graph?: any, factoryMethod?: any);
  /**
   * Returns true if events are handled. This implementation
   * returns <enabled>.
   */
  isEnabled(): boolean;
  /**
   * Enables or disables event handling. This implementation
   * updates <enabled>.
   *
   * Parameters:
   *
   * enabled - Boolean that specifies the new enabled state.
   */
  setEnabled(enabled: any): void;
  /**
   * Returns <insertBeforeSource> for non-loops and false for loops.
   *
   * Parameters:
   *
   * edge - <mxCell> that represents the edge to be inserted.
   * source - <mxCell> that represents the source terminal.
   * target - <mxCell> that represents the target terminal.
   * evt - Mousedown event of the connect gesture.
   * dropTarget - <mxCell> that represents the cell under the mouse when it was
   * released.
   */
  isInsertBefore(edge: any, source: any, target: any, evt: any, dropTarget: any): boolean;
  /**
   * Returns <createTarget>.
   *
   * Parameters:
   *
   * evt - Current active native pointer event.
   */
  isCreateTarget(evt: any): boolean;
  /**
   * Sets <createTarget>.
   */
  setCreateTarget(value: any): void;
  /**
   * Creates the preview shape for new connections.
   */
  createShape(): any;
  /**
   * Initializes the shapes required for this connection handler. This should
   * be invoked if <mxGraph.container> is assigned after the connection
   * handler has been created.
   */
  init(): void;
  /**
   * Returns true if the given cell is connectable. This is a hook to
   * disable floating connections. This implementation returns true.
   */
  isConnectableCell(cell: any): boolean;
  /**
   * Creates and returns the <mxCellMarker> used in <marker>.
   */
  createMarker(): any;
  /**
   * Starts a new connection for the given state and coordinates.
   */
  start(state: any, x: any, y: any, edgeState: any): void;
  /**
   * Returns true if the source terminal has been clicked and a new
   * connection is currently being previewed.
   */
  isConnecting(): boolean;
  /**
   * Returns <mxGraph.isValidSource> for the given source terminal.
   *
   * Parameters:
   *
   * cell - <mxCell> that represents the source terminal.
   * me - <mxMouseEvent> that is associated with this call.
   */
  isValidSource(cell: any, me: any): any;
  /**
   * Returns true. The call to <mxGraph.isValidTarget> is implicit by calling
   * <mxGraph.getEdgeValidationError> in <validateConnection>. This is an
   * additional hook for disabling certain targets in this specific handler.
   *
   * Parameters:
   *
   * cell - <mxCell> that represents the target terminal.
   */
  isValidTarget(cell: any): boolean;
  /**
   * Returns the error message or an empty string if the connection for the
   * given source target pair is not valid. Otherwise it returns null. This
   * implementation uses <mxGraph.getEdgeValidationError>.
   *
   * Parameters:
   *
   * source - <mxCell> that represents the source terminal.
   * target - <mxCell> that represents the target terminal.
   */
  validateConnection(source: any, target: any): any;
  /**
   * Hook to return the <mxImage> used for the connection icon of the given
   * <mxCellState>. This implementation returns <connectImage>.
   *
   * Parameters:
   *
   * state - <mxCellState> whose connect image should be returned.
   */
  getConnectImage(state: any): any;
  /**
   * Returns true if the state has a HTML label in the graph's container, otherwise
   * it returns <moveIconFront>.
   *
   * Parameters:
   *
   * state - <mxCellState> whose connect icons should be returned.
   */
  isMoveIconToFrontForState(state: any): boolean;
  /**
   * Creates the array <mxImageShapes> that represent the connect icons for
   * the given <mxCellState>.
   *
   * Parameters:
   *
   * state - <mxCellState> whose connect icons should be returned.
   */
  createIcons(state: any): any[];
  /**
   * Redraws the given array of <mxImageShapes>.
   *
   * Parameters:
   *
   * icons - Optional array of <mxImageShapes> to be redrawn.
   */
  redrawIcons(icons: any, state: any): void;
  /**
   * Redraws the given array of <mxImageShapes>.
   *
   * Parameters:
   *
   * icons - Optional array of <mxImageShapes> to be redrawn.
   */
  getIconPosition(icon: any, state: any): mxPoint;
  /**
   * Destroys the connect icons and resets the respective state.
   */
  destroyIcons(): void;
  /**
   * Returns true if the given mouse down event should start this handler. The
   * This implementation returns true if the event does not force marquee
   * selection, and the currentConstraint and currentFocus of the
   * <constraintHandler> are not null, or <previous> and <error> are not null and
   * <icons> is null or <icons> and <icon> are not null.
   */
  isStartEvent(me: any): boolean;
  /**
   * Handles the event by initiating a new connection.
   */
  mouseDown(sender: any, me: any): void;
  /**
   * Returns true if a tap on the given source state should immediately start
   * connecting. This implementation returns true if the state is not movable
   * in the graph.
   */
  isImmediateConnectSource(state: any): boolean;
  /**
   * Hook to return an <mxCellState> which may be used during the preview.
   * This implementation returns null.
   *
   * Use the following code to create a preview for an existing edge style:
   *
   * (code)
   * graph.connectionHandler.createEdgeState = function(me)
   * {
   *   var edge = graph.createEdge(null, null, null, null, null, 'edgeStyle=elbowEdgeStyle');
   *
   *   return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
   * };
   * (end)
   */
  createEdgeState(me: any): any;
  /**
   * Returns true if <outlineConnect> is true and the source of the event is the outline shape
   * or shift is pressed.
   */
  isOutlineConnectEvent(me: any): any;
  /**
   * Updates the current state for a given mouse move event by using
   * the <marker>.
   */
  updateCurrentState(me: any, point: any): void;
  /**
   * Converts the given point from screen coordinates to model coordinates.
   */
  convertWaypoint(point: any): void;
  /**
   * Called to snap the given point to the current preview. This snaps to the
   * first point of the preview if alt is not pressed.
   */
  snapToPreview(me: any, point: any): void;
  /**
   * Handles the event by updating the preview edge or by highlighting
   * a possible source or target terminal.
   */
  mouseMove(sender: any, me: any): void;
  /**
   * Updates <edgeState>.
   */
  updateEdgeState(current: any, constraint: any): void;
  /**
   * Returns the perimeter point for the given target state.
   *
   * Parameters:
   *
   * state - <mxCellState> that represents the target cell state.
   * me - <mxMouseEvent> that represents the mouse move.
   */
  getTargetPerimeterPoint(state: any, me: any): any;
  /**
   * Hook to update the icon position(s) based on a mouseOver event. This is
   * an empty implementation.
   *
   * Parameters:
   *
   * state - <mxCellState> that represents the target cell state.
   * next - <mxPoint> that represents the next point along the previewed edge.
   * me - <mxMouseEvent> that represents the mouse move.
   */
  getSourcePerimeterPoint(state: any, next: any, me: any): any;
  /**
   * Hook to update the icon position(s) based on a mouseOver event. This is
   * an empty implementation.
   *
   * Parameters:
   *
   * state - <mxCellState> under the mouse.
   * icons - Array of currently displayed icons.
   * me - <mxMouseEvent> that contains the mouse event.
   */
  updateIcons(state: any, icons: any, me: any): void;
  /**
   * Returns true if the given mouse up event should stop this handler. The
   * connection will be created if <error> is null. Note that this is only
   * called if <waypointsEnabled> is true. This implemtation returns true
   * if there is a cell state in the given event.
   */
  isStopEvent(me: any): boolean;
  /**
   * Adds the waypoint for the given event to <waypoints>.
   */
  addWaypointForEvent(me: any): void;
  /**
   * Handles the event by inserting the new connection.
   */
  mouseUp(sender: any, me: any): void;
  /**
   * Resets the state of this handler.
   */
  reset(): void;
  /**
   * Redraws the preview edge using the color and width returned by
   * <getEdgeColor> and <getEdgeWidth>.
   */
  drawPreview(): void;
  /**
   * Returns the color used to draw the preview edge. This returns green if
   * there is no edge validation error and red otherwise.
   *
   * Parameters:
   *
   * valid - Boolean indicating if the color for a valid edge should be
   * returned.
   */
  updatePreview(valid: any): void;
  /**
   * Returns the color used to draw the preview edge. This returns green if
   * there is no edge validation error and red otherwise.
   *
   * Parameters:
   *
   * valid - Boolean indicating if the color for a valid edge should be
   * returned.
   */
  getEdgeColor(valid: any): string;
  /**
   * Returns the width used to draw the preview edge. This returns 3 if
   * there is no edge validation error and 1 otherwise.
   *
   * Parameters:
   *
   * valid - Boolean indicating if the width for a valid edge should be
   * returned.
   */
  getEdgeWidth(valid: any): 1 | 3;
  /**
   * Connects the given source and target using a new edge. This
   * implementation uses <createEdge> to create the edge.
   *
   * Parameters:
   *
   * source - <mxCell> that represents the source terminal.
   * target - <mxCell> that represents the target terminal.
   * evt - Mousedown event of the connect gesture.
   * dropTarget - <mxCell> that represents the cell under the mouse when it was
   * released.
   */
  connect(source: any, target: any, evt: any, dropTarget: any): void;
  /**
   * Selects the given edge after adding a new connection. The target argument
   * contains the target vertex if one has been inserted.
   */
  selectCells(edge: any, target: any): void;
  /**
   * Creates, inserts and returns the new edge for the given parameters. This
   * implementation does only use <createEdge> if <factoryMethod> is defined,
   * otherwise <mxGraph.insertEdge> will be used.
   */
  insertEdge(parent: any, id: any, value: any, source: any, target: any, style: any): any;
  /**
   * Hook method for creating new vertices on the fly if no target was
   * under the mouse. This is only called if <createTarget> is true and
   * returns null.
   *
   * Parameters:
   *
   * evt - Mousedown event of the connect gesture.
   * source - <mxCell> that represents the source terminal.
   */
  createTargetVertex(evt: any, source: any): any;
  /**
   * Returns the tolerance for aligning new targets to sources. This returns the grid size / 2.
   */
  getAlignmentTolerance(evt: any): any;
  /**
   * Creates and returns a new edge using <factoryMethod> if one exists. If
   * no factory method is defined, then a new default edge is returned. The
   * source and target arguments are informal, the actual connection is
   * setup later by the caller of this function.
   *
   * Parameters:
   *
   * value - Value to be used for creating the edge.
   * source - <mxCell> that represents the source terminal.
   * target - <mxCell> that represents the target terminal.
   * style - Optional style from the preview edge.
   */
  createEdge(value: any, source: any, target: any, style: any): any;
  /**
   * Destroys the handler and all its resources and DOM nodes. This should be
   * called on all instances. It is called automatically for the built-in
   * instance created for each <mxGraph>.
   */
  destroy(): void;
}
