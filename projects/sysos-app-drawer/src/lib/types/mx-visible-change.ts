/**
 * Action to change a cell's visible state in a model.
 *
 * Constructor: mxVisibleChange
 *
 * Constructs a change of a visible state in the
 * specified model.
 */
export interface mxVisibleChange {
  model: any;
  cell: any;
  visible: any;
  previous: any;
  constructor(model: any, cell: any, visible: any);
  /**
   * Changes the visible state of <cell> to <previous> using
   * <mxGraphModel.visibleStateForCellChanged>.
   */
  execute(): void;
}
