/**
 * Base class for all shapes. A shape in mxGraph is a
 * separate implementation for SVG, VML and HTML. Which
 * implementation to use is controlled by the <dialect>
 * property which is assigned from within the <mxCellRenderer>
 * when the shape is created. The dialect must be assigned
 * for a shape, and it does normally depend on the browser and
 * the confiuration of the graph (see <mxGraph> rendering hint).
 *
 * For each supported shape in SVG and VML, a corresponding
 * shape exists in mxGraph, namely for text, image, rectangle,
 * rhombus, ellipse and polyline. The other shapes are a
 * combination of these shapes (eg. label and swimlane)
 * or they consist of one or more (filled) path objects
 * (eg. actor and cylinder). The HTML implementation is
 * optional but may be required for a HTML-only view of
 * the graph.
 *
 * Custom Shapes:
 *
 * To extend from this class, the basic code looks as follows.
 * In the special case where the custom shape consists only of
 * one filled region or one filled region and an additional stroke
 * the <mxActor> and <mxCylinder> should be subclassed,
 * respectively.
 *
 * (code)
 * function CustomShape() { }
 *
 * CustomShape.prototype = new mxShape();
 * CustomShape.prototype.constructor = CustomShape;
 * (end)
 *
 * To register a custom shape in an existing graph instance,
 * one must register the shape under a new name in the graph's
 * cell renderer as follows:
 *
 * (code)
 * mxCellRenderer.registerShape('customShape', CustomShape);
 * (end)
 *
 * The second argument is the name of the constructor.
 *
 * In order to use the shape you can refer to the given name above
 * in a stylesheet. For example, to change the shape for the default
 * vertex style, the following code is used:
 *
 * (code)
 * var style = graph.getStylesheet().getDefaultVertexStyle();
 * style[mxConstants.STYLE_SHAPE] = 'customShape';
 * (end)
 */
import {mxStencil} from "./mx-stencil";
import {mxRectangle} from "./mx-rectangle";
import {mxPoint} from "./mx-point";
import {mxCellState} from "./mx-cell-state";
import {mxSvgCanvas2D} from "./mx-svg-canvas-2d";
import {mxVmlCanvas2D} from "./mx-vml-canvas-2d";

