/**
 * Base class for all layout algorithms in mxGraph. Main public functions are
 * <move> for handling a moved cell within a layouted parent, and <execute> for
 * running the layout on a given parent cell.
 *
 * Known Subclasses:
 *
 * <mxCircleLayout>, <mxCompactTreeLayout>, <mxCompositeLayout>,
 * <mxFastOrganicLayout>, <mxParallelEdgeLayout>, <mxPartitionLayout>,
 * <mxStackLayout>
 *
 * Constructor: mxGraphLayout
 *
 * Constructs a new layout using the given layouts.
 *
 * Arguments:
 *
 * graph - Enclosing
 */
import {mxPoint} from "./mx-point";
import {mxRectangle} from "./mx-rectangle";

export interface mxGraphLayout {
  constructor(graph: any);
  /**
   * Notified when a cell is being moved in a parent that has automatic
   * layout to update the cell state (eg. index) so that the outcome of the
   * layout will position the vertex as close to the point (x, y) as
   * possible.
   *
   * Empty implementation.
   *
   * Parameters:
   *
   * cell - <mxCell> which has been moved.
   * x - X-coordinate of the new cell location.
   * y - Y-coordinate of the new cell location.
   */
  moveCell(cell: any, x: any, y: any): void;
  /**
   * Executes the layout algorithm for the children of the given parent.
   *
   * Parameters:
   *
   * parent - <mxCell> whose children should be layed out.
   */
  execute(parent: any): void;
  /**
   * Returns the graph that this layout operates on.
   */
  getGraph(): any;
  /**
   * Returns the constraint for the given key and cell. The optional edge and
   * source arguments are used to return inbound and outgoing routing-
   * constraints for the given edge and vertex. This implementation always
   * returns the value for the given key in the style of the given cell.
   *
   * Parameters:
   *
   * key - Key of the constraint to be returned.
   * cell - <mxCell> whose constraint should be returned.
   * edge - Optional <mxCell> that represents the connection whose constraint
   * should be returned. Default is null.
   * source - Optional boolean that specifies if the connection is incoming
   * or outgoing. Default is null.
   */
  getConstraint(key: any, cell: any, edge: any, source: any): any;
  /**
   * Traverses the (directed) graph invoking the given function for each
   * visited vertex and edge. The function is invoked with the current vertex
   * and the incoming edge as a parameter. This implementation makes sure
   * each vertex is only visited once. The function may return false if the
   * traversal should stop at the given vertex.
   *
   * Example:
   *
   * (code)
   * mxLog.show();
   * var cell = graph.getSelectionCell();
   * graph.traverse(cell, false, function(vertex, edge)
   * {
   *   mxLog.debug(graph.getLabel(vertex));
   * });
   * (end)
   *
   * Parameters:
   *
   * vertex - <mxCell> that represents the vertex where the traversal starts.
   * directed - Optional boolean indicating if edges should only be traversed
   * from source to target. Default is true.
   * func - Visitor function that takes the current vertex and the incoming
   * edge as arguments. The traversal stops if the function returns false.
   * edge - Optional <mxCell> that represents the incoming edge. This is
   * null for the first step of the traversal.
   * visited - Optional <mxDictionary> of cell paths for the visited cells.
   */
  traverse(vertex: any, directed: any, func: any, edge: any, visited: any): void;
  /**
   * Returns a boolean indicating if the given <mxCell> is movable or
   * bendable by the algorithm. This implementation returns true if the given
   * cell is movable in the graph.
   *
   * Parameters:
   *
   * cell - <mxCell> whose movable state should be returned.
   */
  isVertexMovable(cell: any): any;
  /**
   * Returns a boolean indicating if the given <mxCell> should be ignored by
   * the algorithm. This implementation returns false for all vertices.
   *
   * Parameters:
   *
   * vertex - <mxCell> whose ignored state should be returned.
   */
  isVertexIgnored(vertex: any): boolean;
  /**
   * Returns a boolean indicating if the given <mxCell> should be ignored by
   * the algorithm. This implementation returns false for all vertices.
   *
   * Parameters:
   *
   * cell - <mxCell> whose ignored state should be returned.
   */
  isEdgeIgnored(edge: any): boolean;
  /**
   * Disables or enables the edge style of the given edge.
   */
  setEdgeStyleEnabled(edge: any, value: any): void;
  /**
   * Disables or enables orthogonal end segments of the given edge.
   */
  setOrthogonalEdge(edge: any, value: any): void;
  /**
   * Determines the offset of the given parent to the parent
   * of the layout
   */
  getParentOffset(parent: any): mxPoint;
  /**
   * Replaces the array of mxPoints in the geometry of the given edge
   * with the given array of mxPoints.
   */
  setEdgePoints(edge: any, points: any): void;
  /**
   * Sets the new position of the given cell taking into account the size of
   * the bounding box if <useBoundingBox> is true. The change is only carried
   * out if the new location is not equal to the existing location, otherwise
   * the geometry is not replaced with an updated instance. The new or old
   * bounds are returned (including overlapping labels).
   *
   * Parameters:
   *
   * cell - <mxCell> whose geometry is to be set.
   * x - Integer that defines the x-coordinate of the new location.
   * y - Integer that defines the y-coordinate of the new location.
   */
  setVertexLocation(cell: any, x: any, y: any): any;
  /**
   * Returns an <mxRectangle> that defines the bounds of the given cell or
   * the bounding box if <useBoundingBox> is true.
   */
  getVertexBounds(cell: any): mxRectangle;
  /**
   * Shortcut to <mxGraph.updateGroupBounds> with moveGroup set to true.
   */
  arrangeGroups(cells: any, border: any, topBorder: any, rightBorder: any, bottomBorder: any, leftBorder: any): any;
}
