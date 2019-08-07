/**
 * Implementation of the triangle shape.
 *
 * Constructor: mxTriangle
 *
 * Constructs a new triangle shape.
 */
import {mxActor} from "./mx-actor";

export interface mxTriangle extends mxActor {
  constructor();
  /**
   * Draws the path for this shape.
   */
  redrawPath(c: any, x: any, y: any, w: any, h: any): void;
}
