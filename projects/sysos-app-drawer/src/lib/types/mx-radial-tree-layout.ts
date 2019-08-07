/**
 * Extends <mxGraphLayout> to implement a radial tree algorithm. This
 * layout is suitable for graphs that have no cycles (trees). Vertices that are
 * not connected to the tree will be ignored by this layout.
 *
 * Example:
 *
 * (code)
 * var layout = new mxRadialTreeLayout(graph);
 * layout.execute(graph.getDefaultParent());
 * (end)
 *
 * Constructor: mxRadialTreeLayout
 *
 * Constructs a new radial tree layout for the specified graph
 */
import {mxCompactTreeLayout} from "./mx-compact-tree-layout";

export interface mxRadialTreeLayout extends mxCompactTreeLayout {
  constructor(graph: any);
  /**
   * Returns a boolean indicating if the given <mxCell> should be ignored as a
   * vertex. This returns true if the cell has no connections.
   *
   * Parameters:
   *
   * vertex - <mxCell> whose ignored state should be returned.
   */
  isVertexIgnored(vertex: any): any;
  /**
   * Implements <mxGraphLayout.execute>.
   *
   * If the parent has any connected edges, then it is used as the root of
   * the tree. Else, <mxGraph.findTreeRoots> will be used to find a suitable
   * root node within the set of children of the given parent.
   *
   * Parameters:
   *
   * parent - <mxCell> whose children should be laid out.
   * root - Optional <mxCell> that will be used as the root of the tree.
   */
  execute(parent: any, root: any): void;
  /**
   * Recursive function to calculate the dimensions of each row
   *
   * Parameters:
   *
   * row - Array of internal nodes, the children of which are to be processed.
   * rowNum - Integer indicating which row is being processed.
   */
  calcRowDims(row: any, rowNum: any): void;
}
