/**
 * Renders cells into a document object model. The <defaultShapes> is a global
 * map of shapename, constructor pairs that is used in all instances. You can
 * get a list of all available shape names using the following code.
 *
 * In general the cell renderer is in charge of creating, redrawing and
 * destroying the shape and label associated with a cell state, as well as
 * some other graphical objects, namely controls and overlays. The shape
 * hieararchy in the display (ie. the hierarchy in which the DOM nodes
 * appear in the document) does not reflect the cell hierarchy. The shapes
 * are a (flat) sequence of shapes and labels inside the draw pane of the
 * graph view, with some exceptions, namely the HTML labels being placed
 * directly inside the graph container for certain browsers.
 *
 * (code)
 * mxLog.show();
 * for (var i in mxCellRenderer.defaultShapes)
 * {
 *   mxLog.debug(i);
 * }
 * (end)
 *
 * Constructor: mxCellRenderer
 *
 * Constructs a new cell renderer with the following built-in shapes:
 * arrow, rectangle, ellipse, rhombus, image, line, label, cylinder,
 * swimlane, connector, actor and cloud.
 */
import {mxRectangle} from "./mx-rectangle";
import {mxCellState} from "./mx-cell-state";

export interface mxCellRenderer {
  /**
   * Registers the given constructor under the specified key in this instance
   * of the renderer.
   *
   * Example:
   *
   * (code)
   * mxCellRenderer.registerShape(mxConstants.SHAPE_RECTANGLE, mxRectangleShape);
   * (end)
   *
   * Parameters:
   *
   * key - String representing the shape name.
   * shape - Constructor of the <mxShape> subclass.
   */
  registerShape(key: any, shape: any): void;
  /**
   * Initializes the shape in the given state by calling its init method with
   * the correct container after configuring it using <configureShape>.
   *
   * Parameters:
   *
   * state - <mxCellState> for which the shape should be initialized.
   */
  initializeShape(state: any): void;
  /**
   * Creates and returns the shape for the given cell state.
   *
   * Parameters:
   *
   * state - <mxCellState> for which the shape should be created.
   */
  createShape(state: any): any;
  /**
   * Creates the indicator shape for the given cell state.
   *
   * Parameters:
   *
   * state - <mxCellState> for which the indicator shape should be created.
   */
  createIndicatorShape(state: any): void;
  /**
   * Returns the shape for the given name from <defaultShapes>.
   */
  getShape(name: any): any;
  /**
   * Returns the constructor to be used for creating the shape.
   */
  getShapeConstructor(state: any): any;
  /**
   * Configures the shape for the given cell state.
   *
   * Parameters:
   *
   * state - <mxCellState> for which the shape should be configured.
   */
  configureShape(state: any): void;
  /**
   * Replaces any reserved words used for attributes, eg. inherit,
   * indicated or swimlane for colors in the shape for the given state.
   * This implementation resolves these keywords on the fill, stroke
   * and gradient color keys.
   */
  postConfigureShape(state: any): void;
  /**
   * Resolves special keywords 'inherit', 'indicated' and 'swimlane' and sets
   * the respective color on the shape.
   */
  checkPlaceholderStyles(state: any): boolean;
  /**
   * Resolves special keywords 'inherit', 'indicated' and 'swimlane' and sets
   * the respective color on the shape.
   */
  resolveColor(state: any, field: any, key: any): void;
  /**
   * Returns the value to be used for the label.
   *
   * Parameters:
   *
   * state - <mxCellState> for which the label should be created.
   */
  getLabelValue(state: any): any;
  /**
   * Creates the label for the given cell state.
   *
   * Parameters:
   *
   * state - <mxCellState> for which the label should be created.
   */
  createLabel(state: any, value: any): void;
  /**
   * Initiailzes the label with a suitable container.
   *
   * Parameters:
   *
   * state - <mxCellState> whose label should be initialized.
   */
  initializeLabel(state: any, shape: any): void;
  /**
   * Creates the actual shape for showing the overlay for the given cell state.
   *
   * Parameters:
   *
   * state - <mxCellState> for which the overlay should be created.
   */
  createCellOverlays(state: any): void;
  /**
   * Initializes the given overlay.
   *
   * Parameters:
   *
   * state - <mxCellState> for which the overlay should be created.
   * overlay - <mxImageShape> that represents the overlay.
   */
  initializeOverlay(state: any, overlay: any): void;
  /**
   * Installs the listeners for the given <mxCellState>, <mxCellOverlay> and
   * <mxShape> that represents the overlay.
   */
  installCellOverlayListeners(state: any, overlay: any, shape: any): void;
  /**
   * Creates the control for the given cell state.
   *
   * Parameters:
   *
   * state - <mxCellState> for which the control should be created.
   */
  createControl(state: any): void;
  /**
   * Hook for creating the click handler for the folding icon.
   *
   * Parameters:
   *
   * state - <mxCellState> whose control click handler should be returned.
   */
  createControlClickHandler(state: any): any;
  /**
   * Initializes the given control and returns the corresponding DOM node.
   *
   * Parameters:
   *
   * state - <mxCellState> for which the control should be initialized.
   * control - <mxShape> to be initialized.
   * handleEvents - Boolean indicating if mousedown and mousemove should fire events via the graph.
   * clickHandler - Optional function to implement clicks on the control.
   */
  initControl(state: any, control: any, handleEvents: any, clickHandler: any): any;
  /**
   * Returns true if the event is for the shape of the given state. This
   * implementation always returns true.
   *
   * Parameters:
   *
   * state - <mxCellState> whose shape fired the event.
   * evt - Mouse event which was fired.
   */
  isShapeEvent(state: any, evt: any): boolean;
  /**
   * Returns true if the event is for the label of the given state. This
   * implementation always returns true.
   *
   * Parameters:
   *
   * state - <mxCellState> whose label fired the event.
   * evt - Mouse event which was fired.
   */
  isLabelEvent(state: any, evt: any): boolean;
  /**
   * Installs the event listeners for the given cell state.
   *
   * Parameters:
   *
   * state - <mxCellState> for which the event listeners should be isntalled.
   */
  installListeners(state: any): void;
  /**
   * Redraws the label for the given cell state.
   *
   * Parameters:
   *
   * state - <mxCellState> whose label should be redrawn.
   */
  redrawLabel(state: any, forced: any): void;
  /**
   * Returns true if the style for the text shape has changed.
   *
   * Parameters:
   *
   * state - <mxCellState> whose label should be checked.
   * shape - <mxText> shape to be checked.
   */
  isTextShapeInvalid(state: any, shape: any): any;
  /**
   * Called to invoked redraw on the given text shape.
   *
   * Parameters:
   *
   * shape - <mxText> shape to be redrawn.
   */
  redrawLabelShape(shape: any): void;
  /**
   * Returns the scaling used for the label of the given state
   *
   * Parameters:
   *
   * state - <mxCellState> whose label scale should be returned.
   */
  getTextScale(state: any): any;
  /**
   * Returns the bounds to be used to draw the label of the given state.
   *
   * Parameters:
   *
   * state - <mxCellState> whose label bounds should be returned.
   */
  getLabelBounds(state: any): mxRectangle;
  /**
   * Adds the shape rotation to the given label bounds and
   * applies the alignment and offsets.
   *
   * Parameters:
   *
   * state - <mxCellState> whose label bounds should be rotated.
   * bounds - <mxRectangle> the rectangle to be rotated.
   */
  rotateLabelBounds(state: any, bounds: any): void;
  /**
   * Redraws the overlays for the given cell state.
   *
   * Parameters:
   *
   * state - <mxCellState> whose overlays should be redrawn.
   */
  redrawCellOverlays(state: any, forced: any): void;
  /**
   * Redraws the control for the given cell state.
   *
   * Parameters:
   *
   * state - <mxCellState> whose control should be redrawn.
   */
  redrawControl(state: any, forced: any): void;
  /**
   * Returns the bounds to be used to draw the control (folding icon) of the
   * given state.
   */
  getControlBounds(state: any, w: any, h: any): mxRectangle;
  /**
   * Inserts the given array of <mxShapes> after the given nodes in the DOM.
   *
   * Parameters:
   *
   * shapes - Array of <mxShapes> to be inserted.
   * node - Node in <drawPane> after which the shapes should be inserted.
   * htmlNode - Node in the graph container after which the shapes should be inserted that
   * will not go into the <drawPane> (eg. HTML labels without foreignObjects).
   */
  insertStateAfter(state: any, node: any, htmlNode: any): any[];
  /**
   * Returns the <mxShapes> for the given cell state in the order in which they should
   * appear in the DOM.
   *
   * Parameters:
   *
   * state - <mxCellState> whose shapes should be returned.
   */
  getShapesForState(state: any): any[];
  /**
   * Updates the bounds or points and scale of the shapes for the given cell
   * state. This is called in mxGraphView.validatePoints as the last step of
   * updating all cells.
   *
   * Parameters:
   *
   * state - <mxCellState> for which the shapes should be updated.
   * force - Optional boolean that specifies if the cell should be reconfiured
   * and redrawn without any additional checks.
   * rendering - Optional boolean that specifies if the cell should actually
   * be drawn into the DOM. If this is false then redraw and/or reconfigure
   * will not be called on the shape.
   */
  redraw(state: mxCellState, force?: any, rendering?: any): void;
  /**
   * Redraws the shape for the given cell state.
   *
   * Parameters:
   *
   * state - <mxCellState> whose label should be redrawn.
   */
  redrawShape(state: any, force: any, rendering: any): boolean;
  /**
   * Invokes redraw on the shape of the given state.
   */
  doRedrawShape(state: any): void;
  /**
   * Returns true if the given shape must be repainted.
   */
  isShapeInvalid(state: any, shape: any): boolean;
  /**
   * Destroys the shapes associated with the given cell state.
   *
   * Parameters:
   *
   * state - <mxCellState> for which the shapes should be destroyed.
   */
  destroy(state: any): void;
}
