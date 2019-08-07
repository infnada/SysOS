/**
 * Implements the selection model for a graph. Here is a listener that handles
 * all removed selection cells.
 *
 * (code)
 * graph.getSelectionModel().addListener(mxEvent.CHANGE, function(sender, evt)
 * {
 *   var cells = evt.getProperty('added');
 *
 *   for (var i = 0; i < cells.length; i++)
 *   {
 *     // Handle cells[i]...
 *   }
 * });
 * (end)
 *
 * Event: mxEvent.UNDO
 *
 * Fires after the selection was changed in <changeSelection>. The
 * <code>edit</code> property contains the <mxUndoableEdit> which contains the
 * <mxSelectionChange>.
 *
 * Event: mxEvent.CHANGE
 *
 * Fires after the selection changes by executing an <mxSelectionChange>. The
 * <code>added</code> and <code>removed</code> properties contain arrays of
 * cells that have been added to or removed from the selection, respectively.
 * The names are inverted due to historic reasons. This cannot be changed.
 */
import {mxEventSource} from "./mx-event-source";
import {mxGraph} from "./mx-graph";
import {mxCell} from "./mx-cell";

export interface mxGraphSelectionModel extends mxEventSource {
  /**
   * Specifies the resource key for the status message after a long operation.
   * If the resource for this key does not exist then the value is used as
   * the status message. Default is 'done'.
   */
  doneResource: string;
  /**
   * Specifies the resource key for the status message while the selection is
   * being updated. If the resource for this key does not exist then the
   * value is used as the status message. Default is 'updatingSelection'.
   */
  updatingSelectionResource: string;
  /**
   * Reference to the enclosing <mxGraph>.
   */
  graph: mxGraph;
  /**
   * Specifies if only one selected item at a time is allowed.
   * Default is false.
   */
  singleSelection: boolean;
  /**
   * Implicit variable declarations
   */
  cells: mxCell[];
  /**
   * Constructs a new graph selection model for the given <mxGraph>.
   *
   * @param graph - Reference to the enclosing <mxGraph>.
   */
  constructor(graph: mxGraph);
  /**
   * Returns <singleSelection> as a boolean.
   */
  isSingleSelection(): boolean;
  /**
   * Sets the <singleSelection> flag.
   *
   * @param singleSelection - Boolean that specifies the new value for
   * <singleSelection>.
   */
  setSingleSelection(singleSelection: boolean): void;
  /**
   * Returns true if the given <mxCell> is selected.
   */
  isSelected(cell: mxCell): boolean;
  /**
   * Returns true if no cells are currently selected.
   */
  isEmpty(): boolean;
  /**
   * Clears the selection and fires a <change> event if the selection was not
   * empty.
   */
  clear(): void;
  /**
   * Selects the specified <mxCell> using <setCells>.
   *
   * @param cell - <mxCell> to be selected.
   */
  setCell(cell: mxCell): void;
  /**
   * Selects the given array of <mxCells> and fires a <change> event.
   *
   * @param cells - Array of <mxCells> to be selected.
   */
  setCells(cells: mxCell[]): void;
  /**
   * Returns the first selectable cell in the given array of cells.
   */
  getFirstSelectableCell(cells: mxCell[]): mxCell;
  /**
   * Adds the given <mxCell> to the selection and fires a <select> event.
   *
   * @param cell - <mxCell> to add to the selection.
   */
  addCell(cell: mxCell): void;
  /**
   * Adds the given array of <mxCells> to the selection and fires a <select>
   * event.
   *
   * @param cells - Array of <mxCells> to add to the selection.
   */
  addCells(cells: mxCell[]): void;
  /**
   * Removes the specified <mxCell> from the selection and fires a <select>
   * event for the remaining cells.
   *
   * @param cell - <mxCell> to remove from the selection.
   */
  removeCell(cell: mxCell): void;
  /**
   * Function: removeCells
   */
  removeCells(cells: mxCell[]): void;
  /**
   * Inner callback to add the specified <mxCell> to the selection. No event
   * is fired in this implementation.
   */
  changeSelection(added: mxCell[], removed: mxCell[]): void;
  /**
   * Inner callback to add the specified <mxCell> to the selection. No event
   * is fired in this implementation.
   *
   * @param cell - <mxCell> to add to the selection.
   */
  cellAdded(cell: mxCell): void;
  /**
   * Inner callback to remove the specified <mxCell> from the selection. No
   * event is fired in this implementation.
   *
   * @param cell - <mxCell> to remove from the selection.
   */
  cellRemoved(cell: mxCell): void;
}
