/**
 * Implements a composite undoable edit. Here is an example for a custom change
 * which gets executed via the model:
 *
 * (code)
 * function CustomChange(model, name)
 * {
 *   this.model = model;
 *   this.name = name;
 *   this.previous = name;
 * };
 *
 * CustomChange.prototype.execute = function()
 * {
 *   var tmp = this.model.name;
 *   this.model.name = this.previous;
 *   this.previous = tmp;
 * };
 *
 * var name = prompt('Enter name');
 * graph.model.execute(new CustomChange(graph.model, name));
 * (end)
 *
 * Event: mxEvent.EXECUTED
 *
 * Fires between START_EDIT and END_EDIT after an atomic change was executed.
 * The <code>change</code> property contains the change that was executed.
 *
 * Event: mxEvent.START_EDIT
 *
 * Fires before a set of changes will be executed in <undo> or <redo>.
 * This event contains no properties.
 *
 * Event: mxEvent.END_EDIT
 *
 * Fires after a set of changeswas executed in <undo> or <redo>.
 * This event contains no properties.
 */
export interface mxUndoableEdit {
  /**
   * Specifies the source of the edit.
   */
  source: any;
  /**
   * Array that contains the changes that make up this edit. The changes are
   * expected to either have an undo and redo function, or an execute
   * function. Default is an empty array.
   */
  changes: any[];
  /**
   * Specifies if the undoable change is significant.
   * Default is true.
   */
  significant: boolean;
  /**
   * Specifies if this edit has been undone. Default is false.
   */
  undone: boolean;
  /**
   * Specifies if this edit has been redone. Default is false.
   */
  redone: boolean;
  /**
   * Constructs a new undoable edit for the given source.
   */
  (source: any, significant?: boolean): void;
  /**
   * Returns true if the this edit contains no changes.
   */
  isEmpty(): boolean;
  /**
   * Returns <significant>.
   */
  isSignificant(): boolean;
  /**
   * Adds the specified change to this edit. The change is an object that is
   * expected to either have an undo and redo, or an execute function.
   */
  add(change: any): void;
  /**
   * Hook to notify any listeners of the changes after an <undo> or <redo>
   * has been carried out. This implementation is empty.
   */
  notify(): void;
  /**
   * Hook to free resources after the edit has been removed from the command
   * history. This implementation is empty.
   */
  die(): void;
  /**
   * Undoes all changes in this edit.
   */
  undo(): void;
  /**
   * Redoes all changes in this edit.
   */
  redo(): void;
}
