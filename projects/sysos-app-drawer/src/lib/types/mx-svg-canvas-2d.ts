/**
 * Extends <mxAbstractCanvas2D> to implement a canvas for SVG. This canvas writes all
 * calls as SVG output to the given SVG root node.
 *
 * (code)
 * var svgDoc = mxUtils.createXmlDocument();
 * var root = (svgDoc.createElementNS != null) ?
 * 		svgDoc.createElementNS(mxConstants.NS_SVG, 'svg') : svgDoc.createElement('svg');
 *
 * if (svgDoc.createElementNS == null)
 * {
 *   root.setAttribute('xmlns', mxConstants.NS_SVG);
 *   root.setAttribute('xmlns:xlink', mxConstants.NS_XLINK);
 * }
 * else
 * {
 *   root.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', mxConstants.NS_XLINK);
 * }
 *
 * var bounds = graph.getGraphBounds();
 * root.setAttribute('width', (bounds.x + bounds.width + 4) + 'px');
 * root.setAttribute('height', (bounds.y + bounds.height + 4) + 'px');
 * root.setAttribute('version', '1.1');
 *
 * svgDoc.appendChild(root);
 *
 * var svgCanvas = new mxSvgCanvas2D(root);
 * (end)
 *
 * A description of the public API is available in <mxXmlCanvas2D>.
 *
 * To disable anti-aliasing in the output, use the following code.
 *
 * (code)
 * graph.view.canvas.ownerSVGElement.setAttribute('shape-rendering', 'crispEdges');
 * (end)
 *
 * Or set the respective attribute in the SVG element directly.
 */
import {mxAbstractCanvas2D} from "./mx-abstract-canvas-2d";

