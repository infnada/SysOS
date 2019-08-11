/**
 * In-place editor for the graph. To control this editor, use
 * <mxGraph.invokesStopCellEditing>, <mxGraph.enterStopsCellEditing> and
 * <mxGraph.escapeEnabled>. If <mxGraph.enterStopsCellEditing> is true then
 * ctrl-enter or shift-enter can be used to create a linefeed. The F2 and
 * escape keys can always be used to stop editing.
 *
 * To customize the location of the textbox in the graph, override
 * <getEditorBounds> as follows:
 *
 * (code)
 * graph.cellEditor.getEditorBounds = function(state)
 * {
 *   var result = mxCellEditor.prototype.getEditorBounds.apply(this, arguments);
 *
 *   if (this.graph.getModel().isEdge(state.cell))
 *   {
 *     result.x = state.getCenterX() - result.width / 2;
 *     result.y = state.getCenterY() - result.height / 2;
 *   }
 *
 *   return result;
 * };
 * (end)
 *
 * Note that this hook is only called if <autoSize> is false. If <autoSize> is true,
 * then <mxShape.getLabelBounds> is used to compute the current bounds of the textbox.
 *
 * The textarea uses the mxCellEditor CSS class. You can modify this class in
 * your custom CSS. Note: You should modify the CSS after loading the client
 * in the page.
 *
 * Example:
 *
 * To only allow numeric input in the in-place editor, use the following code.
 *
 * (code)
 * var text = graph.cellEditor.textarea;
 *
 * mxEvent.addListener(text, 'keydown', function (evt)
 * {
 *   if (!(evt.keyCode >= 48 && evt.keyCode <= 57) &&
 *       !(evt.keyCode >= 96 && evt.keyCode <= 105))
 *   {
 *     mxEvent.consume(evt);
 *   }
 * });
 * (end)
 *
 * Placeholder:
 *
 * To implement a placeholder for cells without a label, use the
 * <emptyLabelText> variable.
 *
 * Resize in Chrome:
 *
 * Resize of the textarea is disabled by default. If you want to enable
 * this feature extend <init> and set this.textarea.style.resize = ''.
 *
 * To start editing on a key press event, the container of the graph
 * should have focus or a focusable parent should be used to add the
 * key press handler as follows.
 *
 * (code)
 * mxEvent.addListener(graph.container, 'keypress', mxUtils.bind(this, function(evt)
 * {
 *   if (!graph.isEditing() && !graph.isSelectionEmpty() && evt.which !== 0 &&
 *       !mxEvent.isAltDown(evt) && !mxEvent.isControlDown(evt) && !mxEvent.isMetaDown(evt))
 *   {
 *     graph.startEditing();
 *
 *     if (mxClient.IS_FF)
 *     {
 *       graph.cellEditor.textarea.value = String.fromCharCode(evt.which);
 *     }
 *   }
 * }));
 * (end)
 *
 * To allow focus for a DIV, and hence to receive key press events, some browsers
 * require it to have a valid tabindex attribute. In this case the following
 * code may be used to keep the container focused.
 *
 * (code)
 * var graphFireMouseEvent = graph.fireMouseEvent;
 * graph.fireMouseEvent = function(evtName, me, sender)
 * {
 *   if (evtName == mxEvent.MOUSE_DOWN)
 *   {
 *     this.container.focus();
 *   }
 *
 *   graphFireMouseEvent.apply(this, arguments);
 * };
 * (end)
 *
 * Constructor: mxCellEditor
 *
 * Constructs a new in-place editor for the specified graph.
 *
 * Parameters:
 *
 * graph - Reference to the enclosing <mxGraph>.
 */
import {mxRectangle} from './mx-rectangle';

export interface mxCellEditor {
  (graph: any): void;
  /**
   * Creates the <textarea> and installs the event listeners. The key handler
   * updates the <modified> state.
   */
  init(): void;
  /**
   * Called in <stopEditing> if cancel is false to invoke <mxGraph.labelChanged>.
   */
  applyValue(state: any, value: any): void;
  /**
   * Gets the initial editing value for the given cell.
   */
  getInitialValue(state: any, trigger: any): any;
  /**
   * Returns the current editing value.
   */
  getCurrentValue(state: any): any;
  /**
   * Installs listeners for focus, change and standard key event handling.
   */
  installListeners(elt: any): void;
  /**
   * Returns true if the given keydown event should stop cell editing. This
   * returns true if F2 is pressed of if <mxGraph.enterStopsCellEditing> is true
   * and enter is pressed without control or shift.
   */
  isStopEditingEvent(evt: any): boolean;
  /**
   * Returns true if this editor is the source for the given native event.
   */
  isEventSource(evt: any): boolean;
  /**
   * Returns <modified>.
   */
  resize(): void;
  /**
   * Called if the textarea has lost focus.
   */
  focusLost(): void;
  /**
   * Returns the background color for the in-place editor. This implementation
   * always returns null.
   */
  getBackgroundColor(state: any): any;
  /**
   * Starts the editor for the given cell.
   *
   * Parameters:
   *
   * cell - <mxCell> to start editing.
   * trigger - Optional mouse event that triggered the editor.
   */
  startEditing(cell: any, trigger: any): void;
  /**
   * Returns <selectText>.
   */
  isSelectText(): any;
  /**
   * Stops the editor and applies the value if cancel is false.
   */
  stopEditing(cancel: any): void;
  /**
   * Prepares the textarea for getting its value in <stopEditing>.
   * This implementation removes the extra trailing linefeed in Firefox.
   */
  prepareTextarea(): void;
  /**
   * Returns true if the label should be hidden while the cell is being
   * edited.
   */
  isHideLabel(state: any): boolean;
  /**
   * Returns the minimum width and height for editing the given state.
   */
  getMinimumSize(state: any): mxRectangle;
  /**
   * Returns the <mxRectangle> that defines the bounds of the editor.
   */
  getEditorBounds(state: any): mxRectangle;
  /**
   * Returns the initial label value to be used of the label of the given
   * cell is empty. This label is displayed and cleared on the first keystroke.
   * This implementation returns <emptyLabelText>.
   *
   * Parameters:
   *
   * cell - <mxCell> for which a text for an empty editing box should be
   * returned.
   */
  getEmptyLabelText(cell: any): any;
  /**
   * Returns the cell that is currently being edited or null if no cell is
   * being edited.
   */
  getEditingCell(): any;
  /**
   * Destroys the editor and removes all associated resources.
   */
  destroy(): void;
}
