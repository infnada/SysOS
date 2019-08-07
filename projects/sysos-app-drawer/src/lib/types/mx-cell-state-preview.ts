/**
 *
 * Implements a live preview for moving cells.
 *
 * Constructor: mxCellStatePreview
 *
 * Constructs a move preview for the given graph.
 *
 * Parameters:
 *
 * graph - Reference to the enclosing <mxGraph>.
 */
export interface mxCellStatePreview {
  constructor(graph: any);
  /**
   * Returns true if this contains no entries.
   */
  isEmpty(): boolean;
  /**
   * Function: moveState
   */
  moveState(state: any, dx: any, dy: any, add: any, includeEdges: any): any;
  /**
   * Function: show
   */
  show(visitor: any): void;
  /**
   * Function: translateState
   */
  translateState(state: any, dx: any, dy: any): void;
  /**
   * Function: revalidateState
   */
  revalidateState(state: any, dx: any, dy: any, visitor: any): void;
  /**
   * Function: addEdges
   */
  addEdges(state: any): void;
}
