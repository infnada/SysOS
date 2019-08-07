/**
 * Event handler that selects rectangular regions. This is not built-into
 * <mxGraph>. To enable rubberband selection in a graph, use the following code.
 *
 * Example:
 *
 * (code)
 * var rubberband = new mxRubberband(graph);
 * (end)
 *
 * Constructor: mxRubberband
 *
 * Constructs an event handler that selects rectangular regions in the graph
 * using rubberband selection.
 */
export interface mxRubberband {
  (graph: any): void;
  /**
   * Returns true if events are handled. This implementation returns
   * <enabled>.
   */
  isEnabled(): any;
  /**
   * Enables or disables event handling. This implementation updates
   * <enabled>.
   */
  setEnabled(enabled: any): void;
  /**
   * Returns true if the given <mxMouseEvent> should start rubberband selection.
   * This implementation returns true if the alt key is pressed.
   */
  isForceRubberbandEvent(me: any): boolean;
  /**
   * Handles the event by initiating a rubberband selection. By consuming the
   * event all subsequent events of the gesture are redirected to this
   * handler.
   */
  mouseDown(sender: any, me: any): void;
  /**
   * Sets the start point for the rubberband selection.
   */
  start(x: any, y: any): void;
  /**
   * Handles the event by updating therubberband selection.
   */
  mouseMove(sender: any, me: any): void;
  /**
   * Creates the rubberband selection shape.
   */
  createShape(): any;
  /**
   * Returns true if this handler is active.
   */
  isActive(sender: any, me: any): boolean;
  /**
   * Handles the event by selecting the region of the rubberband using
   * <mxGraph.selectRegion>.
   */
  mouseUp(sender: any, me: any): void;
  /**
   * Resets the state of this handler and selects the current region
   * for the given event.
   */
  execute(evt: any): void;
  /**
   * Resets the state of the rubberband selection.
   */
  reset(): void;
  /**
   * Sets <currentX> and <currentY> and calls <repaint>.
   */
  update(x: any, y: any): void;
  /**
   * Computes the bounding box and updates the style of the <div>.
   */
  repaint(): void;
  /**
   * Destroys the handler and all its resources and DOM nodes. This does
   * normally not need to be called, it is called automatically when the
   * window unloads.
   */
  destroy(): void;
}
