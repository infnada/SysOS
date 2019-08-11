/**
 * Extends <mxActor> to implement a cloud shape.
 *
 * This shape is registered under <mxConstants.SHAPE_CLOUD> in
 * <mxCellRenderer>.
 *
 * Constructor: mxCloud
 *
 * Constructs a new cloud shape.
 *
 * Parameters:
 *
 * bounds - <mxRectangle> that defines the bounds. This is stored in
 * <mxShape.bounds>.
 * fill - String that defines the fill color. This is stored in <fill>.
 * stroke - String that defines the stroke color. This is stored in <stroke>.
 * strokewidth - Optional integer that defines the stroke width. Default is
 * 1. This is stored in <strokewidth>.
 */
import {mxActor} from './mx-actor';

export interface mxCloud extends mxActor {
  (bounds: any, fill: any, stroke: any, strokewidth: any): void;
  /**
   * Draws the path for this shape.
   */
  redrawPath(c: any, x: any, y: any, w: any, h: any): void;
}