export interface mxSvgCanvas2D extends mxAbstractCanvas2D {
  /**
   * Holds the current DOM node.
   */
  node: Element;
  /**
   * Specifies if plain text output should match the vertical HTML alignment.
   * Defaul is true.
   */
  matchHtmlAlignment: boolean;
  /**
   * Specifies if text output should be enabled. Default is true.
   */
  textEnabled: boolean;
  /**
   * Specifies if use of foreignObject for HTML markup is allowed. Default is true.
   */
  foEnabled: boolean;
  /**
   * Specifies the fallback text for unsupported foreignObjects in exported
   * documents. Default is '[Object]'. If this is set to null then no fallback
   * text is added to the exported document.
   */
  foAltText: string;
  /**
   * Offset to be used for foreignObjects.
   */
  foOffset: number;
  /**
   * Offset to be used for text elements.
   */
  textOffset: number;
  /**
   * Offset to be used for image elements.
   */
  imageOffset: number;
  /**
   * Adds transparent paths for strokes.
   */
  strokeTolerance: number;
  /**
   * Local counter for references in SVG export.
   */
  refCount: number;
  /**
   * Specifies if a transparent rectangle should be added on top of images to absorb
   * all pointer events. Default is false. This is only needed in Firefox to disable
   * control-clicks on images.
   */
  blockImagePointerEvents: boolean;
  /**
   * Correction factor for <mxConstants.LINE_HEIGHT> in HTML output. Default is 1.
   */
  lineHeightCorrection: number;
  /**
   * Default value for active pointer events. Default is all.
   */
  pointerEventsValue: string;
  /**
   * Padding to be added for text that is not wrapped to account for differences
   * in font metrics on different platforms in pixels. Default is 10.
   */
  fontMetricsPadding: number;
  /**
   * Specifies if offsetWidth and offsetHeight should be cached. Default is true.
   * This is used to speed up repaint of text in <updateText>.
   */
  cacheOffsetSize: boolean;
  /**
   * Implicit variable declarations
   */
  root: SVGElement;
  gradients: any[];
  defs: SVGDefsElement;
  styleEnabled: boolean;
  state: any;
  pointerEvents: any;
  originalRoot: any;
  path: any;
  closeOp: any;
  useDomParser: boolean;
  rotateHtml: boolean;
  /**
   * Constructs a new SVG canvas.
   *
   * @param root - SVG container for the output.
   * @param styleEnabled - Optional boolean that specifies if a style section should be
   * added. The style section sets the default font-size, font-family and
   * stroke-miterlimit globally. Default is false.
   */
  constructor(root?: any, styleEnabled?: any);
  /**
   * Rounds all numbers to 2 decimal points.
   */
  format(value: any): number;
  /**
   * Returns the URL of the page without the hash part. This needs to use href to
   * include any search part with no params (ie question mark alone). This is a
   * workaround for the fact that window.location.search is empty if there is
   * no search string behind the question mark.
   */
  getBaseUrl(): string;
  /**
   * Returns any offsets for rendering pixels.
   */
  reset(): void;
  /**
   * Creates the optional style section.
   */
  createStyle(x?: any): any;
  /**
   * Returns the alternate content for the given foreignObject.
   */
  createAlternateContent(fo: any, x: any, y: any, w: any, h: any, str: any, align: any, valign: any, wrap: any, format: any, overflow: any, clip: any, rotation: any): any;
  /**
   * Private helper function to create SVG elements
   */
  createGradientId(start: any, end: any, alpha1: any, alpha2: any, direction: any): string;
  /**
   * Private helper function to create SVG elements
   */
  getSvgGradient(start: any, end: any, alpha1: any, alpha2: any, direction: any): any;
  /**
   * Creates the given SVG gradient.
   */
  createSvgGradient(start: any, end: any, alpha1: any, alpha2: any, direction: any): any;
  /**
   * Private helper function to create SVG elements
   */
  addNode(filled: any, stroked: any): void;
  /**
   * Transfers the stroke attributes from <state> to <node>.
   */
  updateFill(): void;
  /**
   * Returns the current stroke width (>= 1), ie. max(1, this.format(this.state.strokeWidth * this.state.scale)).
   */
  getCurrentStrokeWidth(): number;
  /**
   * Transfers the stroke attributes from <state> to <node>.
   */
  updateStroke(): void;
  /**
   * Transfers the stroke attributes from <state> to <node>.
   */
  updateStrokeAttributes(): void;
  /**
   * Creates the SVG dash pattern for the given state.
   */
  createDashPattern(scale: any): string;
  /**
   * Creates a hit detection tolerance shape for the given node.
   */
  createTolerance(node: any): any;
  /**
   * Creates a shadow for the given node.
   */
  createShadow(node: any): any;
  /**
   * Experimental implementation for hyperlinks.
   */
  setLink(link: any): void;
  /**
   * Sets the rotation of the canvas. Note that rotation cannot be concatenated.
   */
  rotate(theta: any, flipH: any, flipV: any, cx: any, cy: any): void;
  /**
   * Extends superclass to create path.
   */
  begin(): void;
  /**
   * Private helper function to create SVG elements
   */
  rect(x: any, y: any, w: any, h: any): void;
  /**
   * Private helper function to create SVG elements
   */
  roundrect(x: any, y: any, w: any, h: any, dx: any, dy: any): void;
  /**
   * Private helper function to create SVG elements
   */
  ellipse(x: any, y: any, w: any, h: any): void;
  /**
   * Private helper function to create SVG elements
   */
  image(x: any, y: any, w: any, h: any, src: any, aspect: any, flipH: any, flipV: any): void;
  /**
   * Converts the given HTML string to XHTML.
   */
  convertHtml(val: any): any;
  /**
   * Private helper function to create SVG elements
   */
  createDiv(str: any, align: any, valign: any, style: any, overflow: any): any;
  /**
   * Invalidates the cached offset size for the given node.
   */
  invalidateCachedOffsetSize(node: any): void;
  /**
   * Updates existing DOM nodes for text rendering. LATER: Merge common parts with text function below.
   */
  updateText(x: any, y: any, w: any, h: any, align: any, valign: any, wrap: any, overflow: any, clip: any, rotation: any, node: any): void;
  /**
   * Paints the given text. Possible values for format are empty string for plain
   * text and html for HTML markup. Note that HTML markup is only supported if
   * foreignObject is supported and <foEnabled> is true. (This means IE9 and later
   * does currently not support HTML text as part of shapes.)
   */
  text(x: any, y: any, w: any, h: any, str: any, align: any, valign: any, wrap: any, format: any, overflow: any, clip: any, rotation: any, dir: any): void;
  /**
   * Creates a clip for the given coordinates.
   */
  createClip(x: any, y: any, w: any, h: any): any;
  /**
   * Paints the given text. Possible values for format are empty string for
   * plain text and html for HTML markup.
   */
  plainText(x: any, y: any, w: any, h: any, str: any, align: any, valign: any, wrap: any, overflow: any, clip: any, rotation: any, dir: any): void;
  /**
   * Updates the text properties for the given node. (NOTE: For this to work in
   * IE, the given node must be a text or tspan element.)
   */
  updateFont(node: any): void;
  /**
   * Background color and border
   */
  addTextBackground(node: any, str: any, x: any, y: any, w: any, h: any, align: any, valign: any, overflow: any): void;
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
