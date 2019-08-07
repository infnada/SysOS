/**
 * Creates a temporary set of cell states.
 */
export interface mxTemporaryCellStates {
  constructor(view: any, scale: any, cells: any, isCellVisibleFn: any, getLinkForCellState: any);
  /**
   * Returns the top, left corner as a new <mxPoint>.
   */
  destroy(): void;
}
