/**
 * Extends <mxShape> to implement a rhombus (aka diamond) shape.
 * This shape is registered under <mxConstants.SHAPE_RHOMBUS>
 * in <mxCellRenderer>.
 *
 * Constructor: mxRhombus
 *
 * Constructs a new rhombus shape.
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

export interface mxRhombus extends mxShape {
  constructor(bounds?: any, fill?: any, stroke?: any, strokewidth?: any);
  /**
   * Generic painting implementation.
   */
  paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
}