export interface mxShape {
  /**
   * Holds the dialect in which the shape is to be painted.
   * This can be one of the DIALECT constants in <mxConstants>.
   */
  dialect: any;
  /**
   * Holds the scale in which the shape is being painted.
   */
  scale: number;
  /**
   * Rendering hint for configuring the canvas.
   */
  antiAlias: boolean;
  /**
   * Holds the <mxRectangle> that specifies the bounds of this shape.
   */
  bounds: mxRectangle;
  /**
   * Holds the array of <mxPoints> that specify the points of this shape.
   */
  points: mxPoint[];
  /**
   * Holds the outermost DOM node that represents this shape.
   */
  node: HTMLElement | SVGElement;
  /**
   * Optional reference to the corresponding <mxCellState>.
   */
  state: mxCellState;
  /**
   * Optional reference to the style of the corresponding <mxCellState>.
   */
  style: any[];
  /**
   * Contains the bounding box of the shape, that is, the smallest rectangle
   * that includes all pixels of the shape.
   */
  boundingBox: mxRectangle;
  /**
   * Holds the <mxStencil> that defines the shape.
   */
  stencil: mxStencil;
  /**
   * Event-tolerance for SVG strokes (in px). Default is 8. This is only passed
   * to the canvas in <createSvgCanvas> if <pointerEvents> is true.
   */
  svgStrokeTolerance: number;
  /**
   * Specifies if pointer events should be handled. Default is true.
   */
  pointerEvents: boolean;
  /**
   * Specifies if pointer events should be handled. Default is true.
   */
  svgPointerEvents: string;
  /**
   * Specifies if pointer events outside of shape should be handled. Default
   * is false.
   */
  shapePointerEvents: boolean;
  /**
   * Specifies if pointer events outside of stencils should be handled. Default
   * is false. Set this to true for backwards compatibility with the 1.x branch.
   */
  stencilPointerEvents: boolean;
  /**
   * Scale for improving the precision of VML rendering. Default is 1.
   */
  vmlScale: number;
  /**
   * Specifies if the shape should be drawn as an outline. This disables all
   * fill colors and can be used to disable other drawing states that should
   * not be painted for outlines. Default is false. This should be set before
   * calling <apply>.
   */
  outline: boolean;
  /**
   * Specifies if the shape is visible. Default is true.
   */
  visible: boolean;
  /**
   * Allows to use the SVG bounding box in SVG. Default is false for performance
   * reasons.
   */
  useSvgBoundingBox: boolean;
  /**
   * Implicit variable declarations
   */
  strokewidth: number;
  rotation: number;
  opacity: number;
  fillOpacity: number;
  strokeOpacity: number;
  flipH: boolean;
  flipV: boolean;
  spacing: any;
  fill: any;
  gradient: any;
  gradientDirection: any;
  stroke: any;
  startSize: any;
  endSize: any;
  startArrow: any;
  endArrow: any;
  direction: any;
  isShadow: any;
  isDashed: any;
  isRounded: any;
  glass: any;
  cursor: string;
  constructor(stencil?: any);
  /**
   * Initializes the shape by creaing the DOM node using <create>
   * and adding it into the given container.
   *
   * @param container - DOM node that will contain the shape.
   */
  init(container: HTMLElement): void;
  /**
   * Specifies if any VML should be added via insertAdjacentHtml to the DOM. This
   * is only needed in IE8 and only if the shape contains VML markup. This method
   * returns true.
   */
  isParseVml(): boolean;
  /**
   * Returns true if HTML is allowed for this shape. This implementation always
   * returns false.
   */
  isHtmlAllowed(): boolean;
  /**
   * Returns 0, or 0.5 if <strokewidth> % 2 == 1.
   */
  getSvgScreenOffset(): 0 | 0.5;
  /**
   * Creates and returns the DOM node(s) for the shape in
   * the given container. This implementation invokes
   * <createSvg>, <createHtml> or <createVml> depending
   * on the <dialect> and style settings.
   *
   * @param container - DOM node that will contain the shape.
   */
  create(container: Element): HTMLElement | SVGGElement;
  /**
   * Creates and returns the SVG node(s) to represent this shape.
   */
  createSvg(...args: any[]): SVGGElement;
  /**
   * Creates and returns the VML node to represent this shape.
   */
  createVml(...args: any[]): HTMLElement;
  /**
   * Creates and returns the HTML DOM node(s) to represent
   * this shape. This implementation falls back to <createVml>
   * so that the HTML creation is optional.
   */
  createHtml(...args: any[]): HTMLDivElement;
  /**
   * Reconfigures this shape. This will update the colors etc in
   * addition to the bounds or points.
   */
  reconfigure(): void;
  /**
   * Creates and returns the SVG node(s) to represent this shape.
   */
  redraw(): void;
  /**
   * Removes all child nodes and resets all CSS.
   */
  clear(): void;
  /**
   * Updates the bounds based on the points.
   */
  updateBoundsFromPoints(): void;
  /**
   * Returns the <mxRectangle> for the label bounds of this shape, based on the
   * given scaled and translated bounds of the shape. This method should not
   * change the rectangle in-place. This implementation returns the given rect.
   */
  getLabelBounds(rect: any): any;
  /**
   * Returns the scaled top, left, bottom and right margin to be used for
   * computing the label bounds as an <mxRectangle>, where the bottom and right
   * margin are defined in the width and height of the rectangle, respectively.
   */
  getLabelMargins(rect: any): any;
  /**
   * Returns true if the bounds are not null and all of its variables are numeric.
   */
  checkBounds(): boolean;
  /**
   * Returns the temporary element used for rendering in IE8 standards mode.
   */
  createVmlGroup(): HTMLElement;
  /**
   * Updates the SVG or VML shape.
   */
  redrawShape(): void;
  /**
   * Creates a new canvas for drawing this shape. May return null.
   */
  createCanvas(): mxSvgCanvas2D | mxVmlCanvas2D;
  /**
   * Creates and returns an <mxSvgCanvas2D> for rendering this shape.
   */
  createSvgCanvas(): mxSvgCanvas2D;
  /**
   * Creates and returns an <mxVmlCanvas2D> for rendering this shape.
   */
  createVmlCanvas(): any;
  /**
   * Updates the bounds of the VML container.
   */
  updateVmlContainer(): void;
  /**
   * Allow optimization by replacing VML with HTML.
   */
  redrawHtmlShape(): void;
  /**
   * Allow optimization by replacing VML with HTML.
   */
  updateHtmlFilters(node: any): void;
  /**
   * Allow optimization by replacing VML with HTML.
   */
  updateHtmlColors(node: any): void;
  /**
   * Allow optimization by replacing VML with HTML.
   */
  updateHtmlBounds(node: any): void;
  /**
   * Destroys the given canvas which was used for drawing. This implementation
   * increments the reference counts on all shared gradients used in the canvas.
   */
  destroyCanvas(canvas: any): void;
  /**
   * Generic rendering code.
   */
  paint(c: any): void;
  /**
   * Sets the state of the canvas for drawing the shape.
   */
  configureCanvas(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Returns the bounding box for the gradient box for this shape.
   */
  getGradientBounds(c: any, x: any, y: any, w: any, h: any): mxRectangle;
  /**
   * Sets the scale and rotation on the given canvas.
   */
  updateTransform(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Paints the vertex shape.
   */
  paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Hook for subclassers. This implementation is empty.
   */
  paintBackground(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Hook for subclassers. This implementation is empty.
   */
  paintForeground(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Hook for subclassers. This implementation is empty.
   */
  paintEdgeShape(c: any, pts: any): void;
  /**
   * Returns the arc size for the given dimension.
   */
  getArcSize(w: any, h: any): number;
  /**
   * Paints the glass gradient effect.
   */
  paintGlassEffect(c: any, x: any, y: any, w: any, h: any, arc: any): void;
  /**
   * Paints the given points with rounded corners.
   */
  addPoints(c: any, pts: any, rounded: any, arcSize: any, close: any, exclude: any, initialMove: any): void;
  /**
   * Resets all styles.
   */
  resetStyles(): void;
  /**
   * Applies the style of the given <mxCellState> to the shape. This
   * implementation assigns the following styles to local fields:
   *
   * - <mxConstants.STYLE_FILLCOLOR> => fill
   * - <mxConstants.STYLE_GRADIENTCOLOR> => gradient
   * - <mxConstants.STYLE_GRADIENT_DIRECTION> => gradientDirection
   * - <mxConstants.STYLE_OPACITY> => opacity
   * - <mxConstants.STYLE_FILL_OPACITY> => fillOpacity
   * - <mxConstants.STYLE_STROKE_OPACITY> => strokeOpacity
   * - <mxConstants.STYLE_STROKECOLOR> => stroke
   * - <mxConstants.STYLE_STROKEWIDTH> => strokewidth
   * - <mxConstants.STYLE_SHADOW> => isShadow
   * - <mxConstants.STYLE_DASHED> => isDashed
   * - <mxConstants.STYLE_SPACING> => spacing
   * - <mxConstants.STYLE_STARTSIZE> => startSize
   * - <mxConstants.STYLE_ENDSIZE> => endSize
   * - <mxConstants.STYLE_ROUNDED> => isRounded
   * - <mxConstants.STYLE_STARTARROW> => startArrow
   * - <mxConstants.STYLE_ENDARROW> => endArrow
   * - <mxConstants.STYLE_ROTATION> => rotation
   * - <mxConstants.STYLE_DIRECTION> => direction
   * - <mxConstants.STYLE_GLASS> => glass
   *
   * This keeps a reference to the <style>. If you need to keep a reference to
   * the cell, you can override this method and store a local reference to
   * state.cell or the <mxCellState> itself. If <outline> should be true, make
   * sure to set it before calling this method.
   *
   * state - <mxCellState> of the corresponding cell.
   */
  apply(state: any): void;
  /**
   * Sets the cursor on the given shape.
   *
   * cursor - The cursor to be used.
   */
  setCursor(cursor: any): void;
  /**
   * Returns the current cursor.
   */
  getCursor(): string;
  /**
   * Updates the <boundingBox> for this shape using <createBoundingBox> and
   * <augmentBoundingBox> and stores the result in <boundingBox>.
   */
  updateBoundingBox(): void;
  /**
   * Returns a new rectangle that represents the bounding box of the bare shape
   * with no shadows or strokewidths.
   */
  createBoundingBox(): any;
  /**
   * Augments the bounding box with the strokewidth and shadow offsets.
   */
  augmentBoundingBox(bbox: any): void;
  /**
   * Returns true if the bounds should be inverted.
   */
  isPaintBoundsInverted(): boolean;
  /**
   * Returns the rotation from the style.
   */
  getRotation(): number;
  /**
   * Returns the rotation for the text label.
   */
  getTextRotation(): number;
  /**
   * Returns the actual rotation of the shape.
   */
  getShapeRotation(): number;
  /**
   * Adds a transparent rectangle that catches all events.
   */
  createTransparentSvgRectangle(x: any, y: any, w: any, h: any): Element;
  /**
   * Sets a transparent background CSS style to catch all events.
   *
   * Paints the line shape.
   */
  setTransparentBackgroundImage(node: any): void;
  /**
   * Paints the line shape.
   */
  releaseSvgGradients(grads: any): void;
  /**
   * Destroys the shape by removing it from the DOM and releasing the DOM
   * node associated with the shape using <mxEvent.release>.
   */
  destroy(): void;
}
