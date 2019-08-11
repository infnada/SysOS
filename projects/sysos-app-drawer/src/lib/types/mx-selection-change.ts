/**
 * Action to change the current root in a view.
 */
import {mxGraphSelectionModel} from './mx-graph-selection-model';
import {mxCell} from './mx-cell';

export interface mxSelectionChange {
  selectionModel: mxGraphSelectionModel;
  added: mxCell[];
  removed: mxCell[];
  /**
   * Constructs a change of the current root in the given view.
   */
  (selectionModel: mxGraphSelectionModel, added: mxCell[], removed: mxCell[]): void;
  /**
   * Changes the current root of the view.
   */
  execute(): void;
}
