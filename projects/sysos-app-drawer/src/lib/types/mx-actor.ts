/**
 * Extends <mxShape> to implement an actor shape. If a custom shape with one
 * filled area is needed, then this shape's <redrawPath> should be overridden.
 *
 * Example:
 *
 * (code)
 * function SampleShape() { }
 *
 * SampleShape.prototype = new mxActor();
 * SampleShape.prototype.constructor = vsAseShape;
 *
 * mxCellRenderer.registerShape('sample', SampleShape);
 * SampleShape.prototype.redrawPath = function(path, x, y, w, h)
 * {
 *   path.moveTo(0, 0);
 *   path.lineTo(w, h);
 *   // ...
 *   path.close();
 * }
 * (end)
 *
 * This shape is registered under <mxConstants.SHAPE_ACTOR> in
 * <mxCellRenderer>.
 *
 * Constructor: mxActor
 *
 * Constructs a new actor shape.
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
import {mxShape} from './mx-shape';

export interface mxActor extends mxShape {
  (bounds?: any, fill?: any, stroke?: any, strokewidth?: any): void;
  /**
   * Redirects to redrawPath for subclasses to work.
   */
  paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Draws the path for this shape.
   */
  redrawPath(c: any, x: any, y: any, w: any, h: any): void;
}
