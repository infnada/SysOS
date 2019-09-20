/**
 * An abstraction of an internal hierarchy node or edge
 *
 * Constructor: mxGraphAbstractHierarchyCell
 *
 * Constructs a new hierarchical layout algorithm.
 *
 * Arguments:
 *
 * graph - Reference to the enclosing <mxGraph>.
 * deterministic - Optional boolean that specifies if this layout should be
 * deterministic. Default is true.
 */
export interface mxGraphAbstractHierarchyCell {
  (): void;
  /**
   * Returns the cells this cell connects to on the next layer up
   */
  getNextLayerConnectedCells(layer: any): any;
  /**
   * Returns the cells this cell connects to on the next layer down
   */
  getPreviousLayerConnectedCells(layer: any): any;
  /**
   * Returns whether or not this cell is an edge
   */
  isEdge(): boolean;
  /**
   * Returns whether or not this cell is a node
   */
  isVertex(): boolean;
  /**
   * Gets the value of temp for the specified layer
   */
  getGeneralPurposeVariable(layer: any): any;
  /**
   * Set the value of temp for the specified layer
   */
  setGeneralPurposeVariable(layer: any, value: any): any;
  /**
   * Set the value of x for the specified layer
   */
  setX(layer: any, value: any): void;
  /**
   * Gets the value of x on the specified layer
   */
  getX(layer: any): any;
  /**
   * Set the value of y for the specified layer
   */
  setY(layer: any, value: any): void;
}
