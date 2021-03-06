/**
 * An implementation of the first stage of the Sugiyama layout. Straightforward
 * longest path calculation of layer assignment
 *
 * Constructor: mxSwimlaneOrdering
 *
 * Creates a cycle remover for the given internal model.
 */
import {mxHierarchicalLayoutStage} from './mx-hierarchical-layout-stage';

export interface mxSwimlaneOrdering extends mxHierarchicalLayoutStage {
  (layout: any): void;
  /**
   * Takes the graph detail and configuration information within the facade
   * and creates the resulting laid out graph within that facade for further
   * use.
   */
  execute(parent: any): void;
}
