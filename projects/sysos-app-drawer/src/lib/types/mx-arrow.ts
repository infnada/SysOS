/**
 * Extends <mxShape> to implement an arrow shape. (The shape
 * is used to represent edges, not vertices.)
 * This shape is registered under <mxConstants.SHAPE_ARROW>
 * in <mxCellRenderer>.
 *
 * Constructor: mxArrow
 *
 * Constructs a new arrow shape.
 *
 * Parameters:
 *
 * points - Array of <mxPoints> that define the points. This is stored in
 * <mxShape.points>.
 * fill - String that defines the fill color. This is stored in <fill>.
 * stroke - String that defines the stroke color. This is stored in <stroke>.
 * strokewidth - Optional integer that defines the stroke width. Default is
 * 1. This is stored in <strokewidth>.
 * arrowWidth - Optional integer that defines the arrow width. Default is
 * <mxConstants.ARROW_WIDTH>. This is stored in <arrowWidth>.
 * spacing - Optional integer that defines the spacing between the arrow shape
 * and its endpoints. Default is <mxConstants.ARROW_SPACING>. This is stored in
 * <spacing>.
 * endSize - Optional integer that defines the size of the arrowhead. Default
 * is <mxConstants.ARROW_SIZE>. This is stored in <endSize>.
 */
import {mxShape} from "./mx-shape";

export interface mxArrow extends mxShape {
  constructor(points?: any, fill?: any, stroke?: any, strokewidth?: any, arrowWidth?: any, spacing?: any, endSize?: any);
  /**
   * Augments the bounding box with the edge width and markers.
   */
  augmentBoundingBox(bbox: any): void;
  /**
   * Paints the line shape.
   */
  paintEdgeShape(c: any, pts: any): void;
}
