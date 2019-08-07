/**
 *
 * Implements a canvas to be used for rendering VML. Here is an example of implementing a
 * fallback for SVG images which are not supported in VML-based browsers.
 *
 * (code)
 * var mxVmlCanvas2DImage = mxVmlCanvas2D.prototype.image;
 * mxVmlCanvas2D.prototype.image = function(x, y, w, h, src, aspect, flipH, flipV)
 * {
 *   if (src.substring(src.length - 4, src.length) == '.svg')
 *   {
 *     src = 'http://www.jgraph.com/images/mxgraph.gif';
 *   }
 *
 *   mxVmlCanvas2DImage.apply(this, arguments);
 * };
 * (end)
 *
 * To disable anti-aliasing in the output, use the following code.
 *
 * (code)
 * document.createStyleSheet().cssText = mxClient.VML_PREFIX + '\\:*{antialias:false;)}';
 * (end)
 *
 * A description of the public API is available in <mxXmlCanvas2D>. Note that
 * there is a known issue in VML where gradients are painted using the outer
 * bounding box of rotated shapes, not the actual bounds of the shape. See
 * also <text> for plain text label restrictions in shapes for VML.
 */
import {mxAbstractCanvas2D} from "./mx-abstract-canvas-2d";

export interface mxVmlCanvas2D extends mxAbstractCanvas2D {
  constructor(root?: any);
  /**
   * Creates the given element using the document.
   */
  createElement(name: any): any;
  /**
   * Creates a new element using <createElement> and prefixes the given name with
   * <mxClient.VML_PREFIX>.
   */
  createVmlElement(name: any): any;
  /**
   * Adds the current node to the <root>.
   */
  addNode(filled: any, stroked: any): void;
  /**
   * Creates a transparent fill.
   */
  createTransparentFill(): any;
  /**
   * Creates a fill for the current state.
   */
  createFill(): any;
  /**
   * Creates a fill for the current state.
   */
  createStroke(): any;
  /**
   * Returns a VML dash pattern for the current dashPattern.
   * See http://msdn.microsoft.com/en-us/library/bb264085(v=vs.85).aspx
   */
  getVmlDashStyle(): string;
  /**
   * Creates a shadow for the given node.
   */
  createShadow(node: any, filled: any, stroked: any): any;
  /**
   * Creates the fill for the shadow.
   */
  createShadowFill(): any;
  /**
   * Creates the stroke for the shadow.
   */
  createShadowStroke(): any;
  /**
   * Sets the rotation of the canvas. Note that rotation cannot be concatenated.
   */
  rotate(theta: any, flipH: any, flipV: any, cx: any, cy: any): void;
  /**
   * Extends superclass to create path.
   */
  begin(): void;
  /**
   * Replaces quadratic curve with bezier curve in VML.
   */
  quadTo(x1: any, y1: any, x2: any, y2: any): void;
  /**
   * Sets the glass gradient.
   */
  createRect(nodeName: any, x: any, y: any, w: any, h: any): any;
  /**
   * Sets the current path to a rectangle.
   */
  rect(x: any, y: any, w: any, h: any): void;
  /**
   * Sets the current path to a rounded rectangle.
   */
  roundrect(x: any, y: any, w: any, h: any, dx: any, dy: any): void;
  /**
   * Sets the current path to an ellipse.
   */
  ellipse(x: any, y: any, w: any, h: any): void;
  /**
   * Paints an image.
   */
  image(x: any, y: any, w: any, h: any, src: any, aspect: any, flipH: any, flipV: any): void;
  /**
   * Creates the innermost element that contains the HTML text.
   */
  createDiv(str: any, align: any, valign: any, overflow: any): any;
  /**
   * Paints the given text. Possible values for format are empty string for plain
   * text and html for HTML markup. Clipping, text background and border are not
   * supported for plain text in VML.
   */
  text(x: any, y: any, w: any, h: any, str: any, align: any, valign: any, wrap: any, format: any, overflow: any, clip: any, rotation: any, dir: any): void;
  /**
   * Paints the outline of the current path.
   */
  plainText(x: any, y: any, w: any, h: any, str: any, align: any, valign: any, wrap: any, format: any, overflow: any, clip: any, rotation: any, dir: any): void;
  /**
   * Paints the outline of the current path.
   */
  stroke(): void;
  /**
   * Fills the current path.
   */
  fill(): void;
  /**
   * Fills and paints the outline of the current path.
   */
  fillAndStroke(): void;
}
