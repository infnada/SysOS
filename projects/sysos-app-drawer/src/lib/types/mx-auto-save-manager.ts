/**
 * Manager for automatically saving diagrams. The <save> hook must be
 * implemented.
 *
 * Example:
 *
 * (code)
 * var mgr = new mxAutoSaveManager(editor.graph);
 * mgr.save = function()
 * {
 *   mxLog.show();
 *   mxLog.debug('save');
 * };
 * (end)
 *
 * Constructor: mxAutoSaveManager
 *
 * Constructs a new automatic layout for the given graph.
 *
 * Arguments:
 *
 * graph - Reference to the enclosing graph.
 */
import {mxEventSource} from "./mx-event-source";

export interface mxAutoSaveManager extends mxEventSource {
  constructor(graph: any);
  /**
   * Returns true if events are handled. This implementation
   * returns <enabled>.
   */
  isEnabled(): any;
  /**
   * Enables or disables event handling. This implementation
   * updates <enabled>.
   *
   * Parameters:
   *
   * enabled - Boolean that specifies the new enabled state.
   */
  setEnabled(value: any): void;
  /**
   * Sets the graph that the layouts operate on.
   */
  setGraph(graph: any): void;
  /**
   * Empty hook that is called if the graph should be saved.
   */
  save(): void;
  /**
   * Invoked when the graph model has changed.
   */
  graphModelChanged(changes: any): void;
  /**
   * Resets all counters.
   */
  reset(): void;
  /**
   * Removes all handlers from the <graph> and deletes the reference to it.
   */
  destroy(): void;
}
