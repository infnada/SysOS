/**
 * Graph event handler that displays tooltips. <mxGraph.getTooltip> is used to
 * get the tooltip for a cell or handle. This handler is built-into
 * <mxGraph.tooltipHandler> and enabled using <mxGraph.setTooltips>.
 *
 * Example:
 *
 * (code>
 * new mxTooltipHandler(graph);
 * (end)
 *
 * Constructor: mxTooltipHandler
 *
 * Constructs an event handler that displays tooltips with the specified
 * delay (in milliseconds). If no delay is specified then a default delay
 * of 500 ms (0.5 sec) is used.
 *
 * Parameters:
 *
 * graph - Reference to the enclosing <mxGraph>.
 * delay - Optional delay in milliseconds.
 */
export interface mxTooltipHandler {
  constructor(graph: any, delay?: number);
  /**
   * Returns true if events are handled. This implementation
   * returns <enabled>.
   */
  isEnabled(): any;
  /**
   * Enables or disables event handling. This implementation
   * updates <enabled>.
   */
  setEnabled(enabled: any): void;
  /**
   * Returns <hideOnHover>.
   */
  isHideOnHover(): any;
  /**
   * Sets <hideOnHover>.
   */
  setHideOnHover(value: any): void;
  /**
   * Initializes the DOM nodes required for this tooltip handler.
   */
  init(): void;
  /**
   * Handles the event by initiating a rubberband selection. By consuming the
   * event all subsequent events of the gesture are redirected to this
   * handler.
   */
  mouseDown(sender: any, me: any): void;
  /**
   * Handles the event by updating the rubberband selection.
   */
  mouseMove(sender: any, me: any): void;
  /**
   * Handles the event by resetting the tooltip timer or hiding the existing
   * tooltip.
   */
  mouseUp(sender: any, me: any): void;
  /**
   * Resets the timer.
   */
  resetTimer(): void;
  /**
   * Resets and/or restarts the timer to trigger the display of the tooltip.
   */
  reset(me: any, restart: any): void;
  /**
   * Hides the tooltip and resets the timer.
   */
  hide(): void;
  /**
   * Hides the tooltip.
   */
  hideTooltip(): void;
  /**
   * Shows the tooltip for the specified cell and optional index at the
   * specified location (with a vertical offset of 10 pixels).
   */
  show(tip: any, x: any, y: any): void;
  /**
   * Destroys the handler and all its resources and DOM nodes.
   */
  destroy(): void;
}
