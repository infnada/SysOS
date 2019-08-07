/**
 * Extends <mxShape> to implement an image shape with a label.
 * This shape is registered under <mxConstants.SHAPE_LABEL> in
 * <mxCellRenderer>.
 *
 * Constructor: mxLabel
 *
 * Constructs a new label shape.
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
import {mxRectangleShape} from "./mx-rectangle-shape";
import {mxRectangle} from "./mx-rectangle";

export interface mxLabel extends mxRectangleShape {
  constructor(bounds: any, fill: any, stroke: any, strokewidth: any);
  /**
   * Initializes the shape and the <indicator>.
   */
  init(container: any): void;
  /**
   * Reconfigures this shape. This will update the colors of the indicator
   * and reconfigure it if required.
   */
  redraw(): void;
  /**
   * Returns true for non-rounded, non-rotated shapes with no glass gradient and
   * no indicator shape.
   */
  isHtmlAllowed(): boolean;
  /**
   * Generic background painting implementation.
   */
  paintForeground(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Generic background painting implementation.
   */
  paintImage(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Generic background painting implementation.
   */
  getImageBounds(x: any, y: any, w: any, h: any): mxRectangle;
  /**
   * Generic background painting implementation.
   */
  paintIndicator(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Generic background painting implementation.
   */
  getIndicatorBounds(x: any, y: any, w: any, h: any): mxRectangle;
  /**
   * Generic background painting implementation.
   */
  redrawHtmlShape(): void;
}
