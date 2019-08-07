/**
 * Implements a layout manager that runs a given layout after any changes to the graph:
 *
 * Example:
 *
 * (code)
 * var layoutMgr = new mxLayoutManager(graph);
 * layoutMgr.getLayout = function(cell)
 * {
 *   return layout;
 * };
 * (end)
 *
 * Event: mxEvent.LAYOUT_CELLS
 *
 * Fires between begin- and endUpdate after all cells have been layouted in
 * <layoutCells>. The <code>cells</code> property contains all cells that have
 * been passed to <layoutCells>.
 *
 * Constructor: mxLayoutManager
 *
 * Constructs a new automatic layout for the given graph.
 *
 * Arguments:
 *
 * graph - Reference to the enclosing graph.
 */
import {mxEventSource} from "./mx-event-source";

export interface mxLayoutManager extends mxEventSource {
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
  setEnabled(enabled: any): void;
  /**
   * Returns true if a layout should bubble, that is, if the parent layout
   * should be executed whenever a cell layout (layout of the children of
   * a cell) has been executed. This implementation returns <bubbling>.
   */
  isBubbling(): any;
  /**
   * Sets <bubbling>.
   */
  setBubbling(value: any): void;
  /**
   * Returns the graph that this layout operates on.
   */
  getGraph(): any;
  /**
   * Sets the graph that the layouts operate on.
   */
  setGraph(graph: any): void;
  /**
   * Returns the layout to be executed for the given graph and parent.
   */
  getLayout(parent: any): any;
  /**
   * Called from the undoHandler.
   *
   * Parameters:
   *
   * cell - Array of <mxCells> that have been moved.
   * evt - Mouse event that represents the mousedown.
   */
  beforeUndo(undoableEdit: any): void;
  /**
   * Executes the given layout on the given parent.
   */
  executeLayoutForCells(cells: any): void;
  /**
   * Called from the moveHandler.
   *
   * Parameters:
   *
   * cell - Array of <mxCells> that have been moved.
   * evt - Mouse event that represents the mousedown.
   */
  cellsMoved(cells: any, evt: any): void;
  /**
   * Returns the cells to be layouted for the given sequence of changes.
   */
  getCellsForChanges(changes: any): any[];
  /**
   * Executes all layouts which have been scheduled during the
   * changes.
   */
  getCellsForChange(change: any): any[];
  /**
   * Executes all layouts which have been scheduled during the
   * changes.
   */
  layoutCells(cells: any): void;
  /**
   * Executes the given layout on the given parent.
   */
  executeLayout(layout: any, parent: any): boolean;
  /**
   * Removes all handlers from the <graph> and deletes the reference to it.
   */
  destroy(): void;
}
