/**
 * Graph event handler that handles selection. Individual cells are handled
 * separately using <mxVertexHandler> or one of the edge handlers. These
 * handlers are created using <mxGraph.createHandler> in
 * <mxGraphSelectionModel.cellAdded>.
 *
 * To avoid the container to scroll a moved cell into view, set
 * <scrollAfterMove> to false.
 *
 * Constructor: mxGraphHandler
 *
 * Constructs an event handler that creates handles for the
 * selection cells.
 *
 * Parameters:
 *
 * graph - Reference to the enclosing <mxGraph>.
 */
import {mxRectangleShape} from "./mx-rectangle-shape";
import {mxPoint} from "./mx-point";

export interface mxGraphHandler {
  constructor(graph: any);
  /**
   * Returns <enabled>.
   */
  isEnabled(): any;
  /**
   * Sets <enabled>.
   */
  setEnabled(value: any): void;
  /**
   * Returns <cloneEnabled>.
   */
  isCloneEnabled(): any;
  /**
   * Sets <cloneEnabled>.
   *
   * Parameters:
   *
   * value - Boolean that specifies the new clone enabled state.
   */
  setCloneEnabled(value: any): void;
  /**
   * Returns <moveEnabled>.
   */
  isMoveEnabled(): any;
  /**
   * Sets <moveEnabled>.
   */
  setMoveEnabled(value: any): void;
  /**
   * Returns <selectEnabled>.
   */
  isSelectEnabled(): any;
  /**
   * Sets <selectEnabled>.
   */
  setSelectEnabled(value: any): void;
  /**
   * Returns <removeCellsFromParent>.
   */
  isRemoveCellsFromParent(): any;
  /**
   * Sets <removeCellsFromParent>.
   */
  setRemoveCellsFromParent(value: any): void;
  /**
   * Hook to return initial cell for the given event.
   */
  getInitialCellForEvent(me: any): any;
  /**
   * Hook to return true for delayed selections.
   */
  isDelayedSelection(cell: any, me: any): any;
  /**
   * Consumes the given mouse event. NOTE: This may be used to enable click
   * events for links in labels on iOS as follows as consuming the initial
   * touchStart disables firing the subsequent click evnent on the link.
   *
   * <code>
   * mxGraphHandler.prototype.consumeMouseEvent = function(evtName, me)
   * {
   *   var source = mxEvent.getSource(me.getEvent());
   *
   *   if (!mxEvent.isTouchEvent(me.getEvent()) || source.nodeName != 'A')
   *   {
   *     me.consume();
   *   }
   * }
   * </code>
   */
  consumeMouseEvent(evtName: any, me: any): void;
  /**
   * Handles the event by selecing the given cell and creating a handle for
   * it. By consuming the event all subsequent events of the gesture are
   * redirected to this handler.
   */
  mouseDown(sender: any, me: any): void;
  /**
   * Creates an array of cell states which should be used as guides.
   */
  getGuideStates(): any;
  /**
   * Returns the cells to be modified by this handler. This implementation
   * returns all selection cells that are movable, or the given initial cell if
   * the given cell is not selected and movable. This handles the case of moving
   * unselectable or unselected cells.
   *
   * Parameters:
   *
   * initialCell - <mxCell> that triggered this handler.
   */
  getCells(initialCell: any): any;
  /**
   * Returns the <mxRectangle> used as the preview bounds for
   * moving the given cells.
   */
  getPreviewBounds(cells: any): any;
  /**
   * Returns the union of the <mxCellStates> for the given array of <mxCells>.
   * For vertices, this method uses the bounding box of the corresponding shape
   * if one exists. The bounding box of the corresponding text label and all
   * controls and overlays are ignored. See also: <mxGraphView.getBounds> and
   * <mxGraph.getBoundingBox>.
   *
   * Parameters:
   *
   * cells - Array of <mxCells> whose bounding box should be returned.
   */
  getBoundingBox(cells: any): any;
  /**
   * Creates the shape used to draw the preview for the given bounds.
   */
  createPreviewShape(bounds: any): mxRectangleShape;
  /**
   * Starts the handling of the mouse gesture.
   */
  start(cell: any, x: any, y: any): void;
  /**
   * Returns true if the guides should be used for the given <mxMouseEvent>.
   * This implementation returns <mxGuide.isEnabledForEvent>.
   */
  useGuidesForEvent(me: any): any;
  /**
   * Snaps the given vector to the grid and returns the given mxPoint instance.
   */
  snap(vector: any): any;
  /**
   * Returns an <mxPoint> that represents the vector for moving the cells
   * for the given <mxMouseEvent>.
   */
  getDelta(me: any): mxPoint;
  /**
   * Hook for subclassers do show details while the handler is active.
   */
  updateHint(me: any): void;
  /**
   * Hooks for subclassers to hide details when the handler gets inactive.
   */
  removeHint(): void;
  /**
   * Hook for rounding the unscaled vector. This uses Math.round.
   */
  roundLength(length: any): number;
  /**
   * Handles the event by highlighting possible drop targets and updating the
   * preview.
   */
  mouseMove(sender: any, me: any): void;
  /**
   * Updates the bounds of the preview shape.
   */
  updatePreviewShape(): void;
  /**
   * Sets the color of the rectangle used to highlight drop targets.
   *
   * Parameters:
   *
   * color - String that represents the new highlight color.
   */
  setHighlightColor(color: any): void;
  /**
   * Handles the event by applying the changes to the selection cells.
   */
  mouseUp(sender: any, me: any): void;
  /**
   * Implements the delayed selection for the given mouse event.
   */
  selectDelayed(me: any): void;
  /**
   * Resets the state of this handler.
   */
  reset(): void;
  /**
   * Returns true if the given cells should be removed from the parent for the specified
   * mousereleased event.
   */
  shouldRemoveCellsFromParent(parent: any, cells: any, evt: any): boolean;
  /**
   * Moves the given cells by the specified amount.
   */
  moveCells(cells: any, dx: any, dy: any, clone: any, target: any, evt: any): void;
  /**
   * Destroy the preview and highlight shapes.
   */
  destroyShapes(): void;
  /**
   * Destroys the handler and all its resources and DOM nodes.
   */
  destroy(): void;
}
