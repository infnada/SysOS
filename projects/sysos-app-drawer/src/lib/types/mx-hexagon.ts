/**
 * Implementation of the hexagon shape.
 *
 * Constructor: mxHexagon
 *
 * Constructs a new hexagon shape.
 */
import {mxActor} from "./mx-actor";

export interface mxHexagon extends mxActor {
  constructor();
  /**
   * Draws the path for this shape.
   */
  redrawPath(c: any, x: any, y: any, w: any, h: any): void;
}
