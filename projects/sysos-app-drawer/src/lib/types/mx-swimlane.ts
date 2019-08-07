/**
 * Extends <mxShape> to implement a swimlane shape. This shape is registered
 * under <mxConstants.SHAPE_SWIMLANE> in <mxCellRenderer>. Use the
 * <mxConstants.STYLE_STYLE_STARTSIZE> to define the size of the title
 * region, <mxConstants.STYLE_SWIMLANE_FILLCOLOR> for the content area fill,
 * <mxConstants.STYLE_SEPARATORCOLOR> to draw an additional vertical separator
 * and <mxConstants.STYLE_SWIMLANE_LINE> to hide the line between the title
 * region and the content area. The <mxConstants.STYLE_HORIZONTAL> affects
 * the orientation of this shape, not only its label.
 *
 * Constructor: mxSwimlane
 *
 * Constructs a new swimlane shape.
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
import {mxRectangle} from "./mx-rectangle";

export interface mxSwimlane extends mxShape {
  constructor(bounds?: any, fill?: any, stroke?: any, strokewidth?: any);
  /**
   * Returns the bounding box for the gradient box for this shape.
   */
  getTitleSize(): number;
  /**
   * Returns the bounding box for the gradient box for this shape.
   */
  getLabelBounds(rect: any): mxRectangle;
  /**
   * Returns the bounding box for the gradient box for this shape.
   */
  getGradientBounds(c: any, x: any, y: any, w: any, h: any): mxRectangle;
  /**
   * Returns the arcsize for the swimlane.
   */
  getArcSize(w: any, h: any, start?: any): number;
  /**
   * Paints the swimlane vertex shape.
   */
  isHorizontal(): boolean;
  /**
   * Paints the swimlane vertex shape.
   */
  paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Paints the swimlane vertex shape.
   */
  paintSwimlane(c: any, x: any, y: any, w: any, h: any, start: any, fill: any, swimlaneLine: any): void;
  /**
   * Paints the swimlane vertex shape.
   */
  paintRoundedSwimlane(c: any, x: any, y: any, w: any, h: any, start: any, r: any, fill: any, swimlaneLine: any): void;
  /**
   * Paints the swimlane vertex shape.
   */
  paintSeparator(c: any, x: any, y: any, w: any, h: any, start: any, color: any): void;
  /**
   * Paints the swimlane vertex shape.
   */
  getImageBounds(x: any, y: any, w: any, h: any): mxRectangle;
}
