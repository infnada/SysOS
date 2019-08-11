/**
 * Creates a temporary set of cell states.
 */
export interface mxTemporaryCellStates {
  (view: any, scale: any, cells: any, isCellVisibleFn: any, getLinkForCellState: any): void;
  /**
   * Returns the top, left corner as a new <mxPoint>.
   */
  destroy(): void;
}
