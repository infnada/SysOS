/**
 * Extends <mxGraphLayout> to implement a circluar layout for a given radius.
 * The vertices do not need to be connected for this layout to work and all
 * connections between vertices are not taken into account.
 *
 * Example:
 *
 * (code)
 * var layout = new mxCircleLayout(graph);
 * layout.execute(graph.getDefaultParent());
 * (end)
 *
 * Constructor: mxCircleLayout
 *
 * Constructs a new circular layout for the specified radius.
 *
 * Arguments:
 *
 * graph - <mxGraph> that contains the cells.
 * radius - Optional radius as an int. Default is 100.
 */
import {mxGraphLayout} from "./mx-graph-layout";

export interface mxCircleLayout extends mxGraphLayout {
  constructor(graph: any, radius?: any);
  /**
   * Implements <mxGraphLayout.execute>.
   */
  execute(parent: any): void;
  /**
   * Returns the radius to be used for the given vertex count. Max is the maximum
   * width or height of all vertices in the layout.
   */
  getRadius(count: any, max: any): number;
  /**
   * Executes the circular layout for the specified array
   * of vertices and the given radius. This is called from
   * <execute>.
   */
  circle(vertices: any, r: any, left: any, top: any): void;
}
