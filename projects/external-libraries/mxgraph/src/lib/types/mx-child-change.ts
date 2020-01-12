/**
 * Action to add or remove a child in a model.
 *
 * Constructor: mxChildChange
 *
 * Constructs a change of a child in the
 * specified model.
 */
import {mxCell} from './mx-cell';

export interface mxChildChange {
  parent: any;
  previous: any;
  child: mxCell;
  index: any;
  previousIndex: any;
  (model: any, parent: any, child: mxCell, index?: number): void;
  /**
   * Changes the parent of <child> using
   * <mxGraphModel.parentForCellChanged> and
   * removes or restores the cell's
   * connections.
   */
  execute(): void;
  /**
   * Disconnects the given cell recursively from its
   * terminals and stores the previous terminal in the
   * cell's terminals.
   */
  connect(cell: any, isConnect: any): void;
}
