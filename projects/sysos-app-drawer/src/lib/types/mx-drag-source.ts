/**
 * Wrapper to create a drag source from a DOM element so that the element can
 * be dragged over a graph and dropped into the graph as a new cell.
 *
 * Problem is that in the dropHandler the current preview location is not
 * available, so the preview and the dropHandler must match.
 *
 * Constructor: mxDragSource
 *
 * Constructs a new drag source for the given element.
 */
export interface mxDragSource {
  constructor(element: any, dropHandler: any);
  /**
   * Returns <enabled>.
   */
  isEnabled(): any;
  /**
   * Sets <enabled>.
   */
  setEnabled(value: any): void;
  /**
   * Returns <guidesEnabled>.
   */
  isGuidesEnabled(): any;
  /**
   * Sets <guidesEnabled>.
   */
  setGuidesEnabled(value: any): void;
  /**
   * Returns <gridEnabled>.
   */
  isGridEnabled(): any;
  /**
   * Sets <gridEnabled>.
   */
  setGridEnabled(value: any): void;
  /**
   * Returns the graph for the given mouse event. This implementation returns
   * null.
   */
  getGraphForEvent(evt: any): any;
  /**
   * Returns the drop target for the given graph and coordinates. This
   * implementation uses <mxGraph.getCellAt>.
   */
  getDropTarget(graph: any, x: any, y: any, evt: any): any;
  /**
   * Creates and returns a clone of the <dragElementPrototype> or the <element>
   * if the former is not defined.
   */
  createDragElement(evt: any): any;
  /**
   * Creates and returns an element which can be used as a preview in the given
   * graph.
   */
  createPreviewElement(graph: any): any;
  /**
   * Returns true if this drag source is active.
   */
  isActive(): boolean;
  /**
   * Stops and removes everything and restores the state of the object.
   */
  reset(): void;
  /**
   * Returns the drop target for the given graph and coordinates. This
   * implementation uses <mxGraph.getCellAt>.
   *
   * To ignore popup menu events for a drag source, this function can be
   * overridden as follows.
   *
   * (code)
   * var mouseDown = dragSource.mouseDown;
   *
   * dragSource.mouseDown = function(evt)
   * {
   *   if (!mxEvent.isPopupTrigger(evt))
   *   {
   *     mouseDown.apply(this, arguments);
   *   }
   * };
   * (end)
   */
  mouseDown(evt: any): void;
  /**
   * Creates the <dragElement> using <createDragElement>.
   */
  startDrag(evt: any): void;
  /**
   * Invokes <removeDragElement>.
   */
  stopDrag(): void;
  /**
   * Removes and destroys the <dragElement>.
   */
  removeDragElement(): void;
  /**
   * Returns true if the given graph contains the given event.
   */
  graphContainsEvent(graph: any, evt: any): boolean;
  /**
   * Gets the graph for the given event using <getGraphForEvent>, updates the
   * <currentGraph>, calling <dragEnter> and <dragExit> on the new and old graph,
   * respectively, and invokes <dragOver> if <currentGraph> is not null.
   */
  mouseMove(evt: any): void;
  /**
   * Processes the mouse up event and invokes <drop>, <dragExit> and <stopDrag>
   * as required.
   */
  mouseUp(evt: any): void;
  /**
   * Actives the given graph as a drop target.
   */
  removeListeners(): void;
  /**
   * Actives the given graph as a drop target.
   */
  dragEnter(graph: any, evt: any): void;
  /**
   * Deactivates the given graph as a drop target.
   */
  dragExit(graph: any, evt: any): void;
  /**
   * Implements autoscroll, updates the <currentPoint>, highlights any drop
   * targets and updates the preview.
   */
  dragOver(graph: any, evt: any): void;
  /**
   * Returns the drop target for the given graph and coordinates. This
   * implementation uses <mxGraph.getCellAt>.
   */
  drop(graph: any, evt: any, dropTarget: any, x: any, y: any): void;
}
