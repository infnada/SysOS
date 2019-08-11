/**
 * Binds keycodes to actionnames in an editor. This aggregates an internal
 * <handler> and extends the implementation of <mxKeyHandler.escape> to not
 * only cancel the editing, but also hide the properties dialog and fire an
 * <mxEditor.escape> event via <editor>. An instance of this class is created
 * by <mxEditor> and stored in <mxEditor.keyHandler>.
 *
 * Example:
 *
 * Bind the delete key to the delete action in an existing editor.
 *
 * (code)
 * var keyHandler = new mxDefaultKeyHandler(editor);
 * keyHandler.bindAction(46, 'delete');
 * (end)
 *
 * Codec:
 *
 * This class uses the <mxDefaultKeyHandlerCodec> to read configuration
 * data into an existing instance. See <mxDefaultKeyHandlerCodec> for a
 * description of the configuration format.
 *
 * Keycodes:
 *
 * See <mxKeyHandler>.
 *
 * An <mxEvent.ESCAPE> event is fired via the editor if the escape key is
 * pressed.
 *
 * Constructor: mxDefaultKeyHandler
 *
 * Constructs a new default key handler for the <mxEditor.graph> in the
 * given <mxEditor>. (The editor may be null if a prototypical instance for
 * a <mxDefaultKeyHandlerCodec> is created.)
 *
 * Parameters:
 *
 * editor - Reference to the enclosing <mxEditor>.
 */
export interface mxDefaultKeyHandler {
  (editor: any): void;
  /**
   * Binds the specified keycode to the given action in <editor>. The
   * optional control flag specifies if the control key must be pressed
   * to trigger the action.
   *
   * Parameters:
   *
   * code - Integer that specifies the keycode.
   * action - Name of the action to execute in <editor>.
   * control - Optional boolean that specifies if control must be pressed.
   * Default is false.
   */
  bindAction(code: any, action: any, control: any): void;
  /**
   * Destroys the <handler> associated with this object. This does normally
   * not need to be called, the <handler> is destroyed automatically when the
   * window unloads (in IE) by <mxEditor>.
   */
  destroy(): void;
}
