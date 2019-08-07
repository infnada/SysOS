/**
 * Sets the horizontal locations of node and edge dummy nodes on each layer.
 * Uses median down and up weighings as well heuristic to straighten edges as
 * far as possible.
 *
 * Constructor: mxMedianHybridCrossingReduction
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

export interface mxMedianHybridCrossingReduction extends mxHierarchicalLayoutStage {
  constructor(layout: any);
  /**
   * Performs a vertex ordering within ranks as described by Gansner et al
   * 1993
   */
  execute(parent: any): void;
  /**
   * Calculates the total number of edge crossing in the current graph.
   * Returns the current number of edge crossings in the hierarchy graph
   * model in the current candidate layout
   *
   * Parameters:
   *
   * model - the internal model describing the hierarchy
   */
  calculateCrossings(model: any): number;
  /**
   * Calculates the number of edges crossings between the specified rank and
   * the rank below it. Returns the number of edges crossings with the rank
   * beneath
   *
   * Parameters:
   *
   * i -  the topmost rank of the pair ( higher rank value )
   * model - the internal model describing the hierarchy
   */
  calculateRankCrossing(i: any, model: any): number;
  /**
   * Takes each possible adjacent cell pair on each rank and checks if
   * swapping them around reduces the number of crossing
   *
   * Parameters:
   *
   * mainLoopIteration - the iteration number of the main loop
   * model - the internal model describing the hierarchy
   */
  transpose(mainLoopIteration: any, model: any): void;
  /**
   * Sweeps up or down the layout attempting to minimise the median placement
   * of connected cells on adjacent ranks
   *
   * Parameters:
   *
   * iteration - the iteration number of the main loop
   * model - the internal model describing the hierarchy
   */
  weightedMedian(iteration: any, model: any): void;
  /**
   * Attempts to minimise the median placement of connected cells on this rank
   * and one of the adjacent ranks
   *
   * Parameters:
   *
   * rankValue - the layer number of this rank
   * downwardSweep - whether or not this is a downward sweep through the graph
   */
  medianRank(rankValue: any, downwardSweep: any): void;
  /**
   * Calculates the median rank order positioning for the specified cell using
   * the connected cells on the specified rank. Returns the median rank
   * ordering value of the connected cells
   *
   * Parameters:
   *
   * connectedCells - the cells on the specified rank connected to the
   * specified cell
   * rankValue - the rank that the connected cell lie upon
   */
  medianValue(connectedCells: any, rankValue: any): any;
}
