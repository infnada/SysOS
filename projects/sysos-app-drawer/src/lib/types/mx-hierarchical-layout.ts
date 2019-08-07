/**
 * A hierarchical layout algorithm.
 *
 * Constructor: mxHierarchicalLayout
 *
 * Constructs a new hierarchical layout algorithm.
 *
 * Arguments:
 *
 * graph - Reference to the enclosing <mxGraph>.
 * orientation - Optional constant that defines the orientation of this
 * layout.
 * deterministic - Optional boolean that specifies if this layout should be
 * deterministic. Default is true.
 */
import {mxGraphLayout} from "./mx-graph-layout";

export interface mxHierarchicalLayout extends mxGraphLayout {
  (graph: any, orientation?: string, deterministic?: boolean): void;
  /**
   * Returns the internal <mxGraphHierarchyModel> for this layout algorithm.
   */
  getModel(): any;
  /**
   * Executes the layout for the children of the specified parent.
   *
   * Parameters:
   *
   * parent - Parent <mxCell> that contains the children to be laid out.
   * roots - Optional starting roots of the layout.
   */
  execute(parent: any, roots?: any): void;
  /**
   * Returns all visible children in the given parent which do not have
   * incoming edges. If the result is empty then the children with the
   * maximum difference between incoming and outgoing edges are returned.
   * This takes into account edges that are being promoted to the given
   * root due to invisible children or collapsed cells.
   *
   * Parameters:
   *
   * parent - <mxCell> whose children should be checked.
   * vertices - array of vertices to limit search to
   */
  findRoots(parent: any, vertices: any): any[];
  /**
   * Returns the connected edges for the given cell.
   *
   * Parameters:
   *
   * cell - <mxCell> whose edges should be returned.
   */
  getEdges(cell: any): any;
  /**
   * Helper function to return visible terminal for edge allowing for ports
   *
   * Parameters:
   *
   * edge - <mxCell> whose edges should be returned.
   * source - Boolean that specifies whether the source or target terminal is to be returned
   */
  getVisibleTerminal(edge: any, source: any): any;
  /**
   * The API method used to exercise the layout upon the graph description
   * and produce a separate description of the vertex position and edge
   * routing changes made. It runs each stage of the layout that has been
   * created.
   */
  run(parent: any): void;
  /**
   * Creates an array of descendant cells
   */
  filterDescendants(cell: any, result: any): void;
  /**
   * Returns true if the given cell is a "port", that is, when connecting to
   * it, its parent is the connecting vertex in terms of graph traversal
   *
   * Parameters:
   *
   * cell - <mxCell> that represents the port.
   */
  isPort(cell: any): boolean;
  /**
   * Returns the edges between the given source and target. This takes into
   * account collapsed and invisible cells and ports.
   *
   * Parameters:
   *
   * source -
   * target -
   * directed -
   */
  getEdgesBetween(source: any, target: any, directed: any): any[];
  /**
   * Traverses the (directed) graph invoking the given function for each
   * visited vertex and edge. The function is invoked with the current vertex
   * and the incoming edge as a parameter. This implementation makes sure
   * each vertex is only visited once. The function may return false if the
   * traversal should stop at the given vertex.
   *
   * Parameters:
   *
   * vertex - <mxCell> that represents the vertex where the traversal starts.
   * directed - boolean indicating if edges should only be traversed
   * from source to target. Default is true.
   * edge - Optional <mxCell> that represents the incoming edge. This is
   * null for the first step of the traversal.
   * allVertices - Array of cell paths for the visited cells.
   */
  traverse(vertex: any, directed: any, edge: any, allVertices: any, currentComp: any, hierarchyVertices?: any, filledVertexSet?: any): any;
  /**
   * Executes the cycle stage using mxMinimumCycleRemover.
   */
  cycleStage(parent: any): void;
  /**
   * Implements first stage of a Sugiyama layout.
   */
  layeringStage(): void;
  /**
   * Executes the crossing stage using mxMedianHybridCrossingReduction.
   */
  crossingStage(parent: any): void;
  /**
   * Executes the placement stage using mxCoordinateAssignment.
   */
  placementStage(initialX: any, parent: any): any;
}
