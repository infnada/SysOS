/**
 * Action to change a terminal in a model.
 *
 * Constructor: mxTerminalChange
 *
 * Constructs a change of a terminal in the
 * specified model.
 */
import {mxCell} from "./mx-cell";

export interface mxTerminalChange {
  model: any;
  cell: mxCell;
  terminal: any;
  previous: mxCell;
  source: any;
  constructor(model: any, cell: any, terminal: any, source: any);
  /**
   * Changes the terminal of <cell> to <previous> using
   * <mxGraphModel.terminalForCellChanged>.
   */
  execute(): void;
}
