/**
 * Sets the horizontal locations of node and edge dummy nodes on each layer.
 * Uses median down and up weighings as well as heuristics to straighten edges as
 * far as possible.
 *
 * Constructor: mxCoordinateAssignment
 *
 * Creates a coordinate assignment.
 *
 * Arguments:
 *
 * intraCellSpacing - the minimum buffer between cells on the same rank
 * interRankCellSpacing - the minimum distance between cells on adjacent ranks
 * orientation - the position of the root node(s) relative to the graph
 * initialX - the leftmost coordinate node placement starts at
 */
import {mxHierarchicalLayoutStage} from "./mx-hierarchical-layout-stage";

export interface mxCoordinateAssignment extends mxHierarchicalLayoutStage {
  constructor(layout: any, intraCellSpacing: any, interRankCellSpacing: any, orientation: any, initialX: any, parallelEdgeSpacing: any);
  /**
   * Utility method to display current positions
   */
  printStatus(): void;
  /**
   * A basic horizontal coordinate assignment algorithm
   */
  execute(parent: any): void;
  /**
   * Performs one median positioning sweep in both directions
   */
  minNode(model: any): void;
  /**
   * Performs one median positioning sweep in one direction
   *
   * Parameters:
   *
   * i - the iteration of the whole process
   * model - an internal model of the hierarchical layout
   */
  medianPos(i: any, model: any): void;
  /**
   * Performs median minimisation over one rank.
   *
   * Parameters:
   *
   * rankValue - the layer number of this rank
   * model - an internal model of the hierarchical layout
   * nextRankValue - the layer number whose connected cels are to be laid out
   * relative to
   */
  rankMedianPosition(rankValue: any, model: any, nextRankValue: any): void;
  /**
   * Calculates the priority the specified cell has based on the type of its
   * cell and the cells it is connected to on the next layer
   *
   * Parameters:
   *
   * currentCell - the cell whose weight is to be calculated
   * collection - the cells the specified cell is connected to
   */
  calculatedWeightedValue(currentCell: any, collection: any): number;
  /**
   * Calculates the median position of the connected cell on the specified
   * rank
   *
   * Parameters:
   *
   * connectedCells - the cells the candidate connects to on this level
   * rankValue - the layer number of this rank
   */
  medianXValue(connectedCells: any, rankValue: any): any;
  /**
   * Sets up the layout in an initial positioning. The ranks are all centered
   * as much as possible along the middle vertex in each rank. The other cells
   * are then placed as close as possible on either side.
   *
   * Parameters:
   *
   * facade - the facade describing the input graph
   * model - an internal model of the hierarchical layout
   */
  initialCoords(facade: any, model: any): void;
  /**
   * Sets up the layout in an initial positioning. All the first cells in each
   * rank are moved to the left and the rest of the rank inserted as close
   * together as their size and buffering permits. This method works on just
   * the specified rank.
   *
   * Parameters:
   *
   * rankValue - the current rank being processed
   * graph - the facade describing the input graph
   * model - an internal model of the hierarchical layout
   */
  rankCoordinates(rankValue: any, graph: any, model: any): void;
  /**
   * Calculates the width rank in the hierarchy. Also set the y value of each
   * rank whilst performing the calculation
   *
   * Parameters:
   *
   * graph - the facade describing the input graph
   * model - an internal model of the hierarchical layout
   */
  calculateWidestRank(graph: any, model: any): void;
  /**
   * Straightens out chains of virtual nodes where possibleacade to those stored after this layout
   * processing step has completed.
   *
   * Parameters:
   *
   * graph - the facade describing the input graph
   * model - an internal model of the hierarchical layout
   */
  minPath(graph: any, model: any): void;
  /**
   * Determines whether or not a node may be moved to the specified x
   * position on the specified rank
   *
   * Parameters:
   *
   * model - the layout model
   * cell - the cell being analysed
   * rank - the layer of the cell
   * position - the x position being sought
   */
  repositionValid(model: any, cell: any, rank: any, position: any): boolean;
  /**
   * Sets the cell locations in the facade to those stored after this layout
   * processing step has completed.
   *
   * Parameters:
   *
   * graph - the input graph
   * model - the layout model
   */
  setCellLocations(graph: any, model: any): void;
  /**
   * Separates the x position of edges as they connect to vertices
   *
   * Parameters:
   *
   * model - the layout model
   */
  localEdgeProcessing(model: any): void;
  /**
   * Fixes the control points
   */
  setEdgePosition(cell: any): void;
  /**
   * Fixes the position of the specified vertex.
   *
   * Parameters:
   *
   * cell - the vertex to position
   */
  setVertexLocation(cell: any): void;
  /**
   * Hook to add additional processing
   *
   * Parameters:
   *
   * edge - the hierarchical model edge
   * realEdge - the real edge in the graph
   */
  processReversedEdge(graph: any, model: any): void;
}
