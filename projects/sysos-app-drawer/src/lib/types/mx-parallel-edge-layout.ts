/**
 * Extends <mxGraphLayout> for arranging parallel edges. This layout works
 * on edges for all pairs of vertices where there is more than one edge
 * connecting the latter.
 *
 * Example:
 *
 * (code)
 * var layout = new mxParallelEdgeLayout(graph);
 * layout.execute(graph.getDefaultParent());
 * (end)
 *
 * To run the layout for the parallel edges of a changed edge only, the
 * following code can be used.
 *
 * (code)
 * var layout = new mxParallelEdgeLayout(graph);
 *
 * graph.addListener(mxEvent.CELL_CONNECTED, function(sender, evt)
 * {
 *   var model = graph.getModel();
 *   var edge = evt.getProperty('edge');
 *   var src = model.getTerminal(edge, true);
 *   var trg = model.getTerminal(edge, false);
 *
 *   layout.isEdgeIgnored = function(edge2)
 *   {
 *     var src2 = model.getTerminal(edge2, true);
 *     var trg2 = model.getTerminal(edge2, false);
 *
 *     return !(model.isEdge(edge2) && ((src == src2 && trg == trg2) || (src == trg2 && trg == src2)));
 *   };
 *
 *   layout.execute(graph.getDefaultParent());
 * });
 * (end)
 *
 * Constructor: mxCompactTreeLayout
 *
 * Constructs a new fast organic layout for the specified graph.
 */
import {mxGraphLayout} from "./mx-graph-layout";

export interface mxParallelEdgeLayout extends mxGraphLayout {
  constructor(graph: any);
  /**
   * Implements <mxGraphLayout.execute>.
   */
  execute(parent: any): void;
  /**
   * Finds the parallel edges in the given parent.
   */
  findParallels(parent: any): any[];
  /**
   * Returns a unique ID for the given edge. The id is independent of the
   * edge direction and is built using the visible terminal of the given
   * edge.
   */
  getEdgeId(edge: any): string;
  /**
   * Lays out the parallel edges in the given array.
   */
  layout(parallels: any): void;
  /**
   * Routes the given edge via the given point.
   */
  route(edge: any, x: any, y: any): void;
}
