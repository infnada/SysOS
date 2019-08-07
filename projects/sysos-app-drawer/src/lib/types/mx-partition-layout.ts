/**
 * Extends <mxGraphLayout> for partitioning the parent cell vertically or
 * horizontally by filling the complete area with the child cells. A horizontal
 * layout partitions the height of the given parent whereas a a non-horizontal
 * layout partitions the width. If the parent is a layer (that is, a child of
 * the root node), then the current graph size is partitioned. The children do
 * not need to be connected for this layout to work.
 *
 * Example:
 *
 * (code)
 * var layout = new mxPartitionLayout(graph, true, 10, 20);
 * layout.execute(graph.getDefaultParent());
 * (end)
 *
 * Constructor: mxPartitionLayout
 *
 * Constructs a new stack layout layout for the specified graph,
 * spacing, orientation and offset.
 */
import {mxGraphLayout} from "./mx-graph-layout";

export interface mxPartitionLayout extends mxGraphLayout {
  constructor(graph: any, horizontal?: any, spacing?: any, border?: any);
  /**
   * Returns <horizontal>.
   */
  isHorizontal(): any;
  /**
   * Implements <mxGraphLayout.moveCell>.
   */
  moveCell(cell: any, x: any, y: any): void;
  /**
   * Implements <mxGraphLayout.execute>. All children where <isVertexIgnored>
   * returns false and <isVertexMovable> returns true are modified.
   */
  execute(parent: any): void;
}
