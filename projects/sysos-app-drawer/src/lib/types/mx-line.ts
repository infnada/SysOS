/**
 * Extends <mxShape> to implement a horizontal line shape.
 * This shape is registered under <mxConstants.SHAPE_LINE> in
 * <mxCellRenderer>.
 *
 * Constructor: mxLine
 *
 * Constructs a new line shape.
 *
 * Parameters:
 *
 * bounds - <mxRectangle> that defines the bounds. This is stored in
 * <mxShape.bounds>.
 * stroke - String that defines the stroke color. Default is 'black'. This is
 * stored in <stroke>.
 * strokewidth - Optional integer that defines the stroke width. Default is
 * 1. This is stored in <strokewidth>.
 */
import {mxShape} from './mx-shape';

export interface mxLine extends mxShape {
  (bounds?: any, stroke?: any, strokewidth?: any): void;
  /**
   * Redirects to redrawPath for subclasses to work.
   */
  paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
}
