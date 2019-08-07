/**
 * Extends <mxEventSource> to implement a graph overlay, represented by an icon
 * and a tooltip. Overlays can handle and fire <click> events and are added to
 * the graph using <mxGraph.addCellOverlay>, and removed using
 * <mxGraph.removeCellOverlay>, or <mxGraph.removeCellOverlays> to remove all overlays.
 * The <mxGraph.getCellOverlays> function returns the array of overlays for a given
 * cell in a graph. If multiple overlays exist for the same cell, then
 * <getBounds> should be overridden in at least one of the overlays.
 *
 * Overlays appear on top of all cells in a special layer. If this is not
 * desirable, then the image must be rendered as part of the shape or label of
 * the cell instead.
 *
 * Example:
 *
 * The following adds a new overlays for a given vertex and selects the cell
 * if the overlay is clicked.
 *
 * (code)
 * var overlay = new mxCellOverlay(img, html);
 * graph.addCellOverlay(vertex, overlay);
 * overlay.addListener(mxEvent.CLICK, function(sender, evt)
 * {
 *   var cell = evt.getProperty('cell');
 *   graph.setSelectionCell(cell);
 * });
 * (end)
 *
 * For cell overlays to be printed use <mxPrintPreview.printOverlays>.
 *
 * Event: mxEvent.CLICK
 *
 * Fires when the user clicks on the overlay. The <code>event</code> property
 * contains the corresponding mouse event and the <code>cell</code> property
 * contains the cell. For touch devices this is fired if the element receives
 * a touchend event.
 */
import {mxEventSource} from "./mx-event-source";
import {mxImage} from "./mx-image";
import {mxPoint} from "./mx-point";
import {mxRectangle} from "./mx-rectangle";

export interface mxCellOverlay extends mxEventSource {
  /**
   * Constructs a new overlay using the given image and tooltip.
   *
   * @param image - <mxImage> that represents the icon to be displayed.
   * @param tooltip - Optional string that specifies the tooltip.
   * @param align - Optional horizontal alignment for the overlay. Possible
   * values are <ALIGN_LEFT>, <ALIGN_CENTER> and <ALIGN_RIGHT>
   * (default).
   * @param verticalAlign - Vertical alignment for the overlay. Possible
   * values are <ALIGN_TOP>, <ALIGN_MIDDLE> and <ALIGN_BOTTOM>
   * (default).
   * @param offset ?
   * @param cursor ?
   */
  (image: mxImage, tooltip?: string, align?: any, verticalAlign?: any, offset?: mxPoint, cursor?: string): void;
  /**
   * Holds the <mxImage> to be used as the icon.
   */
  image: any;
  /**
   * Holds the optional string to be used as the tooltip.
   */
  tooltip: any;
  /**
   * Holds the horizontal alignment for the overlay. Default is
   * <mxConstants.ALIGN_RIGHT>. For edges, the overlay always appears in the
   * center of the edge.
   */
  align: string;
  /**
   * Holds the vertical alignment for the overlay. Default is
   * <mxConstants.ALIGN_BOTTOM>. For edges, the overlay always appears in the
   * center of the edge.
   */
  verticalAlign: string;
  /**
   * Holds the offset as an <mxPoint>. The offset will be scaled according to the
   * current scale.
   */
  offset: any;
  /**
   * Holds the cursor for the overlay. Default is 'help'.
   */
  cursor: any;
  /**
   * Defines the overlapping for the overlay, that is, the proportional distance
   * from the origin to the point defined by the alignment. Default is 0.5.
   */
  defaultOverlap: number;
  /**
   * Returns the bounds of the overlay for the given <mxCellState> as an
   * <mxRectangle>. This should be overridden when using multiple overlays
   * per cell so that the overlays do not overlap.
   *
   * The following example will place the overlay along an edge (where
   * x=[-1..1] from the start to the end of the edge and y is the
   * orthogonal offset in px).
   *
   * (code)
   * overlay.getBounds = function(state)
   * {
   *   var bounds = mxCellOverlay.prototype.getBounds.apply(this, arguments);
   *
   *   if (state.view.graph.getModel().isEdge(state.cell))
   *   {
   *     var pt = state.view.getPoint(state, {x: 0, y: 0, relative: true});
   *
   *     bounds.x = pt.x - bounds.width / 2;
   *     bounds.y = pt.y - bounds.height / 2;
   *   }
   *
   *   return bounds;
   * };
   * (end)
   *
   * Parameters:
   *
   * state - <mxCellState> that represents the current state of the
   * associated cell.
   */
  getBounds(state: any): mxRectangle;
  /**
   * Returns the textual representation of the overlay to be used as the
   * tooltip. This implementation returns <tooltip>.
   */
  toString(): any;
}
