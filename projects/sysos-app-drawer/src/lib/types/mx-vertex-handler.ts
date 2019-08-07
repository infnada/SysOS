/**
 * Event handler for resizing cells. This handler is automatically created in
 * <mxGraph.createHandler>.
 *
 * Constructor: mxVertexHandler
 *
 * Constructs an event handler that allows to resize vertices
 * and groups.
 *
 * Parameters:
 *
 * state - <mxCellState> of the cell to be resized.
 */
import {mxRectangle} from "./mx-rectangle";
import {mxRectangleShape} from "./mx-rectangle-shape";
import {mxPoint} from "./mx-point";

export interface mxVertexHandler {
  constructor(state: any);
  /**
   * Initializes the shapes required for this vertex handler.
   */
  init(): void;
  /**
   * Returns true if the rotation handle should be showing.
   */
  isRotationHandleVisible(): boolean;
  /**
   * Returns true if the aspect ratio if the cell should be maintained.
   */
  isConstrainedEvent(me: any): boolean;
  /**
   * Returns true if the center of the vertex should be maintained during the resize.
   */
  isCenteredEvent(state: any, me: any): boolean;
  /**
   * Returns an array of custom handles. This implementation returns null.
   */
  createCustomHandles(): any;
  /**
   * Initializes the shapes required for this vertex handler.
   */
  updateMinBounds(): void;
  /**
   * Returns the mxRectangle that defines the bounds of the selection
   * border.
   */
  getSelectionBounds(state: any): mxRectangle;
  /**
   * Creates the shape used to draw the selection border.
   */
  createParentHighlightShape(bounds: any): mxRectangleShape;
  /**
   * Creates the shape used to draw the selection border.
   */
  createSelectionShape(bounds: any): mxRectangleShape;
  /**
   * Returns <mxConstants.VERTEX_SELECTION_COLOR>.
   */
  getSelectionColor(): string;
  /**
   * Returns <mxConstants.VERTEX_SELECTION_STROKEWIDTH>.
   */
  getSelectionStrokeWidth(): number;
  /**
   * Returns <mxConstants.VERTEX_SELECTION_DASHED>.
   */
  isSelectionDashed(): boolean;
  /**
   * Creates a sizer handle for the specified cursor and index and returns
   * the new <mxRectangleShape> that represents the handle.
   */
  createSizer(cursor: any, index: any, size: any, fillColor: any): any;
  /**
   * Returns true if the sizer for the given index is visible.
   * This returns true for all given indices.
   */
  isSizerVisible(index: any): boolean;
  /**
   * Creates the shape used for the sizer handle for the specified bounds an
   * index. Only images and rectangles should be returned if support for HTML
   * labels with not foreign objects is required.
   */
  createSizerShape(bounds: any, index: any, fillColor: any): any;
  /**
   * Helper method to create an <mxRectangle> around the given centerpoint
   * with a width and height of 2*s or 6, if no s is given.
   */
  moveSizerTo(shape: any, x: any, y: any): void;
  /**
   * Returns the index of the handle for the given event. This returns the index
   * of the sizer from where the event originated or <mxEvent.LABEL_INDEX>.
   */
  getHandleForEvent(me: any): number;
  /**
   * Returns true if the given event allows custom handles to be changed. This
   * implementation returns true.
   */
  isCustomHandleEvent(me: any): boolean;
  /**
   * Handles the event if a handle has been clicked. By consuming the
   * event all subsequent events of the gesture are redirected to this
   * handler.
   */
  mouseDown(sender: any, me: any): void;
  /**
   * Called if <livePreview> is enabled to check if a border should be painted.
   * This implementation returns true if the shape is transparent.
   */
  isLivePreviewBorder(): boolean;
  /**
   * Starts the handling of the mouse gesture.
   */
  start(x: any, y: any, index: any): void;
  /**
   * Shortcut to <hideSizers>.
   */
  setHandlesVisible(visible: any): void;
  /**
   * Hides all sizers except.
   *
   * Starts the handling of the mouse gesture.
   */
  hideSizers(): void;
  /**
   * Checks if the coordinates for the given event are within the
   * <mxGraph.tolerance>. If the event is a mouse event then the tolerance is
   * ignored.
   */
  checkTolerance(me: any): void;
  /**
   * Hook for subclassers do show details while the handler is active.
   */
  updateHint(me: any): void;
  /**
   * Hooks for subclassers to hide details when the handler gets inactive.
   */
  removeHint(): void;
  /**
   * Hook for rounding the angle. This uses Math.round.
   */
  roundAngle(angle: any): number;
  /**
   * Hook for rounding the unscaled width or height. This uses Math.round.
   */
  roundLength(length: any): number;
  /**
   * Handles the event by updating the preview.
   */
  mouseMove(sender: any, me: any): void;
  /**
   * Rotates the vertex.
   */
  moveLabel(me: any): void;
  /**
   * Rotates the vertex.
   */
  rotateVertex(me: any): void;
  /**
   * Rotates the vertex.
   */
  resizeVertex(me: any): void;
  /**
   * Repaints the live preview.
   */
  updateLivePreview(me: any): void;
  /**
   * Handles the event by applying the changes to the geometry.
   */
  mouseUp(sender: any, me: any): void;
  /**
   * Rotates the given cell to the given rotation.
   */
  isRecursiveResize(state: any, me: any): any;
  /**
   * Hook for subclassers to implement a single click on the rotation handle.
   * This code is executed as part of the model transaction. This implementation
   * is empty.
   */
  rotateClick(): void;
  /**
   * Rotates the given cell and its children by the given angle in degrees.
   *
   * Parameters:
   *
   * cell - <mxCell> to be rotated.
   * angle - Angle in degrees.
   */
  rotateCell(cell: any, angle: any, parent: any): void;
  /**
   * Resets the state of this handler.
   */
  reset(): void;
  /**
   * Uses the given vector to change the bounds of the given cell
   * in the graph using <mxGraph.resizeCell>.
   */
  resizeCell(cell: any, dx: any, dy: any, index: any, gridEnabled: any, constrained: any, recurse: any): void;
  /**
   * Moves the children of the given cell by the given vector.
   */
  moveChildren(cell: any, dx: any, dy: any): void;
  /**
   * Returns the union of the given bounds and location for the specified
   * handle index.
   *
   * To override this to limit the size of vertex via a minWidth/-Height style,
   * the following code can be used.
   *
   * (code)
   * var vertexHandlerUnion = mxVertexHandler.prototype.union;
   * mxVertexHandler.prototype.union = function(bounds, dx, dy, index, gridEnabled, scale, tr, constrained)
   * {
   *   var result = vertexHandlerUnion.apply(this, arguments);
   *
   *   result.width = Math.max(result.width, mxUtils.getNumber(this.state.style, 'minWidth', 0));
   *   result.height = Math.max(result.height, mxUtils.getNumber(this.state.style, 'minHeight', 0));
   *
   *   return result;
   * };
   * (end)
   *
   * The minWidth/-Height style can then be used as follows:
   *
   * (code)
   * graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30, 'minWidth=100;minHeight=100;');
   * (end)
   *
   * To override this to update the height for a wrapped text if the width of a vertex is
   * changed, the following can be used.
   *
   * (code)
   * var mxVertexHandlerUnion = mxVertexHandler.prototype.union;
   * mxVertexHandler.prototype.union = function(bounds, dx, dy, index, gridEnabled, scale, tr, constrained)
   * {
   *   var result = mxVertexHandlerUnion.apply(this, arguments);
   *   var s = this.state;
   *
   *   if (this.graph.isHtmlLabel(s.cell) && (index == 3 || index == 4) &&
   *       s.text != null && s.style[mxConstants.STYLE_WHITE_SPACE] == 'wrap')
   *   {
   *     var label = this.graph.getLabel(s.cell);
   *     var fontSize = mxUtils.getNumber(s.style, mxConstants.STYLE_FONTSIZE, mxConstants.DEFAULT_FONTSIZE);
   *     var ww = result.width / s.view.scale - s.text.spacingRight - s.text.spacingLeft
   *
   *     result.height = mxUtils.getSizeForString(label, fontSize, s.style[mxConstants.STYLE_FONTFAMILY], ww).height;
   *   }
   *
   *   return result;
   * };
   * (end)
   */
  union(bounds: any, dx: any, dy: any, index: any, gridEnabled: any, scale: any, tr: any, constrained: any, centered: any): mxRectangle;
  /**
   * Redraws the handles and the preview.
   */
  redraw(): void;
  /**
   * Returns the padding to be used for drawing handles for the current <bounds>.
   */
  getHandlePadding(): mxPoint;
  /**
   * Redraws the handles. To hide certain handles the following code can be used.
   *
   * (code)
   * mxVertexHandler.prototype.redrawHandles = function()
   * {
   *   mxVertexHandlerRedrawHandles.apply(this, arguments);
   *
   *   if (this.sizers != null && this.sizers.length > 7)
   *   {
   *     this.sizers[1].node.style.display = 'none';
   *     this.sizers[6].node.style.display = 'none';
   *   }
   * };
   * (end)
   */
  redrawHandles(): void;
  /**
   * Updates the highlight of the parent if <parentHighlightEnabled> is true.
   */
  updateParentHighlight(): void;
  /**
   * Redraws the preview.
   */
  drawPreview(): void;
  /**
   * Destroys the handler and all its resources and DOM nodes.
   */
  destroy(): void;
}
