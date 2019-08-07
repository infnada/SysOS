/**
 * A helper class to process mouse locations and highlight cells.
 *
 * Helper class to highlight cells. To add a cell marker to an existing graph
 * for highlighting all cells, the following code is used:
 *
 * (code)
 * var marker = new mxCellMarker(graph);
 * graph.addMouseListener({
 *   mouseDown: function() {},
 *   mouseMove: function(sender, me)
 *   {
 *     marker.process(me);
 *   },
 *   mouseUp: function() {}
 * });
 * (end)
 *
 * Event: mxEvent.MARK
 *
 * Fires after a cell has been marked or unmarked. The <code>state</code>
 * property contains the marked <mxCellState> or null if no state is marked.
 *
 * Constructor: mxCellMarker
 *
 * Constructs a new cell marker.
 *
 * Parameters:
 *
 * graph - Reference to the enclosing <mxGraph>.
 * validColor - Optional marker color for valid states. Default is
 * <mxConstants.DEFAULT_VALID_COLOR>.
 * invalidColor - Optional marker color for invalid states. Default is
 * <mxConstants.DEFAULT_INVALID_COLOR>.
 * hotspot - Portion of the width and hight where a state intersects a
 * given coordinate pair. A value of 0 means always highlight. Default is
 * <mxConstants.DEFAULT_HOTSPOT>.
 */
import {mxEventSource} from "./mx-event-source";

export interface mxCellMarker extends mxEventSource {
  constructor(graph?: any, validColor?: any, invalidColor?: any, hotspot?: any);
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
   * Returns true if events are handled. This implementation
   * returns <enabled>.
   */
  isEnabled(): any;
  /**
   * Sets the <hotspot>.
   */
  setHotspot(hotspot: any): void;
  /**
   * Returns the <hotspot>.
   */
  getHotspot(): any;
  /**
   * Specifies whether the hotspot should be used in <intersects>.
   */
  setHotspotEnabled(enabled: any): void;
  /**
   * Returns true if hotspot is used in <intersects>.
   */
  isHotspotEnabled(): any;
  /**
   * Returns true if <validState> is not null.
   */
  hasValidState(): boolean;
  /**
   * Returns the <validState>.
   */
  getValidState(): any;
  /**
   * Returns the <markedState>.
   */
  getMarkedState(): any;
  /**
   * Resets the state of the cell marker.
   */
  reset(): void;
  /**
   * Processes the given event and cell and marks the state returned by
   * <getState> with the color returned by <getMarkerColor>. If the
   * markerColor is not null, then the state is stored in <markedState>. If
   * <isValidState> returns true, then the state is stored in <validState>
   * regardless of the marker color. The state is returned regardless of the
   * marker color and valid state.
   */
  process(me: any): any;
  /**
   * Sets and marks the current valid state.
   */
  setCurrentState(state: any, me: any, color: any): void;
  /**
   * Marks the given cell using the given color, or <validColor> if no color is specified.
   */
  markCell(cell: any, color: any): void;
  /**
   * Marks the <markedState> and fires a <mark> event.
   */
  mark(): void;
  /**
   * Hides the marker and fires a <mark> event.
   */
  unmark(): void;
  /**
   * Returns true if the given <mxCellState> is a valid state. If this
   * returns true, then the state is stored in <validState>. The return value
   * of this method is used as the argument for <getMarkerColor>.
   */
  isValidState(state: any): boolean;
  /**
   * Returns the valid- or invalidColor depending on the value of isValid.
   * The given <mxCellState> is ignored by this implementation.
   */
  getMarkerColor(evt: any, state: any, isValid: any): any;
  /**
   * Uses <getCell>, <getStateToMark> and <intersects> to return the
   * <mxCellState> for the given <mxMouseEvent>.
   */
  getState(me: any): any;
  /**
   * Returns the <mxCell> for the given event and cell. This returns the
   * given cell.
   */
  getCell(me: any): any;
  /**
   * Returns the <mxCellState> to be marked for the given <mxCellState> under
   * the mouse. This returns the given state.
   */
  getStateToMark(state: any): any;
  /**
   * Returns true if the given coordinate pair intersects the given state.
   * This returns true if the <hotspot> is 0 or the coordinates are inside
   * the hotspot for the given cell state.
   */
  intersects(state: any, me: any): any;
  /**
   * Destroys the handler and all its resources and DOM nodes.
   */
  destroy(): void;
}
