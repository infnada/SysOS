/**
 * Implements an outline (aka overview) for a graph. Set <updateOnPan> to true
 * to enable updates while the source graph is panning.
 *
 * Example:
 *
 * (code)
 * var outline = new mxOutline(graph, div);
 * (end)
 *
 * If an outline is used in an <mxWindow> in IE8 standards mode, the following
 * code makes sure that the shadow filter is not inherited and that any
 * transparent elements in the graph do not show the page background, but the
 * background of the graph container.
 *
 * (code)
 * if (document.documentMode == 8)
 * {
 *   container.style.filter = 'progid:DXImageTransform.Microsoft.alpha(opacity=100)';
 * }
 * (end)
 *
 * To move the graph to the top, left corner the following code can be used.
 *
 * (code)
 * var scale = graph.view.scale;
 * var bounds = graph.getGraphBounds();
 * graph.view.setTranslate(-bounds.x / scale, -bounds.y / scale);
 * (end)
 *
 * To toggle the suspended mode, the following can be used.
 *
 * (code)
 * outline.suspended = !outln.suspended;
 * if (!outline.suspended)
 * {
 *   outline.update(true);
 * }
 * (end)
 *
 * Constructor: mxOutline
 *
 * Constructs a new outline for the specified graph inside the given
 * container.
 *
 * Parameters:
 *
 * source - <mxGraph> to create the outline for.
 * container - DOM node that will contain the outline.
 */
import {mxGraph} from "./mx-graph";
import {mxRectangle} from "./mx-rectangle";
import {mxPoint} from "./mx-point";

export interface mxOutline {
  constructor(source: any, container: any);
  /**
   * Creates the <mxGraph> used in the outline.
   */
  createGraph(container: any): mxGraph;
  /**
   * Initializes the outline inside the given container.
   */
  init(container: any): void;
  /**
   * Returns true if events are handled. This implementation
   * returns <enabled>.
   */
  isEnabled(): any;
  /**
   * Enables or disables event handling. This implementation
   * updates <enabled>.
   *
   * Parameters:
   *
   * value - Boolean that specifies the new enabled state.
   */
  setEnabled(value: any): void;
  /**
   * Enables or disables the zoom handling by showing or hiding the respective
   * handle.
   *
   * Parameters:
   *
   * value - Boolean that specifies the new enabled state.
   */
  setZoomEnabled(value: any): void;
  /**
   * Invokes <update> and revalidate the outline. This method is deprecated.
   */
  refresh(): void;
  /**
   * Creates the shape used as the sizer.
   */
  createSizer(): any;
  /**
   * Returns the size of the source container.
   */
  getSourceContainerSize(): mxRectangle;
  /**
   * Returns the offset for drawing the outline graph.
   */
  getOutlineOffset(scale: any): any;
  /**
   * Returns the offset for drawing the outline graph.
   */
  getSourceGraphBounds(): any;
  /**
   * Updates the outline.
   */
  update(revalidate: any): void;
  /**
   * Handles the event by starting a translation or zoom.
   */
  mouseDown(sender: any, me: any): void;
  /**
   * Handles the event by previewing the viewrect in <graph> and updating the
   * rectangle that represents the viewrect in the outline.
   */
  mouseMove(sender: any, me: any): void;
  /**
   * Gets the translate for the given mouse event. Here is an example to limit
   * the outline to stay within positive coordinates:
   *
   * (code)
   * outline.getTranslateForEvent = function(me)
   * {
   *   var pt = new mxPoint(me.getX() - this.startX, me.getY() - this.startY);
   *
   *   if (!this.zoom)
   *   {
   *     var tr = this.source.view.translate;
   *     pt.x = Math.max(tr.x * this.outline.view.scale, pt.x);
   *     pt.y = Math.max(tr.y * this.outline.view.scale, pt.y);
   *   }
   *
   *   return pt;
   * };
   * (end)
   */
  getTranslateForEvent(me: any): mxPoint;
  /**
   * Handles the event by applying the translation or zoom to <graph>.
   */
  mouseUp(sender: any, me: any): void;
  /**
   * Destroy this outline and removes all listeners from <source>.
   */
  destroy(): void;
}
