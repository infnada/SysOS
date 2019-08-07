/**
 * Extends <mxGraphLayout> to create a horizontal or vertical stack of the
 * child vertices. The children do not need to be connected for this layout
 * to work.
 *
 * Example:
 *
 * (code)
 * var layout = new mxStackLayout(graph, true);
 * layout.execute(graph.getDefaultParent());
 * (end)
 *
 * Constructor: mxStackLayout
 *
 * Constructs a new stack layout layout for the specified graph,
 * spacing, orientation and offset.
 */
import {mxGraphLayout} from "./mx-graph-layout";

export interface mxStackLayout extends mxGraphLayout {
  constructor(graph: any, horizontal?: any, spacing?: any, x0?: any, y0?: any, border?: any);
  /**
   * Returns <horizontal>.
   */
  isHorizontal(): any;
  /**
   * Implements <mxGraphLayout.moveCell>.
   */
  moveCell(cell: any, x: any, y: any): void;
  /**
   * Returns the size for the parent container or the size of the graph
   * container if the parent is a layer or the root of the model.
   */
  getParentSize(parent: any): any;
  /**
   * Implements <mxGraphLayout.execute>.
   *
   * Only children where <isVertexIgnored> returns false are taken into
   * account.
   */
  execute(parent: any): void;
  /**
   * Implements <mxGraphLayout.execute>.
   *
   * Only children where <isVertexIgnored> returns false are taken into
   * account.
   */
  setChildGeometry(child: any, geo: any): void;
  /**
   * Implements <mxGraphLayout.execute>.
   *
   * Only children where <isVertexIgnored> returns false are taken into
   * account.
   */
  updateParentGeometry(parent: any, pgeo: any, last: any): void;
}
