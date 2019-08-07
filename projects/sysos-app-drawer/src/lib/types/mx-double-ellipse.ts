/**
 * Extends <mxShape> to implement a double ellipse shape. This shape is
 * registered under <mxConstants.SHAPE_DOUBLE_ELLIPSE> in <mxCellRenderer>.
 * Use the following override to only fill the inner ellipse in this shape:
 *
 * (code)
 * mxDoubleEllipse.prototype.paintVertexShape = function(c, x, y, w, h)
 * {
 *   c.ellipse(x, y, w, h);
 *   c.stroke();
 *
 *   var inset = mxUtils.getValue(this.style, mxConstants.STYLE_MARGIN, Math.min(3 + this.strokewidth, Math.min(w / 5, h / 5)));
 *   x += inset;
 *   y += inset;
 *   w -= 2 * inset;
 *   h -= 2 * inset;
 *
 *   if (w > 0 && h > 0)
 *   {
 *     c.ellipse(x, y, w, h);
 *   }
 *
 *   c.fillAndStroke();
 * };
 * (end)
 *
 * Constructor: mxDoubleEllipse
 *
 * Constructs a new ellipse shape.
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

export interface mxDoubleEllipse extends mxShape {
  constructor(bounds?: any, fill?: any, stroke?: any, strokewidth?: any);
  /**
   * Paints the background.
   */
  paintBackground(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Paints the foreground.
   */
  paintForeground(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Returns the bounds for the label.
   */
  getLabelBounds(rect: any): mxRectangle;
}
