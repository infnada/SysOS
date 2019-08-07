/**
 * Implements a command history. When changing the graph model, an
 * <mxUndoableChange> object is created at the start of the transaction (when
 * model.beginUpdate is called). All atomic changes are then added to this
 * object until the last model.endUpdate call, at which point the
 * <mxUndoableEdit> is dispatched in an event, and added to the history inside
 * <mxUndoManager>. This is done by an event listener in
 * <mxEditor.installUndoHandler>.
 *
 * Each atomic change of the model is represented by an object (eg.
 * <mxRootChange>, <mxChildChange>, <mxTerminalChange> etc) which contains the
 * complete undo information. The <mxUndoManager> also listens to the
 * <mxGraphView> and stores it's changes to the current root as insignificant
 * undoable changes, so that drilling (step into, step up) is undone.
 *
 * This means when you execute an atomic change on the model, then change the
 * current root on the view and click undo, the change of the root will be
 * undone together with the change of the model so that the display represents
 * the state at which the model was changed. However, these changes are not
 * transmitted for sharing as they do not represent a state change.
 *
 * Example:
 *
 * When adding an undo manager to a graph, make sure to add it
 * to the model and the view as well to maintain a consistent
 * display across multiple undo/redo steps.
 *
 * (code)
 * var undoManager = new mxUndoManager();
 * var listener = function(sender, evt)
 * {
 *   undoManager.undoableEditHappened(evt.getProperty('edit'));
 * };
 * graph.getModel().addListener(mxEvent.UNDO, listener);
 * graph.getView().addListener(mxEvent.UNDO, listener);
 * (end)
 *
 * The code creates a function that informs the undoManager
 * of an undoable edit and binds it to the undo event of
 * <mxGraphModel> and <mxGraphView> using
 * <mxEventSource.addListener>.
 *
 * Event: mxEvent.CLEAR
 *
 * Fires after <clear> was invoked. This event has no properties.
 *
 * Event: mxEvent.UNDO
 *
 * Fires afer a significant edit was undone in <undo>. The <code>edit</code>
 * property contains the <mxUndoableEdit> that was undone.
 *
 * Event: mxEvent.REDO
 *
 * Fires afer a significant edit was redone in <redo>. The <code>edit</code>
 * property contains the <mxUndoableEdit> that was redone.
 *
 * Event: mxEvent.ADD
 *
 * Fires after an undoable edit was added to the history. The <code>edit</code>
 * property contains the <mxUndoableEdit> that was added.
 *
 * Constructor: mxUndoManager
 *
 * Constructs a new undo manager with the given history size. If no history
 * size is given, then a default size of 100 steps is used.
 */
import {mxEventSource} from "./mx-event-source";

export interface mxUndoManager extends mxEventSource {
  constructor(size: any);
  /**
   * Returns true if the history is empty.
   */
  isEmpty(): boolean;
  /**
   * Clears the command history.
   */
  clear(): void;
  /**
   * Returns true if an undo is possible.
   */
  canUndo(): boolean;
  /**
   * Undoes the last change.
   */
  undo(): void;
  /**
   * Returns true if a redo is possible.
   */
  canRedo(): boolean;
  /**
   * Redoes the last change.
   */
  redo(): void;
  /**
   * Method to be called to add new undoable edits to the <history>.
   */
  undoableEditHappened(undoableEdit: any): void;
  /**
   * Removes all pending steps after <indexOfNextAdd> from the history,
   * invoking die on each edit. This is called from <undoableEditHappened>.
   */
  trim(): void;
}
