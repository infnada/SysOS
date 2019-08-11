/**
 * Extends <mxShape> to implement a text shape. To change vertical text from
 * bottom to top to top to bottom, the following code can be used:
 *
 * @example
 * mxText.prototype.verticalTextRotation = 90;
 */
import {mxShape} from './mx-shape';
import {mxPoint} from './mx-point';

export interface mxText extends mxShape {
  /**
   * Constructs a new text shape.
   *
   * @param value - String that represents the text to be displayed. This is stored in
   * <value>.
   * @param bounds - <mxRectangle> that defines the bounds. This is stored in
   * <mxShape.bounds>.
   * @param align - Specifies the horizontal alignment. Default is ''. This is stored in
   * <align>.
   * @param valign - Specifies the vertical alignment. Default is ''. This is stored in
   * <valign>.
   * @param color - String that specifies the text color. Default is 'black'. This is
   * stored in <color>.
   * @param family - String that specifies the font family. Default is
   * <mxConstants.DEFAULT_FONTFAMILY>. This is stored in <family>.
   * @param size - Integer that specifies the font size. Default is
   * <mxConstants.DEFAULT_FONTSIZE>. This is stored in <size>.
   * @param fontStyle - Specifies the font style. Default is 0. This is stored in
   * <fontStyle>.
   * @param spacing - Integer that specifies the global spacing. Default is 2. This is
   * stored in <spacing>.
   * @param spacingTop - Integer that specifies the top spacing. Default is 0. The
   * sum of the spacing and this is stored in <spacingTop>.
   * @param spacingRight - Integer that specifies the right spacing. Default is 0. The
   * sum of the spacing and this is stored in <spacingRight>.
   * @param spacingBottom - Integer that specifies the bottom spacing. Default is 0.The
   * sum of the spacing and this is stored in <spacingBottom>.
   * @param spacingLeft - Integer that specifies the left spacing. Default is 0. The
   * sum of the spacing and this is stored in <spacingLeft>.
   * @param horizontal - Boolean that specifies if the label is horizontal. Default is
   * true. This is stored in <horizontal>.
   * @param background - String that specifies the background color. Default is null.
   * This is stored in <background>.
   * @param border - String that specifies the label border color. Default is null.
   * This is stored in <border>.
   * @param wrap - Specifies if word-wrapping should be enabled. Default is false.
   * This is stored in <wrap>.
   * @param clipped - Specifies if the label should be clipped. Default is false.
   * This is stored in <clipped>.
   * @param overflow - Value of the overflow style. Default is 'visible'.
   */
  // tslint:disable-next-line:max-line-length
  (value?: any, bounds?: any, align?: any, valign?: any, color?: any, family?: any, size?: any, fontStyle?: any, spacing?: any, spacingTop?: any, spacingRight?: any, spacingBottom?: any, spacingLeft?: any, horizontal?: any, background?: any, border?: any, wrap?: any, clipped?: any, overflow?: any, labelPadding?: any, textDirection?: any): void;
  /**
   * Specifies the spacing to be added to the top spacing. Default is 0. Use the
   * value 5 here to get the same label positions as in mxGraph 1.x.
   */
  baseSpacingTop: number;
  /**
   * Specifies the spacing to be added to the bottom spacing. Default is 0. Use the
   * value 1 here to get the same label positions as in mxGraph 1.x.
   */
  baseSpacingBottom: number;
  /**
   * Specifies the spacing to be added to the left spacing. Default is 0.
   */
  baseSpacingLeft: number;
  /**
   * Specifies the spacing to be added to the right spacing. Default is 0.
   */
  baseSpacingRight: number;
  /**
   * Specifies if linefeeds in HTML labels should be replaced with BR tags.
   * Default is true.
   */
  replaceLinefeeds: boolean;
  /**
   * Rotation for vertical text. Default is -90 (bottom to top).
   */
  verticalTextRotation: number;
  /**
   * Specifies if the string size should be measured in <updateBoundingBox> if
   * the label is clipped and the label position is center and middle. If this is
   * true, then the bounding box will be set to <bounds>. Default is true.
   * <ignoreStringSize> has precedence over this switch.
   */
  ignoreClippedStringSize: boolean;
  /**
   * Specifies if the actual string size should be measured. If disabled the
   * boundingBox will not ignore the actual size of the string, otherwise
   * <bounds> will be used instead. Default is false.
   */
  ignoreStringSize: boolean;
  /**
   * Specifies the padding to be added to the text width for the bounding box.
   * This is needed to make sure no clipping is applied to borders. Default is 4
   * for IE 8 standards mode and 3 for all others.
   */
  textWidthPadding: number;
  /**
   * Contains the last rendered text value. Used for caching.
   */
  lastValue: any;
  /**
   * Specifies if caching for HTML labels should be enabled. Default is true.
   */
  cacheEnabled: boolean;
  /**
   * Implicitly defined variables
   */
  textDirection: any;
  labelPadding: any;
  overflow: any;
  clipped: any;
  wrap: any;
  border: any;
  background: any;
  horizontal: any;
  spacingLeft: any;
  spacingBottom: any;
  spacingRight: any;
  spacingTop: any;
  fontStyle: any;
  size: any;
  family: any;
  valign: any;
  align: any;
  color: any;
  value: any;
  /**
   * Text shapes do not contain VML markup and do not need to be parsed. This
   * method returns false to speed up rendering in IE8.
   */
  isParseVml(): boolean;
  /**
   * Returns true if HTML is allowed for this shape. This implementation returns
   * true if the browser is not in IE8 standards mode.
   */
  isHtmlAllowed(): boolean;
  /**
   * Disables offset in IE9 for crisper image output.
   */
  getSvgScreenOffset(): 0;
  /**
   * Returns true if the bounds are not null and all of its variables are numeric.
   */
  checkBounds(): boolean;
  /**
   * Generic rendering code.
   */
  paint(c: any, update?: boolean): void;
  /**
   * Renders the text using the given DOM nodes.
   */
  redraw(): void;
  /**
   * Resets all styles.
   */
  resetStyles(): void;
  /**
   * Extends mxShape to update the text styles.
   *
   * state - <mxCellState> of the corresponding cell.
   */
  apply(state: any): void;
  /**
   * Used to determine the automatic text direction. Returns
   * <mxConstants.TEXT_DIRECTION_LTR> or <mxConstants.TEXT_DIRECTION_RTL>
   * depending on the contents of <value>. This is not invoked for HTML, wrapped
   * content or if <value> is a DOM node.
   */
  getAutoDirection(): string;
  /**
   * Updates the <boundingBox> for this shape using the given node and position.
   */
  updateBoundingBox(): void;
  /**
   * Returns 0 to avoid using rotation in the canvas via updateTransform.
   */
  getShapeRotation(): number;
  /**
   * Returns the rotation for the text label of the corresponding shape.
   */
  getTextRotation(): number;
  /**
   * Inverts the bounds if <mxShape.isBoundsInverted> returns true or if the
   * horizontal style is false.
   */
  isPaintBoundsInverted(): boolean;
  /**
   * Sets the state of the canvas for drawing the shape.
   */
  configureCanvas(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Sets the width and height of the container to 1px.
   */
  updateVmlContainer(): void;
  /**
   * Updates the HTML node(s) to reflect the latest bounds and scale.
   */
  redrawHtmlShape(): void;
  /**
   * Returns the spacing as an <mxPoint>.
   */
  updateHtmlTransform(): void;
  /**
   * Sets the inner HTML of the given element to the <value>.
   */
  updateInnerHtml(elt: any): void;
  /**
   * Rotated text rendering quality is bad for IE9 quirks/IE8 standards
   */
  updateHtmlFilter(): void;
  /**
   * Updates the HTML node(s) to reflect the latest bounds and scale.
   */
  updateValue(): void;
  /**
   * Updates the HTML node(s) to reflect the latest bounds and scale.
   */
  updateFont(node: any): void;
  /**
   * Updates the HTML node(s) to reflect the latest bounds and scale.
   */
  updateSize(node: any, enableWrap: any): void;
  /**
   * Returns the spacing as an <mxPoint>.
   */
  updateMargin(): void;
  /**
   * Returns the spacing as an <mxPoint>.
   */
  getSpacing(): mxPoint;
}
