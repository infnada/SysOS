/**
 * Extends <mxGraphLayout> to implement a fast organic layout algorithm.
 * The vertices need to be connected for this layout to work, vertices
 * with no connections are ignored.
 *
 * @example
 * var layout = new mxFastOrganicLayout(graph);
 * layout.execute(graph.getDefaultParent());
 */
import {mxGraphLayout} from './mx-graph-layout';

export interface mxFastOrganicLayout extends mxGraphLayout {
  /**
   * Specifies if the top left corner of the input cells should be the origin
   * of the layout result. Default is true.
   */
  useInputOrigin: boolean;

  /**
   * Specifies if all edge points of traversed edges should be removed.
   * Default is true.
   */
  resetEdges: boolean;

  /**
   * Specifies if the STYLE_NOEDGESTYLE flag should be set on edges that are
   * modified by the result. Default is true.
   */
  disableEdgeStyle: boolean;

  /**
   * The force constant by which the attractive forces are divided and the
   * replusive forces are multiple by the square of. The value equates to the
   * average radius there is of free space around each node. Default is 50.
   */
  forceConstant: number;
  /**
   * Cache of <forceConstant>^2 for performance.
   */
  forceConstantSquared: number;

  /**
   * Minimal distance limit. Default is 2. Prevents of
   * dividing by zero.
   */
  minDistanceLimit: number;

  /**
   * Minimal distance limit. Default is 2. Prevents of
   * dividing by zero.
   */
  maxDistanceLimit: number;

  /**
   * Cached version of <minDistanceLimit> squared.
   */
  minDistanceLimitSquared: number;

  /**
   * Start value of temperature. Default is 200.
   */
  initialTemp: number;

  /**
   * Temperature to limit displacement at later stages of layout.
   */
  temperature: number;

  /**
   * Total number of iterations to run the layout though.
   */
  maxIterations: number;

  /**
   * Current iteration count.
   */
  iteration: number;

  /**
   * An array of all vertices to be laid out.
   */
  vertexArray: any;

  /**
   * An array of locally stored X co-ordinate displacements for the vertices.
   */
  dispX: any;

  /**
   * An array of locally stored Y co-ordinate displacements for the vertices.
   */
  dispY: any;

  /**
   * An array of locally stored co-ordinate positions for the vertices.
   */
  cellLocation: any;

  /**
   * The approximate radius of each cell, nodes only.
   */
  radius: any;

  /**
   * The approximate radius squared of each cell, nodes only.
   */
  radiusSquared: any;

  /**
   * Array of booleans representing the movable states of the vertices.
   */
  isMoveable: any;

  /**
   * Local copy of cell neighbours.
   */
  neighbours: any;

  /**
   * Hashtable from cells to local indices.
   */
  indices: any;

  /**
   * Boolean flag that specifies if the layout is allowed to run. If this is
   * set to false, then the layout exits in the following iteration.
   */
  allowedToRun: boolean;

  /**
   * Constructs a new fast organic layout for the specified graph.
   */
  (graph: any): void;
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
   * Implements <mxGraphLayout.execute>. This operates on all children of the
   * given parent where <isVertexIgnored> returns false.
   */
  execute(parent: any): void;
  /**
   * Takes the displacements calculated for each cell and applies them to the
   * local cache of cell positions. Limits the displacement to the current
   * temperature.
   */
  calcPositions(): void;
  /**
   * Calculates the attractive forces between all laid out nodes linked by
   * edges
   */
  calcAttraction(): void;
  /**
   * Calculates the repulsive forces between all laid out nodes
   */
  calcRepulsion(): void;
  /**
   * Reduces the temperature of the layout from an initial setting in a linear
   * fashion to zero.
   */
  reduceTemperature(): void;
}
