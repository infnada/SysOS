/**
 * Action to change a cell's style in a model.
 *
 * Constructor: mxStyleChange
 *
 * Constructs a change of a style in the
 * specified model.
 */
export interface mxStyleChange {
  model: any;
  cell: any;
  style: any;
  previous: any;
  (model: any, cell: any, style: any): void;
  /**
   * Changes the style of <cell> to <previous> using
   * <mxGraphModel.styleForCellChanged>.
   */
  execute(): void;
}
