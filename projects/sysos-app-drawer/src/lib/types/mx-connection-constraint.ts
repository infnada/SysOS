/**
 * Defines an object that contains the constraints about how to connect one
 * side of an edge to its terminal.
 */
import {mxPoint} from "./mx-point";

export interface mxConnectionConstraint {
  /**
   * <mxPoint> that specifies the fixed location of the connection point.
   */
  point: any;
  /**
   * Boolean that specifies if the point should be projected onto the perimeter
   * of the terminal.
   */
  perimeter: any;
  /**
   * Optional string that specifies the name of the constraint.
   */
  name: any;
  /**
   * Constructs a new connection constraint for the given point and boolean
   * arguments.
   *
   * @param point - Optional <mxPoint> that specifies the fixed location of the point
   * in relative coordinates. Default is null.
   * @param perimeter - Optional boolean that specifies if the fixed point should be
   * projected onto the perimeter of the terminal. Default is true.
   * @param name - Optional
   */
  constructor(point?: mxPoint, perimeter?: boolean, name?: string);
}
