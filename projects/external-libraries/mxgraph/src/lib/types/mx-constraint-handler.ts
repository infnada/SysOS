/**
 * Handles constraints on connection targets. This class is in charge of
 * showing fixed points when the mouse is over a vertex and handles constraints
 * to establish new connections.
 *
 * Constructor: mxConstraintHandler
 *
 * Constructs an new constraint handler.
 *
 * Parameters:
 *
 * graph - Reference to the enclosing <mxGraph>.
 * factoryMethod - Optional function to create the edge. The function takes
 * the source and target <mxCell> as the first and second argument and
 * returns the <mxCell> that represents the new edge.
 */
import {mxRectangleShape} from './mx-rectangle-shape';

export interface mxConstraintHandler {
  (graph: any): void;
  /**
   * Returns true if events are handled. This implementation
   * returns <enabled>.
   */
  isEnabled(): any;
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
   * Resets the state of this handler.
   */
  reset(): void;
  /**
   * Returns the tolerance to be used for intersecting connection points. This
   * implementation returns <mxGraph.tolerance>.
   *
   * Parameters:
   *
   * me - <mxMouseEvent> whose tolerance should be returned.
   */
  getTolerance(me: any): any;
  /**
   * Returns the tolerance to be used for intersecting connection points.
   */
  getImageForConstraint(state: any, constraint: any, point: any): any;
  /**
   * Returns true if the given <mxMouseEvent> should be ignored in <update>. This
   * implementation always returns false.
   */
  isEventIgnored(me: any, source: any): boolean;
  /**
   * Returns true if the given state should be ignored. This always returns false.
   */
  isStateIgnored(state: any, source: any): boolean;
  /**
   * Destroys the <focusIcons> if they exist.
   */
  destroyIcons(): void;
  /**
   * Destroys the <focusHighlight> if one exists.
   */
  destroyFocusHighlight(): void;
  /**
   * Returns true if the current focused state should not be changed for the given event.
   * This returns true if shift and alt are pressed.
   */
  isKeepFocusEvent(me: any): boolean;
  /**
   * Returns the cell for the given event.
   */
  getCellForEvent(me: any, point: any): any;
  /**
   * Updates the state of this handler based on the given <mxMouseEvent>.
   * Source is a boolean indicating if the cell is a source or target.
   */
  update(me: any, source: any, existingEdge: any, point: any): void;
  /**
   * Transfers the focus to the given state as a source or target terminal. If
   * the handler is not enabled then the outline is painted, but the constraints
   * are ignored.
   */
  redraw(): void;
  /**
   * Transfers the focus to the given state as a source or target terminal. If
   * the handler is not enabled then the outline is painted, but the constraints
   * are ignored.
   */
  setFocus(me: any, state: any, source: any): void;
  /**
   * Create the shape used to paint the highlight.
   *
   * Returns true if the given icon intersects the given point.
   */
  createHighlightShape(): mxRectangleShape;
  /**
   * Returns true if the given icon intersects the given rectangle.
   */
  intersects(icon: any, mouse: any, source: any, existingEdge: any): any;
  /**
   * Destroy this handler.
   */
  destroy(): void;
}
