/**
 * Defines invalid connections along with the error messages that they produce.
 * To add or remove rules on a graph, you must add/remove instances of this
 * class to <mxGraph.multiplicities>.
 *
 * Example:
 *
 * (code)
 * graph.multiplicities.push(new mxMultiplicity(
 *   true, 'rectangle', null, null, 0, 2, ['circle'],
 *   'Only 2 targets allowed',
 *   'Only circle targets allowed'));
 * (end)
 *
 * Defines a rule where each rectangle must be connected to no more than 2
 * circles and no other types of targets are allowed.
 */
export interface mxMultiplicity {
  /**
   * Defines the type of the source or target terminal. The type is a string
   * passed to <mxUtils.isNode> together with the source or target vertex
   * value as the first argument.
   */
  type: any;
  /**
   * Optional string that specifies the attributename to be passed to
   * <mxUtils.isNode> to check if the rule applies to a cell.
   */
  attr: any;
  /**
   * Optional string that specifies the value of the attribute to be passed
   * to <mxUtils.isNode> to check if the rule applies to a cell.
   */
  value: any;
  /**
   * Boolean that specifies if the rule is applied to the source or target
   * terminal of an edge.
   */
  source: any;
  /**
   * Defines the minimum number of connections for which this rule applies.
   * Default is 0.
   */
  min: any;
  /**
   * Defines the maximum number of connections for which this rule applies.
   * A value of 'n' means unlimited times. Default is 'n'.
   */
  max: any;
  /**
   * Holds an array of strings that specify the type of neighbor for which
   * this rule applies. The strings are used in <mxCell.is> on the opposite
   * terminal to check if the rule applies to the connection.
   */
  validNeighbors: any;
  /**
   * Boolean indicating if the list of validNeighbors are those that are allowed
   * for this rule or those that are not allowed for this rule.
   */
  validNeighborsAllowed: boolean;
  /**
   * Holds the localized error message to be displayed if the number of
   * connections for which the rule applies is smaller than <min> or greater
   * than <max>.
   */
  countError: any;
  /**
   * Holds the localized error message to be displayed if the type of the
   * neighbor for a connection does not match the rule.
   */
  typeError: any;
  /**
   * Instantiate class mxMultiplicity in order to describe allowed
   * connections in a graph. Not all constraints can be enforced while
   * editing, some must be checked at validation time. The <countError> and
   * <typeError> are treated as resource keys in <mxResources>.
   *
   * @param source - Boolean indicating if this rule applies to the source or target
   * terminal.
   * @param type - Type of the source or target terminal that this rule applies to.
   * See <type> for more information.
   * @param attr - Optional attribute name to match the source or target terminal.
   * @param value - Optional attribute value to match the source or target terminal.
   * @param min - Minimum number of edges for this rule. Default is 1.
   * @param max - Maximum number of edges for this rule. n means infinite. Default
   * is n.
   * @param validNeighbors - Array of types of the opposite terminal for which this
   * rule applies.
   * @param countError - Error to be displayed for invalid number of edges.
   * @param typeError - Error to be displayed for invalid opposite terminals.
   * @param validNeighborsAllowed - Optional boolean indicating if the array of
   * opposite types should be valid or invalid.
   */
  (source: boolean, type: any, attr: any, value: any, min: number, max: number | 'n', validNeighbors: any, countError: string, typeError: string, validNeighborsAllowed?: boolean): void;
  /**
   * Checks the multiplicity for the given arguments and returns the error
   * for the given connection or null if the multiplicity does not apply.
   *
   * graph - Reference to the enclosing <mxGraph> instance.
   * edge - <mxCell> that represents the edge to validate.
   * source - <mxCell> that represents the source terminal.
   * target - <mxCell> that represents the target terminal.
   * sourceOut - Number of outgoing edges from the source terminal.
   * targetIn - Number of incoming edges for the target terminal.
   */
  check(graph: any, edge: any, source: any, target: any, sourceOut: any, targetIn: any): string;
  /**
   * Checks if there are any valid neighbours in <validNeighbors>. This is only
   * called if <validNeighbors> is a non-empty array.
   */
  checkNeighbors(graph: any, edge: any, source: any, target: any): boolean;
  /**
   * Checks the given terminal cell and returns true if this rule applies. The
   * given cell is the source or target of the given edge, depending on
   * <source>. This implementation uses <checkType> on the terminal's value.
   */
  checkTerminal(graph: any, terminal: any, edge: any): any;
  /**
   * Checks the type of the given value.
   */
  checkType(graph: any, value: any, type: any, attr: any, attrValue: any): any;
}
