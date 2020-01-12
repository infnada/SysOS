/**
 * Base class for all canvases. The following methods make up the public
 * interface of the canvas 2D for all painting in mxGraph:
 *
 * - <save>, <restore>
 * - <scale>, <translate>, <rotate>
 * - <setAlpha>, <setFillAlpha>, <setStrokeAlpha>, <setFillColor>, <setGradient>,
 *   <setStrokeColor>, <setStrokeWidth>, <setDashed>, <setDashPattern>, <setLineCap>,
 *   <setLineJoin>, <setMiterLimit>
 * - <setFontColor>, <setFontBackgroundColor>, <setFontBorderColor>, <setFontSize>,
 *   <setFontFamily>, <setFontStyle>
 * - <setShadow>, <setShadowColor>, <setShadowAlpha>, <setShadowOffset>
 * - <rect>, <roundrect>, <ellipse>, <image>, <text>
 * - <begin>, <moveTo>, <lineTo>, <quadTo>, <curveTo>
 * - <stroke>, <fill>, <fillAndStroke>
 *
 * <mxAbstractCanvas2D.arcTo> is an additional method for drawing paths. This is
 * a synthetic method, meaning that it is turned into a sequence of curves by
 * default. Subclassers may add native support for arcs.
 *
 * Constructor: mxXmlCanvas2D
 *
 * Constructs a new abstract canvas.
 */
import {mxAbstractCanvas2D} from './mx-abstract-canvas-2d';

