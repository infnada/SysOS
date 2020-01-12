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
  (model: any, cell: any, value: any): void;
  /**
   * Changes the value of <cell> to <previous> using
   * <mxGraphModel.valueForCellChanged>.
   */
  execute(): void;
}
