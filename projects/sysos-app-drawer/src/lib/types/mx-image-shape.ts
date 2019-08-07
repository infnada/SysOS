/**
 * Extends <mxShape> to implement an image shape. This shape is registered
 * under <mxConstants.SHAPE_IMAGE> in <mxCellRenderer>.
 */
import {mxRectangleShape} from "./mx-rectangle-shape";
import {mxRectangle} from "./mx-rectangle";
import {mxCellState} from "./mx-cell-state";

export interface mxImageShape {
  /**
   * Switch to preserve image aspect. Default is true.
   */
  preserveImageAspect: boolean;
  /** URL of the image */
  image: string;
  shadow: boolean;
  /**
   * Constructs a new image shape.
   *
   * @param bounds - <mxRectangle> that defines the bounds. This is stored in
   * <mxShape.bounds>.
   * @param image - String that specifies the URL of the image. This is stored in
   * <image>.
   * @param fill - String that defines the fill color. This is stored in <fill>.
   * @param stroke - String that defines the stroke color. This is stored in <stroke>.
   * @param strokewidth - Optional integer that defines the stroke width. Default is
   * 0. This is stored in <strokewidth>.
   */
  constructor(bounds: mxRectangle, image: string, fill: string, stroke: string, strokewidth: number);
  /**
   * Disables offset in IE9 for crisper image output.
   */
  getSvgScreenOffset(): 0;
  /**
   * Overrides <mxShape.apply> to replace the fill and stroke colors with the
   * respective values from <mxConstants.STYLE_IMAGE_BACKGROUND> and
   * <mxConstants.STYLE_IMAGE_BORDER>.
   *
   * Applies the style of the given <mxCellState> to the shape. This
   * implementation assigns the following styles to local fields:
   *
   * - <mxConstants.STYLE_IMAGE_BACKGROUND> => fill
   * - <mxConstants.STYLE_IMAGE_BORDER> => stroke
   *
   * @param state - <mxCellState> of the corresponding cell.
   */
  apply(state: mxCellState): void;
  /**
   * Returns true if HTML is allowed for this shape. This implementation always
   * returns false.
   */
  isHtmlAllowed(): boolean;
  /**
   * Creates and returns the HTML DOM node(s) to represent
   * this shape. This implementation falls back to <createVml>
   * so that the HTML creation is optional.
   */
  createHtml(): HTMLDivElement;
  /**
   * Generic background painting implementation.
   */
  paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Overrides <mxShape.redraw> to preserve the aspect ratio of images.
   */
  redrawHtmlShape(): void;
}
