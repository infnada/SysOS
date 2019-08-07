/**
 * Graph event handler that reconnects edges and modifies control points and
 * the edge label location. Uses <mxTerminalMarker> for finding and
 * highlighting new source and target vertices. This handler is automatically
 * created in <mxGraph.createHandler>. It extends <mxEdgeHandler>.
 *
 * Constructor: mxEdgeHandler
 *
 * Constructs an edge handler for the specified <mxCellState>.
 *
 * Parameters:
 *
 * state - <mxCellState> of the cell to be modified.
 */
import {mxEdgeHandler} from "./mx-edge-handler";

export interface mxElbowEdgeHandler extends mxEdgeHandler {
  constructor(state: any);
  /**
   * Overrides <mxEdgeHandler.createBends> to create custom bends.
   */
  createBends(): any[];
  /**
   * Creates a virtual bend that supports double clicking and calls
   * <mxGraph.flipEdge>.
   */
  createVirtualBend(dblClickHandler: any): any;
  /**
   * Returns the cursor to be used for the bend.
   */
  getCursorForBend(): 'row-resize' | 'col-resize';
  /**
   * Returns the tooltip for the given node.
   */
  getTooltipForNode(node: any): any;
  /**
   * Converts the given point in-place from screen to unscaled, untranslated
   * graph coordinates and applies the grid.
   *
   * Parameters:
   *
   * point - <mxPoint> to be converted.
   * gridEnabled - Boolean that specifies if the grid should be applied.
   */
  convertPoint(point: any, gridEnabled: any): any;
  /**
   * Updates and redraws the inner bends.
   *
   * Parameters:
   *
   * p0 - <mxPoint> that represents the location of the first point.
   * pe - <mxPoint> that represents the location of the last point.
   */
  redrawInnerBends(p0: any, pe: any): void;
}
