/**
 * Event handler that listens to keystroke events. This is not a singleton,
 * however, it is normally only required once if the target is the document
 * element (default).
 *
 * This handler installs a key event listener in the topmost DOM node and
 * processes all events that originate from descandants of <mxGraph.container>
 * or from the topmost DOM node. The latter means that all unhandled keystrokes
 * are handled by this object regardless of the focused state of the <graph>.
 *
 * Example:
 *
 * The following example creates a key handler that listens to the delete key
 * (46) and deletes the selection cells if the graph is enabled.
 *
 * (code)
 * var keyHandler = new mxKeyHandler(graph);
 * keyHandler.bindKey(46, function(evt)
 * {
 *   if (graph.isEnabled())
 *   {
 *     graph.removeCells();
 *   }
 * });
 * (end)
 *
 * Keycodes:
 *
 * See http://tinyurl.com/yp8jgl or http://tinyurl.com/229yqw for a list of
 * keycodes or install a key event listener into the document element and print
 * the key codes of the respective events to the console.
 *
 * To support the Command key and the Control key on the Mac, the following
 * code can be used.
 *
 * (code)
 * keyHandler.getFunction = function(evt)
 * {
 *   if (evt != null)
 *   {
 *     return (mxEvent.isControlDown(evt) || (mxClient.IS_MAC && evt.metaKey)) ? this.controlKeys[evt.keyCode] : this.normalKeys[evt.keyCode];
 *   }
 *
 *   return null;
 * };
 * (end)
 *
 * Constructor: mxKeyHandler
 *
 * Constructs an event handler that executes functions bound to specific
 * keystrokes.
 *
 * Parameters:
 *
 * graph - Reference to the associated <mxGraph>.
 * target - Optional reference to the event target. If null, the document
 * element is used as the event target, that is, the object where the key
 * event listener is installed.
 */
export interface mxKeyHandler {
  constructor(graph: any, target?: any);
  /**
   * Returns true if events are handled. This implementation returns
   * <enabled>.
   */
  isEnabled(): any;
  /**
   * Enables or disables event handling by updating <enabled>.
   *
   * Parameters:
   *
   * enabled - Boolean that specifies the new enabled state.
   */
  setEnabled(enabled: any): void;
  /**
   * Binds the specified keycode to the given function. This binding is used
   * if the control key is not pressed.
   *
   * Parameters:
   *
   * code - Integer that specifies the keycode.
   * funct - JavaScript function that takes the key event as an argument.
   */
  bindKey(code: any, funct: any): void;
  /**
   * Binds the specified keycode to the given function. This binding is used
   * if the shift key is pressed.
   *
   * Parameters:
   *
   * code - Integer that specifies the keycode.
   * funct - JavaScript function that takes the key event as an argument.
   */
  bindShiftKey(code: any, funct: any): void;
  /**
   * Binds the specified keycode to the given function. This binding is used
   * if the control key is pressed.
   *
   * Parameters:
   *
   * code - Integer that specifies the keycode.
   * funct - JavaScript function that takes the key event as an argument.
   */
  bindControlKey(code: any, funct: any): void;
  /**
   * Binds the specified keycode to the given function. This binding is used
   * if the control and shift key are pressed.
   *
   * Parameters:
   *
   * code - Integer that specifies the keycode.
   * funct - JavaScript function that takes the key event as an argument.
   */
  bindControlShiftKey(code: any, funct: any): void;
  /**
   * Returns true if the control key is pressed. This uses <mxEvent.isControlDown>.
   *
   * Parameters:
   *
   * evt - Key event whose control key pressed state should be returned.
   */
  isControlDown(evt: any): boolean;
  /**
   * Returns the function associated with the given key event or null if no
   * function is associated with the given event.
   *
   * Parameters:
   *
   * evt - Key event whose associated function should be returned.
   */
  getFunction(evt: any): any;
  /**
   * Returns true if the event should be processed by this handler, that is,
   * if the event source is either the target, one of its direct children, a
   * descendant of the <mxGraph.container>, or the <mxGraph.cellEditor> of the
   * <graph>.
   *
   * Parameters:
   *
   * evt - Key event that represents the keystroke.
   */
  isGraphEvent(evt: any): any;
  /**
   * Handles the event by invoking the function bound to the respective keystroke
   * if <isEnabledForEvent> returns true for the given event and if
   * <isEventIgnored> returns false, except for escape for which
   * <isEventIgnored> is not invoked.
   *
   * Parameters:
   *
   * evt - Key event that represents the keystroke.
   */
  keyDown(evt: any): void;
  /**
   * Returns true if the given event should be handled. <isEventIgnored> is
   * called later if the event is not an escape key stroke, in which case
   * <escape> is called. This implementation returns true if <isEnabled>
   * returns true for both, this handler and <graph>, if the event is not
   * consumed and if <isGraphEvent> returns true.
   *
   * Parameters:
   *
   * evt - Key event that represents the keystroke.
   */
  isEnabledForEvent(evt: any): any;
  /**
   * Returns true if the given keystroke should be ignored. This returns
   * graph.isEditing().
   *
   * Parameters:
   *
   * evt - Key event that represents the keystroke.
   */
  isEventIgnored(evt: any): any;
  /**
   * Hook to process ESCAPE keystrokes. This implementation invokes
   * <mxGraph.stopEditing> to cancel the current editing, connecting
   * and/or other ongoing modifications.
   *
   * Parameters:
   *
   * evt - Key event that represents the keystroke. Possible keycode in this
   * case is 27 (ESCAPE).
   */
  escape(evt: any): void;
  /**
   * Destroys the handler and all its references into the DOM. This does
   * normally not need to be called, it is called automatically when the
   * window unloads (in IE).
   */
  destroy(): void;
}