export interface mxXmlCanvas2D extends mxAbstractCanvas2D {
  (root?: any): void;
  /**
   * Writes the rendering defaults to <root>:
   */
  writeDefaults(): void;
  /**
   * Returns a formatted number with 2 decimal places.
   */
  format(value: any): number;
  /**
   * Creates the given element using the owner document of <root>.
   */
  createElement(name: any): any;
  /**
   * Saves the drawing state.
   */
  save(): void;
  /**
   * Restores the drawing state.
   */
  restore(): void;
  /**
   * Scales the output.
   *
   * Parameters:
   *
   * scale - Number that represents the scale where 1 is equal to 100%.
   */
  scale(value: any): void;
  /**
   * Translates the output.
   *
   * Parameters:
   *
   * dx - Number that specifies the horizontal translation.
   * dy - Number that specifies the vertical translation.
   */
  translate(dx: any, dy: any): void;
  /**
   * Rotates and/or flips the output around a given center. (Note: Due to
   * limitations in VML, the rotation cannot be concatenated.)
   *
   * Parameters:
   *
   * theta - Number that represents the angle of the rotation (in degrees).
   * flipH - Boolean indicating if the output should be flipped horizontally.
   * flipV - Boolean indicating if the output should be flipped vertically.
   * cx - Number that represents the x-coordinate of the rotation center.
   * cy - Number that represents the y-coordinate of the rotation center.
   */
  rotate(theta: any, flipH: any, flipV: any, cx: any, cy: any): void;
  /**
   * Sets the current alpha.
   *
   * Parameters:
   *
   * value - Number that represents the new alpha. Possible values are between
   * 1 (opaque) and 0 (transparent).
   */
  setAlpha(value: any): void;
  /**
   * Sets the current fill alpha.
   *
   * Parameters:
   *
   * value - Number that represents the new fill alpha. Possible values are between
   * 1 (opaque) and 0 (transparent).
   */
  setFillAlpha(value: any): void;
  /**
   * Sets the current stroke alpha.
   *
   * Parameters:
   *
   * value - Number that represents the new stroke alpha. Possible values are between
   * 1 (opaque) and 0 (transparent).
   */
  setStrokeAlpha(value: any): void;
  /**
   * Sets the current fill color.
   *
   * Parameters:
   *
   * value - Hexadecimal representation of the color or 'none'.
   */
  setFillColor(value: any): void;
  /**
   * Sets the gradient. Note that the coordinates may be ignored by some implementations.
   *
   * Parameters:
   *
   * color1 - Hexadecimal representation of the start color.
   * color2 - Hexadecimal representation of the end color.
   * x - X-coordinate of the gradient region.
   * y - y-coordinate of the gradient region.
   * w - Width of the gradient region.
   * h - Height of the gradient region.
   * direction - One of <mxConstants.DIRECTION_NORTH>, <mxConstants.DIRECTION_EAST>,
   * <mxConstants.DIRECTION_SOUTH> or <mxConstants.DIRECTION_WEST>.
   * alpha1 - Optional alpha of the start color. Default is 1. Possible values
   * are between 1 (opaque) and 0 (transparent).
   * alpha2 - Optional alpha of the end color. Default is 1. Possible values
   * are between 1 (opaque) and 0 (transparent).
   */
  setGradient(color1: any, color2: any, x: any, y: any, w: any, h: any, direction: any, alpha1: any, alpha2: any): void;
  /**
   * Sets the current stroke color.
   *
   * Parameters:
   *
   * value - Hexadecimal representation of the color or 'none'.
   */
  setStrokeColor(value: any): void;
  /**
   * Sets the current stroke width.
   *
   * Parameters:
   *
   * value - Numeric representation of the stroke width.
   */
  setStrokeWidth(value: any): void;
  /**
   * Enables or disables dashed lines.
   *
   * Parameters:
   *
   * value - Boolean that specifies if dashed lines should be enabled.
   * value - Boolean that specifies if the stroke width should be ignored
   * for the dash pattern. Default is false.
   */
  setDashed(value: any, fixDash: any): void;
  /**
   * Sets the current dash pattern. Default is '3 3'.
   *
   * Parameters:
   *
   * value - String that represents the dash pattern, which is a sequence of
   * numbers defining the length of the dashes and the length of the spaces
   * between the dashes. The lengths are relative to the line width - a length
   * of 1 is equals to the line width.
   */
  setDashPattern(value: any): void;
  /**
   * Sets the line cap. Default is 'flat' which corresponds to 'butt' in SVG.
   *
   * Parameters:
   *
   * value - String that represents the line cap. Possible values are flat, round
   * and square.
   */
  setLineCap(value: any): void;
  /**
   * Sets the line join. Default is 'miter'.
   *
   * Parameters:
   *
   * value - String that represents the line join. Possible values are miter,
   * round and bevel.
   */
  setLineJoin(value: any): void;
  /**
   * Sets the miter limit. Default is 10.
   *
   * Parameters:
   *
   * value - Number that represents the miter limit.
   */
  setMiterLimit(value: any): void;
  /**
   * Sets the current font color. Default is '#000000'.
   *
   * Parameters:
   *
   * value - Hexadecimal representation of the color or 'none'.
   */
  setFontColor(value: any): void;
  /**
   * Sets the current font background color.
   *
   * Parameters:
   *
   * value - Hexadecimal representation of the color or 'none'.
   */
  setFontBackgroundColor(value: any): void;
  /**
   * Sets the current font border color.
   *
   * Parameters:
   *
   * value - Hexadecimal representation of the color or 'none'.
   */
  setFontBorderColor(value: any): void;
  /**
   * Sets the current font size. Default is <mxConstants.DEFAULT_FONTSIZE>.
   *
   * Parameters:
   *
   * value - Numeric representation of the font size.
   */
  setFontSize(value: any): void;
  /**
   * Sets the current font family. Default is <mxConstants.DEFAULT_FONTFAMILY>.
   *
   * Parameters:
   *
   * value - String representation of the font family. This handles the same
   * values as the CSS font-family property.
   */
  setFontFamily(value: any): void;
  /**
   * Sets the current font style.
   *
   * Parameters:
   *
   * value - Numeric representation of the font family. This is the sum of the
   * font styles from <mxConstants>.
   */
  setFontStyle(value: any): void;
  /**
   * Enables or disables shadows.
   *
   * Parameters:
   *
   * value - Boolean that specifies if shadows should be enabled.
   */
  setShadow(value: any): void;
  /**
   * Sets the current shadow color. Default is <mxConstants.SHADOWCOLOR>.
   *
   * Parameters:
   *
   * value - Hexadecimal representation of the color or 'none'.
   */
  setShadowColor(value: any): void;
  /**
   * Sets the current shadows alpha. Default is <mxConstants.SHADOW_OPACITY>.
   *
   * Parameters:
   *
   * value - Number that represents the new alpha. Possible values are between
   * 1 (opaque) and 0 (transparent).
   */
  setShadowAlpha(value: any): void;
  /**
   * Sets the current shadow offset.
   *
   * Parameters:
   *
   * dx - Number that represents the horizontal offset of the shadow.
   * dy - Number that represents the vertical offset of the shadow.
   */
  setShadowOffset(dx: any, dy: any): void;
  /**
   * Puts a rectangle into the drawing buffer.
   *
   * Parameters:
   *
   * x - Number that represents the x-coordinate of the rectangle.
   * y - Number that represents the y-coordinate of the rectangle.
   * w - Number that represents the width of the rectangle.
   * h - Number that represents the height of the rectangle.
   */
  rect(x: any, y: any, w: any, h: any): void;
  /**
   * Puts a rounded rectangle into the drawing buffer.
   *
   * Parameters:
   *
   * x - Number that represents the x-coordinate of the rectangle.
   * y - Number that represents the y-coordinate of the rectangle.
   * w - Number that represents the width of the rectangle.
   * h - Number that represents the height of the rectangle.
   * dx - Number that represents the horizontal rounding.
   * dy - Number that represents the vertical rounding.
   */
  roundrect(x: any, y: any, w: any, h: any, dx: any, dy: any): void;
  /**
   * Puts an ellipse into the drawing buffer.
   *
   * Parameters:
   *
   * x - Number that represents the x-coordinate of the ellipse.
   * y - Number that represents the y-coordinate of the ellipse.
   * w - Number that represents the width of the ellipse.
   * h - Number that represents the height of the ellipse.
   */
  ellipse(x: any, y: any, w: any, h: any): void;
  /**
   * Paints an image.
   *
   * Parameters:
   *
   * x - Number that represents the x-coordinate of the image.
   * y - Number that represents the y-coordinate of the image.
   * w - Number that represents the width of the image.
   * h - Number that represents the height of the image.
   * src - String that specifies the URL of the image.
   * aspect - Boolean indicating if the aspect of the image should be preserved.
   * flipH - Boolean indicating if the image should be flipped horizontally.
   * flipV - Boolean indicating if the image should be flipped vertically.
   */
  image(x: any, y: any, w: any, h: any, src: any, aspect: any, flipH: any, flipV: any): void;
  /**
   * Starts a new path and puts it into the drawing buffer.
   */
  begin(): void;
  /**
   * Moves the current path the given point.
   *
   * Parameters:
   *
   * x - Number that represents the x-coordinate of the point.
   * y - Number that represents the y-coordinate of the point.
   */
  moveTo(x: any, y: any): void;
  /**
   * Draws a line to the given coordinates.
   *
   * Parameters:
   *
   * x - Number that represents the x-coordinate of the endpoint.
   * y - Number that represents the y-coordinate of the endpoint.
   */
  lineTo(x: any, y: any): void;
  /**
   * Adds a quadratic curve to the current path.
   *
   * Parameters:
   *
   * x1 - Number that represents the x-coordinate of the control point.
   * y1 - Number that represents the y-coordinate of the control point.
   * x2 - Number that represents the x-coordinate of the endpoint.
   * y2 - Number that represents the y-coordinate of the endpoint.
   */
  quadTo(x1: any, y1: any, x2: any, y2: any): void;
  /**
   * Adds a bezier curve to the current path.
   *
   * Parameters:
   *
   * x1 - Number that represents the x-coordinate of the first control point.
   * y1 - Number that represents the y-coordinate of the first control point.
   * x2 - Number that represents the x-coordinate of the second control point.
   * y2 - Number that represents the y-coordinate of the second control point.
   * x3 - Number that represents the x-coordinate of the endpoint.
   * y3 - Number that represents the y-coordinate of the endpoint.
   */
  curveTo(x1: any, y1: any, x2: any, y2: any, x3: any, y3: any): void;
  /**
   * Closes the current path.
   */
  close(): void;
  /**
   * Paints the given text. Possible values for format are empty string for
   * plain text and html for HTML markup. Background and border color as well
   * as clipping is not available in plain text labels for VML. HTML labels
   * are not available as part of shapes with no foreignObject support in SVG
   * (eg. IE9, IE10).
   *
   * Parameters:
   *
   * x - Number that represents the x-coordinate of the text.
   * y - Number that represents the y-coordinate of the text.
   * w - Number that represents the available width for the text or 0 for automatic width.
   * h - Number that represents the available height for the text or 0 for automatic height.
   * str - String that specifies the text to be painted.
   * align - String that represents the horizontal alignment.
   * valign - String that represents the vertical alignment.
   * wrap - Boolean that specifies if word-wrapping is enabled. Requires w > 0.
   * format - Empty string for plain text or 'html' for HTML markup.
   * overflow - Specifies the overflow behaviour of the label. Requires w > 0 and/or h > 0.
   * clip - Boolean that specifies if the label should be clipped. Requires w > 0 and/or h > 0.
   * rotation - Number that specifies the angle of the rotation around the anchor point of the text.
   * dir - Optional string that specifies the text direction. Possible values are rtl and lrt.
   */
  text(x: any, y: any, w: any, h: any, str: any, align: any, valign: any, wrap: any, format: any, overflow: any, clip: any, rotation: any, dir: any): void;
  /**
   * Paints the outline of the current drawing buffer.
   */
  stroke(): void;
  /**
   * Fills the current drawing buffer.
   */
  fill(): void;
  /**
   * Fills the current drawing buffer and its outline.
   */
  fillAndStroke(): void;
}
