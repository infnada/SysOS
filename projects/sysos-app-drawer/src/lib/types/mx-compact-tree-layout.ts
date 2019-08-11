/**
 * Extends <mxGraphLayout> to implement a compact tree (Moen) algorithm. This
 * layout is suitable for graphs that have no cycles (trees). Vertices that are
 * not connected to the tree will be ignored by this layout.
 *
 * Example:
 *
 * (code)
 * var layout = new mxCompactTreeLayout(graph);
 * layout.execute(graph.getDefaultParent());
 * (end)
 *
 * Constructor: mxCompactTreeLayout
 *
 * Constructs a new compact tree layout for the specified graph
 * and orientation.
 */
import {mxGraphLayout} from './mx-graph-layout';

export interface mxCompactTreeLayout extends mxGraphLayout {
  (graph: any, horizontal?: any, invert?: any): void;
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
   * Returns <horizontal>.
   */
  isHorizontal(): any;
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
   * Overrides <root> if specified.
   */
  execute(parent: any, root?: any): void;
  /**
   * Moves the specified node and all of its children by the given amount.
   */
  moveNode(node: any, dx: any, dy: any): void;
  /**
   * Called if <sortEdges> is true to sort the array of outgoing edges in place.
   */
  sortOutgoingEdges(source: any, edges: any): void;
  /**
   * Stores the maximum height (relative to the layout
   * direction) of cells in each rank
   */
  findRankHeights(node: any, rank: any): void;
  /**
   * Set the cells heights (relative to the layout
   * direction) when the tops of each rank are to be aligned
   */
  setCellHeights(node: any, rank: any): void;
  /**
   * Does a depth first search starting at the specified cell.
   * Makes sure the specified parent is never left by the
   * algorithm.
   */
  dfs(cell: any, parent: any): any;
  /**
   * Starts the actual compact tree layout algorithm
   * at the given node.
   */
  layout(node: any): void;
  /**
   * Function: horizontalLayout
   */
  horizontalLayout(node: any, x0: any, y0: any, bounds: any): any;
  /**
   * Function: verticalLayout
   */
  verticalLayout(node: any, parent: any, x0: any, y0: any, bounds: any): any;
  /**
   * Function: attachParent
   */
  attachParent(node: any, height: any): void;
  /**
   * Function: layoutLeaf
   */
  layoutLeaf(node: any): void;
  /**
   * Function: join
   */
  join(node: any): any;
  /**
   * Function: merge
   */
  merge(p1: any, p2: any): number;
  /**
   * Function: offset
   */
  offset(p1: any, p2: any, a1: any, a2: any, b1: any, b2: any): number;
  /**
   * Function: bridge
   */
  bridge(line1: any, x1: any, y1: any, line2: any, x2: any, y2: any): object;
  /**
   * Function: createNode
   */
  createNode(cell: any): object;
  /**
   * Function: apply
   */
  apply(node: any, bounds: any): any;
  /**
   * Function: createLine
   */
  createLine(dx: any, dy: any, next: any): object;
  /**
   * Adjust parent cells whose child geometries have changed. The default
   * implementation adjusts the group to just fit around the children with
   * a padding.
   */
  adjustParents(): void;
  /**
   * Moves the specified node and all of its children by the given amount.
   */
  localEdgeProcessing(node: any): void;
  /**
   * Separates the x position of edges as they connect to vertices
   */
  processNodeOutgoing(node: any): void;
}
