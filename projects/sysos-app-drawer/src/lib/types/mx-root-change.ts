/**
 * Action to change the root in a model.
 *
 * Constructor: mxRootChange
 *
 * Constructs a change of the root in the
 * specified model.
 */
import {mxGraphModel} from "./mx-graph-model";
import {mxCell} from "./mx-cell";

export interface mxRootChange {
  model: mxGraphModel;
  root: any;
  previous: mxCell;
  constructor(model: any, root: any);
  /**
   * Carries out a change of the root using
   * <mxGraphModel.rootChanged>.
   */
  execute(): void;
}
