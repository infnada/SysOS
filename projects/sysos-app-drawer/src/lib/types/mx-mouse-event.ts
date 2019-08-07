/**
 * Base class for all mouse events in mxGraph. A listener for this event should
 * implement the following methods:
 *
 * (code)
 * graph.addMouseListener(
 * {
 *   mouseDown: function(sender, evt)
 *   {
 *     mxLog.debug('mouseDown');
 *   },
 *   mouseMove: function(sender, evt)
 *   {
 *     mxLog.debug('mouseMove');
 *   },
 *   mouseUp: function(sender, evt)
 *   {
 *     mxLog.debug('mouseUp');
 *   }
 * });
 * (end)
 *
 * Constructor: mxMouseEvent
 *
 * Constructs a new event object for the given arguments.
 *
 * Parameters:
 *
 * evt - Native mouse event.
 * state - Optional <mxCellState> under the mouse.
 *
 */
export interface mxMouseEvent {
  constructor(evt: any, state: any);
  /**
   * Returns <evt>.
   */
  getEvent(): any;
  /**
   * Returns the target DOM element using <mxEvent.getSource> for <evt>.
   */
  getSource(): any;
  /**
   * Returns true if the given <mxShape> is the source of <evt>.
   */
  isSource(shape: any): any;
  /**
   * Returns <evt.clientX>.
   */
  getX(): any;
  /**
   * Returns <evt.clientY>.
   */
  getY(): any;
  /**
   * Returns <graphX>.
   */
  getGraphX(): any;
  /**
   * Returns <graphY>.
   */
  getGraphY(): any;
  /**
   * Returns <state>.
   */
  getState(): any;
  /**
   * Returns the <mxCell> in <state> is not null.
   */
  getCell(): any;
  /**
   * Returns true if the event is a popup trigger.
   */
  isPopupTrigger(): boolean;
  /**
   * Returns <consumed>.
   */
  isConsumed(): any;
  /**
   * Sets <consumed> to true and invokes preventDefault on the native event
   * if such a method is defined. This is used mainly to avoid the cursor from
   * being changed to a text cursor in Webkit. You can use the preventDefault
   * flag to disable this functionality.
   *
   * Parameters:
   *
   * preventDefault - Specifies if the native event should be canceled. Default
   * is true.
   */
  consume(preventDefault: any): void;
}
