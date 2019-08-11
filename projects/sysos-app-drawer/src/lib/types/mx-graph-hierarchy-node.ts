/**
 * An abstraction of a hierarchical edge for the hierarchy layout
 *
 * Constructor: mxGraphHierarchyNode
 *
 * Constructs an internal node to represent the specified real graph cell
 *
 * Arguments:
 *
 * cell - the real graph cell this node represents
 */
import {mxGraphAbstractHierarchyCell} from './mx-graph-abstract-hierarchy-cell';

export interface mxGraphHierarchyNode extends mxGraphAbstractHierarchyCell {
  (cell?: any): void;
  /**
   * Returns the integer value of the layer that this node resides in
   */
  getRankValue(layer: any): any;
  /**
   * Returns the cells this cell connects to on the next layer up
   */
  getNextLayerConnectedCells(layer: any): any;
  /**
   * Returns the cells this cell connects to on the next layer down
   */
  getPreviousLayerConnectedCells(layer: any): any;
  /**
   * Returns true.
   */
  isVertex(): boolean;
  /**
   * Gets the value of temp for the specified layer
   */
  getGeneralPurposeVariable(layer: any): any;
  /**
   * Set the value of temp for the specified layer
   */
  setGeneralPurposeVariable(layer: any, value: any): void;
  /**
   * Function: isAncestor
   */
  isAncestor(otherNode: any): boolean;
  /**
   * Gets the core vertex associated with this wrapper
   */
  getCoreCell(): any;
}
