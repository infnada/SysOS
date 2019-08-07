/**
 * Extends <mxGraphLayout> to implement an edge label layout. This layout
 * makes use of cell states, which means the graph must be validated in
 * a graph view (so that the label bounds are available) before this layout
 * can be executed.
 *
 * Example:
 *
 * (code)
 * var layout = new mxEdgeLabelLayout(graph);
 * layout.execute(graph.getDefaultParent());
 * (end)
 *
 * Constructor: mxEdgeLabelLayout
 *
 * Constructs a new edge label layout.
 *
 * Arguments:
 *
 * graph - <mxGraph> that contains the cells.
 */
import {mxGraphLayout} from "./mx-graph-layout";

export interface mxEdgeLabelLayout extends mxGraphLayout {
  constructor(graph: any, radius?: any);
  /**
   * Implements <mxGraphLayout.execute>.
   */
  execute(parent: any): void;
  /**
   * Places the labels of the given edges.
   */
  placeLabels(v: any, e: any): void;
  /**
   * Places the labels of the given edges.
   */
  avoid(edge: any, vertex: any): void;
}
