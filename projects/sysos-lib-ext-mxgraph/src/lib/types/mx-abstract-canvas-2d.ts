/**
 * Base class for all canvases. A description of the public API is available in <mxXmlCanvas2D>.
 * All color values of <mxConstants.NONE> will be converted to null in the state.
 *
 * Constructor: mxAbstractCanvas2D
 *
 * Constructs a new abstract canvas.
 */
import {mxUrlConverter} from './mx-url-converter';

export interface mxAbstractCanvas2D {
  (): void;
  /**
   * Create a new <mxUrlConverter> and returns it.
   */
  createUrlConverter(): mxUrlConverter;
  /**
   * Resets the state of this canvas.
   */
  reset(): void;
  /**
   * Creates the state of the this canvas.
   */
  createState(): {
    dx: number;
    dy: number;
    scale: number;
    alpha: number;
    fillAlpha: number;
    strokeAlpha: number;
    fillColor: any;
    gradientFillAlpha: number;
    gradientColor: any;
    gradientAlpha: number;
    gradientDirection: any;
    strokeColor: any;
    strokeWidth: number;
    dashed: boolean;
    dashPattern: string;
    fixDash: boolean;
    lineCap: string;
    lineJoin: string;
    miterLimit: number;
    fontColor: string;
    fontBackgroundColor: any;
    fontBorderColor: any;
    fontSize: number;
    fontFamily: string;
    fontStyle: number;
    shadow: boolean;
    shadowColor: string;
    shadowAlpha: number;
    shadowDx: number;
    shadowDy: number;
    rotation: number;
    rotationCx: number;
    rotationCy: number;
  };
  /**
   * Rounds all numbers to integers.
   */
  format(value: any): number;
  /**
   * Adds the given operation to the path.
   */
  addOp(): void;
  /**
   * Rotates the given point and returns the result as an <mxPoint>.
   */
  rotatePoint(x: any, y: any, theta: any, cx: any, cy: any): any;
  /**
   * Saves the current state.
   */
  save(): void;
  /**
   * Restores the current state.
   */
  restore(): void;
  /**
   * Sets the current link. Hook for subclassers.
   */
  setLink(link: any): void;
  /**
   * Scales the current state.
   */
  scale(value: any): void;
  /**
   * Translates the current state.
   */
  translate(dx: any, dy: any): void;
  /**
   * Rotates the current state.
   */
  rotate(theta: any, flipH: any, flipV: any, cx: any, cy: any): void;
  /**
   * Sets the current alpha.
   */
  setAlpha(value: any): void;
  /**
   * Sets the current solid fill alpha.
   */
  setFillAlpha(value: any): void;
  /**
   * Sets the current stroke alpha.
   */
  setStrokeAlpha(value: any): void;
  /**
   * Sets the current fill color.
   */
  setFillColor(value: any): void;
  /**
   * Sets the current gradient.
   */
  setGradient(color1: any, color2: any, x: any, y: any, w: any, h: any, direction: any, alpha1: any, alpha2: any): void;
  /**
   * Sets the current stroke color.
   */
  setStrokeColor(value: any): void;
  /**
   * Sets the current stroke width.
   */
  setStrokeWidth(value: any): void;
  /**
   * Enables or disables dashed lines.
   */
  setDashed(value: any, fixDash?: any): void;
  /**
   * Sets the current dash pattern.
   */
  setDashPattern(value: any): void;
  /**
   * Sets the current line cap.
   */
  setLineCap(value: any): void;
  /**
   * Sets the current line join.
   */
  setLineJoin(value: any): void;
  /**
   * Sets the current miter limit.
   */
  setMiterLimit(value: any): void;
  /**
   * Sets the current font color.
   */
  setFontColor(value: any): void;
  /**
   * Sets the current font color.
   */
  setFontBackgroundColor(value: any): void;
  /**
   * Sets the current font color.
   */
  setFontBorderColor(value: any): void;
  /**
   * Sets the current font size.
   */
  setFontSize(value: any): void;
  /**
   * Sets the current font family.
   */
  setFontFamily(value: any): void;
  /**
   * Sets the current font style.
   */
  setFontStyle(value: any): void;
  /**
   * Enables or disables and configures the current shadow.
   */
  setShadow(enabled: any): void;
  /**
   * Enables or disables and configures the current shadow.
   */
  setShadowColor(value: any): void;
  /**
   * Enables or disables and configures the current shadow.
   */
  setShadowAlpha(value: any): void;
  /**
   * Enables or disables and configures the current shadow.
   */
  setShadowOffset(dx: any, dy: any): void;
  /**
   * Starts a new path.
   */
  begin(): void;
  /**
   *  Moves the current path the given coordinates.
   */
  moveTo(x: any, y: any): void;
  /**
   * Draws a line to the given coordinates. Uses moveTo with the op argument.
   */
  lineTo(x: any, y: any): void;
  /**
   * Adds a quadratic curve to the current path.
   */
  quadTo(x1: any, y1: any, x2: any, y2: any): void;
  /**
   * Adds a bezier curve to the current path.
   */
  curveTo(x1: any, y1: any, x2: any, y2: any, x3: any, y3: any): void;
  /**
   * Adds the given arc to the current path. This is a synthetic operation that
   * is broken down into curves.
   */
  arcTo(rx: any, ry: any, angle: any, largeArcFlag: any, sweepFlag: any, x: any, y: any): void;
  /**
   * Closes the current path.
   */
  close(x1: any, y1: any, x2: any, y2: any, x3: any, y3: any): void;
  /**
   * Empty implementation for backwards compatibility. This will be removed.
   */
  end(): void;
}
