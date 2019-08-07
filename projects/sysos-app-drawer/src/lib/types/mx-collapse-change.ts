/**
 * Action to change a cell's collapsed state in a model.
 *
 * Constructor: mxCollapseChange
 *
 * Constructs a change of a collapsed state in the
 * specified model.
 */
export interface mxCollapseChange {
  model: any;
  cell: any;
  collapsed: any;
  previous: any;
  constructor(model: any, cell: any, collapsed: any);
  /**
   * Changes the collapsed state of <cell> to <previous> using
   * <mxGraphModel.collapsedStateForCellChanged>.
   */
  execute(): void;
}
