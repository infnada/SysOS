/**
 * Extends <mxShape> to implement an cylinder shape. If a
 * custom shape with one filled area and an overlay path is
 * needed, then this shape's <redrawPath> should be overridden.
 * This shape is registered under <mxConstants.SHAPE_CYLINDER>
 * in <mxCellRenderer>.
 *
 * Constructor: mxCylinder
 *
 * Constructs a new cylinder shape.
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
import {mxShape} from "./mx-shape";

export interface mxCylinder extends mxShape {
  constructor(bounds?: any, fill?: any, stroke?: any, strokewidth?: any);
  /**
   * Redirects to redrawPath for subclasses to work.
   */
  paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Draws the path for this shape.
   */
  redrawPath(c: any, x: any, y: any, w: any, h: any, isForeground: any): void;
}
