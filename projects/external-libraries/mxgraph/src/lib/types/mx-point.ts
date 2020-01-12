/**
 * Implements a 2-dimensional vector with double precision coordinates.
 */
export interface mxPoint {
  /**
   * Constructs a new point for the optional x and y coordinates, relative to
   * the top left corner. If no coordinates are given, then the default values
   * for <x> and <y> are used.
   */
  (x?: number, y?: number): void;
  /**
   * Holds the x-coordinate of the point. Default is 0.
   * @desc Relative to left corner.
   */
  x: number;
  /**
   * Holds the y-coordinate of the point. Default is 0.
   * @desc Relative to top.
   */
  y: number;
  /**
   * Returns true if the given object equals this point.
   */
  equals(obj: mxPoint): boolean;
  /**
   * Returns a clone of this <mxPoint>.
   */
  clone(): any;
}
