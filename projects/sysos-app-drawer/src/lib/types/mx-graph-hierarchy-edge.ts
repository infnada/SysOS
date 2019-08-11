/**
 * An abstraction of a hierarchical edge for the hierarchy layout
 *
 * Constructor: mxGraphHierarchyEdge
 *
 * Constructs a hierarchy edge
 *
 * Arguments:
 *
 * edges - a list of real graph edges this abstraction represents
 */
import {mxGraphAbstractHierarchyCell} from './mx-graph-abstract-hierarchy-cell';

export interface mxGraphHierarchyEdge extends mxGraphAbstractHierarchyCell {
  (edges?: any): void;
  /**
   * Inverts the direction of this internal edge(s)
   */
  invert(layer: any): void;
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
  isEdge(): boolean;
  /**
   * Gets the value of temp for the specified layer
   */
  getGeneralPurposeVariable(layer: any): any;
  /**
   * Set the value of temp for the specified layer
   */
  setGeneralPurposeVariable(layer: any, value: any): void;
  /**
   * Gets the first core edge associated with this wrapper
   */
  getCoreCell(): any;
}
