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
  constructor(model: any, cell: any, style: any);
  /**
   * Changes the style of <cell> to <previous> using
   * <mxGraphModel.styleForCellChanged>.
   */
  execute(): void;
}
