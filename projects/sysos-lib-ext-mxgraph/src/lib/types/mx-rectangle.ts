/**
 * Extends <mxPoint> to implement a 2-dimensional rectangle with double
 * precision coordinates.
 */
import {mxPoint} from './mx-point';

export interface mxRectangle extends mxPoint {
  /**
   * Constructs a new rectangle for the optional parameters. If no parameters
   * are given then the respective default values are used.
   *
   * @param x X-coordinate of the rectangle origin (top left corner)
   * @param y Y-coordinate of the rectangle origin (top left corner)
   * @param width Width of the rectangle
   * @param height Height of the rectangle
   */
  (x?: number, y?: number, width?: number, height?: number): void;
  /**
   * Holds the width of the rectangle. Default is 0.
   */
  width: number;
  /**
   * Holds the height of the rectangle. Default is 0.
   */
  height: number;
  /**
   * Sets this rectangle to the specified values
   *
   * @param x X-coordinate of the rectangle origin (top left corner)
   * @param y Y-coordinate of the rectangle origin (top left corner)
   * @param w Width of the rectangle
   * @param h Height of the rectangle
   */
  setRect(x: number, y: number, w: number, h: number): void;
  /**
   * Returns the x-coordinate of the center point.
   */
  getCenterX(): number;
  /**
   * Returns the y-coordinate of the center point.
   */
  getCenterY(): number;
  /**
   * Adds the given rectangle to this rectangle, i.e. such that it just
   * about contains the supplied rectangle.
   */
  add(rect: mxRectangle): void;
  /**
   * Changes this rectangle to where it overlaps with the given rectangle.
   */
  intersect(rect: mxRectangle): void;
  /**
   * Grows the rectangle by the given amount, that is, this method subtracts
   * the given amount from the x- and y-coordinates and adds twice the amount
   * to the width and height.
   */
  grow(amount: number): void;
  /**
   * Returns the top, left corner as a new <mxPoint>.
   */
  getPoint(): mxPoint;
  /**
   * Rotates this rectangle by 90 degree around its center point.
   */
  rotate90(): void;
  /**
   * Returns true if the given object equals this rectangle.
   */
  equals(obj: mxRectangle): boolean;
  /**
   * Returns a new <mxRectangle> which is a copy of the given rectangle.
   */
  fromRectangle(rect: mxRectangle): mxRectangle;
}
