/**
 * Implements a single custom handle for vertices.
 *
 * Constructor: mxHandle
 *
 * Constructs a new handle for the given state.
 *
 * Parameters:
 *
 * state - <mxCellState> of the cell to be handled.
 */
import {mxRectangleShape} from './mx-rectangle-shape';

export interface mxHandle {
  (state: any, cursor: any, image: any): void;
  /**
   * Hook for subclassers to return the current position of the handle.
   */
  getPosition(bounds: any): void;
  /**
   * Hooks for subclassers to update the style in the <state>.
   */
  setPosition(bounds: any, pt: any, me: any): void;
  /**
   * Hook for subclassers to execute the handle.
   */
  execute(): void;
  /**
   * Sets the cell style with the given name to the corresponding value in <state>.
   */
  copyStyle(key: any): void;
  /**
   * Processes the given <mxMouseEvent> and invokes <setPosition>.
   */
  processEvent(me: any): void;
  /**
   * Called after <setPosition> has been called in <processEvent>. This repaints
   * the state using <mxCellRenderer>.
   */
  positionChanged(): void;
  /**
   * Returns the rotation defined in the style of the cell.
   */
  getRotation(): any;
  /**
   * Returns the rotation from the style and the rotation from the direction of
   * the cell.
   */
  getTotalRotation(): any;
  /**
   * Creates and initializes the shapes required for this handle.
   */
  init(): void;
  /**
   * Creates and returns the shape for this handle.
   */
  createShape(html: any): mxRectangleShape;
  /**
   * Initializes <shape> and sets its cursor.
   */
  initShape(html: any): void;
  /**
   * Renders the shape for this handle.
   */
  redraw(): void;
  /**
   * Returns true if this handle should be rendered in HTML. This returns true if
   * the text node is in the graph container.
   */
  isHtmlRequired(): boolean;
  /**
   * Rotates the point by the given angle.
   */
  rotatePoint(pt: any, alpha: any): any;
  /**
   * Flips the given point vertically and/or horizontally.
   */
  flipPoint(pt: any): any;
  /**
   * Snaps the given point to the grid if ignore is false. This modifies
   * the given point in-place and also returns it.
   */
  snapPoint(pt: any, ignore: any): any;
  /**
   * Shows or hides this handle.
   */
  setVisible(visible: any): void;
  /**
   * Resets the state of this handle by setting its visibility to true.
   */
  reset(): void;
  /**
   * Destroys this handle.
   */
  destroy(): void;
}
