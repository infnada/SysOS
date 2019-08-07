/**
 * Event handler that pans and creates popupmenus. To use the left
 * mousebutton for panning without interfering with cell moving and
 * resizing, use <isUseLeftButton> and <isIgnoreCell>. For grid size
 * steps while panning, use <useGrid>. This handler is built-into
 * <mxGraph.panningHandler> and enabled using <mxGraph.setPanning>.
 *
 * Event: mxEvent.PAN_START
 *
 * Fires when the panning handler changes its <active> state to true. The
 * <code>event</code> property contains the corresponding <mxMouseEvent>.
 *
 * Event: mxEvent.PAN
 *
 * Fires while handle is processing events. The <code>event</code> property contains
 * the corresponding <mxMouseEvent>.
 *
 * Event: mxEvent.PAN_END
 *
 * Fires when the panning handler changes its <active> state to false. The
 * <code>event</code> property contains the corresponding <mxMouseEvent>.
 */
import {mxEventSource} from "./mx-event-source";
import {mxGraph} from "./mx-graph";

export interface mxPanningHandler extends mxEventSource {
  /**
   * Reference to the enclosing <mxGraph>.
   */
  graph: mxGraph;
  /**
   * Specifies if panning should be active for the left mouse button.
   * Setting this to true may conflict with <mxRubberband>. Default is false.
   */
  useLeftButtonForPanning: boolean;
  /**
   * Specifies if <mxEvent.isPopupTrigger> should also be used for panning.
   */
  usePopupTrigger: boolean;
  /**
   * Specifies if panning should be active even if there is a cell under the
   * mousepointer. Default is false.
   */
  ignoreCell: boolean;
  /**
   * Specifies if the panning should be previewed. Default is true.
   */
  previewEnabled: boolean;
  /**
   * Specifies if the panning steps should be aligned to the grid size.
   * Default is false.
   */
  useGrid: boolean;
  /**
   * Specifies if panning should be enabled. Default is true.
   */
  panningEnabled: boolean;
  /**
   * Specifies if pinch gestures should be handled as zoom. Default is true.
   */
  pinchEnabled: boolean;
  /**
   * Specifies the maximum scale. Default is 8.
   */
  maxScale: number;
  /**
   * Specifies the minimum scale. Default is 0.01.
   */
  minScale: number;
  /**
   * Holds the current horizontal offset.
   */
  dx: number;
  /**
   * Holds the current vertical offset.
   */
  dy: number;
  /**
   * Holds the x-coordinate of the start point.
   */
  startX: number;
  /**
   * Holds the y-coordinate of the start point.
   */
  startY: number;
  /**
   * Implicit variable declarations
   */
  forcePanningHandler: any;
  panningTrigger: any;
  gestureHandler: any;
  /** True if the handler is currently active. */
  active: boolean;
  initialScale: any;
  mouseDownEvent: any;
  dx0: number;
  dy0: number;
  /**
   * Constructs an event handler that creates a <mxPopupMenu>
   * and pans the graph.
   */
  constructor(graph: mxGraph);
  /**
   * Returns true if the handler is currently active.
   */
  isActive(): boolean;
  /**
   * Returns <panningEnabled>.
   */
  isPanningEnabled(): boolean;
  /**
   * Sets <panningEnabled>.
   */
  setPanningEnabled(value: boolean): void;
  /**
   * Returns <pinchEnabled>.
   */
  isPinchEnabled(): boolean;
  /**
   * Sets <pinchEnabled>.
   */
  setPinchEnabled(value: boolean): void;
  /**
   * Returns true if the given event is a panning trigger for the optional
   * given cell. This returns true if control-shift is pressed or if
   * <usePopupTrigger> is true and the event is a popup trigger.
   */
  isPanningTrigger(me: any): boolean;
  /**
   * Returns true if the given <mxMouseEvent> should start panning. This
   * implementation always returns true if <ignoreCell> is true or for
   * multi touch events.
   */
  isForcePanningEvent(me: any): boolean;
  /**
   * Handles the event by initiating the panning. By consuming the event all
   * subsequent events of the gesture are redirected to this handler.
   */
  mouseDown(sender: any, me: any): void;
  /**
   * Starts panning at the given event.
   */
  start(me: any): void;
  /**
   * Consumes the given <mxMouseEvent> if it was a panning trigger in
   * <mouseDown>. The default is to invoke <mxMouseEvent.consume>. Note that this
   * will block any further event processing. If you haven't disabled built-in
   * context menus and require immediate selection of the cell on mouseDown in
   * Safari and/or on the Mac, then use the following code:
   *
   * (code)
   * mxPanningHandler.prototype.consumePanningTrigger = function(me)
   * {
   *   if (me.evt.preventDefault)
   *   {
   *     me.evt.preventDefault();
   *   }
   *
   *   // Stops event processing in IE
   *   me.evt.returnValue = false;
   *
   *   // Sets local consumed state
   *   if (!mxClient.IS_SF && !mxClient.IS_MAC)
   *   {
   *     me.consumed = true;
   *   }
   * };
   * (end)
   */
  consumePanningTrigger(me: any): void;
  /**
   * Handles the event by updating the panning on the graph.
   */
  mouseMove(sender: any, me: any): void;
  /**
   * Handles the event by setting the translation on the view or showing the
   * popupmenu.
   */
  mouseUp(sender: any, me: any): void;
  /**
   * Pans <graph> by the given amount.
   */
  panGraph(dx: number, dy: number): void;
  /**
   * Destroys the handler and all its resources and DOM nodes.
   */
  destroy(): void;
}
