/**
 * Action to change a user object in a model.
 *
 * Constructor: mxValueChange
 *
 * Constructs a change of a user object in the
 * specified model.
 */
export interface mxValueChange {
  model: any;
  cell: any;
  value: any;
  previous: any;
  constructor(model: any, cell: any, value: any);
  /**
   * Changes the value of <cell> to <previous> using
   * <mxGraphModel.valueForCellChanged>.
   */
  execute(): void;
}
