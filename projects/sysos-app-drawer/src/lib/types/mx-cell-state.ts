/**
 * Represents the current state of a cell in a given <mxGraphView>.
 *
 * For edges, the edge label position is stored in <absoluteOffset>.
 *
 * The size for oversize labels can be retrieved using the boundingBox property
 * of the <text> field as shown below.
 *
 * @example
 * var bbox = (state.text != null) ? state.text.boundingBox : null;
 */
import {mxRectangle} from "./mx-rectangle";
import {mxGraphView} from "./mx-graph-view";
import {mxCell} from "./mx-cell";
import {mxPoint} from "./mx-point";
import {mxShape} from "./mx-shape";
import {mxText} from "./mx-text";

export interface mxCellState {
  /**
   * Reference to the enclosing <mxGraphView>.
   */
  view: mxGraphView;
  /**
   * Reference to the <mxCell> that is represented by this state.
   */
  cell: mxCell;
  /**
   * Contains an array of key, value pairs that represent the style of the
   * cell.
   */
  style: any;
  /**
   * Specifies if the state is invalid. Default is true.
   */
  invalid: boolean;
  /**
   * <mxPoint> that holds the origin for all child cells. Default is a new
   * empty <mxPoint>.
   */
  origin: mxPoint;
  /**
   * Holds an array of <mxPoints> that represent the absolute points of an
   * edge.
   */
  absolutePoints: mxPoint[];
  /**
   * <mxPoint> that holds the absolute offset. For edges, this is the
   * absolute coordinates of the label position. For vertices, this is the
   * offset of the label relative to the top, left corner of the vertex.
   */
  absoluteOffset: mxPoint;
  /**
   * Caches the visible source terminal state.
   */
  visibleSourceState: any;
  /**
   * Caches the visible target terminal state.
   */
  visibleTargetState: any;
  /**
   * Caches the distance between the end points for an edge.
   */
  terminalDistance: number;
  /**
   * Caches the length of an edge.
   */
  length: number;
  /**
   * Array of numbers that represent the cached length of each segment of the
   * edge.
   */
  segments: number[];
  /**
   * Holds the <mxShape> that represents the cell graphically.
   */
  shape: mxShape;
  /**
   * Holds the <mxText> that represents the label of the cell. Thi smay be
   * null if the cell has no label.
   */
  text: mxText;
  /**
   * Holds the unscaled width of the state.
   */
  unscaledWidth: any;
  /**
   * Implicit variable declarations
   */
  cellBounds: mxRectangle;
  paintBounds: mxRectangle;
  /**
   * Constructs a new object that represents the current state of the given
   * cell in the specified view.
   *
   * @param view - <mxGraphView> that contains the state.
   * @param cell - <mxCell> that this state represents.
   * @param style - Array of key, value pairs that constitute the style.
   */
  constructor(view: mxGraphView, cell: mxCell, style: any[]);
  /**
   * Returns the <mxRectangle> that should be used as the perimeter of the
   * cell.
   *
   * @param border - Optional border to be added around the perimeter bounds.
   * @param bounds - Optional <mxRectangle> to be used as the initial bounds.
   */
  getPerimeterBounds(border?: number, bounds?: mxRectangle): mxRectangle;
  /**
   * Sets the first or last point in <absolutePoints> depending on isSource.
   *
   * @param point - <mxPoint> that represents the terminal point.
   * @param isSource - Boolean that specifies if the first or last point should
   * be assigned.
   */
  setAbsoluteTerminalPoint(point: mxPoint, isSource: boolean): void;
  /**
   * Sets the given cursor on the shape and text shape.
   */
  setCursor(cursor: any): void;
  /**
   * Returns the visible source or target terminal cell.
   *
   * @param source - Boolean that specifies if the source or target cell should be
   * returned.
   */
  getVisibleTerminal(source: boolean): any;
  /**
   * Returns the visible source or target terminal state.
   *
   * @param source - Boolean that specifies if the source or target state should be
   * returned.
   */
  getVisibleTerminalState(source: boolean): any;
  /**
   * Sets the visible source or target terminal state.
   *
   * @param terminalState - <mxCellState> that represents the terminal.
   * @param source - Boolean that specifies if the source or target state should be set.
   */
  setVisibleTerminalState(terminalState: mxCellState, source: boolean): void;
  /**
   * Returns the unscaled, untranslated bounds.
   */
  getCellBounds(): mxRectangle;
  /**
   * Returns the unscaled, untranslated paint bounds. This is the same as
   * <getCellBounds> but with a 90 degree rotation if the shape's
   * isPaintBoundsInverted returns true.
   */
  getPaintBounds(): mxRectangle;
  /**
   * Updates the cellBounds and paintBounds.
   */
  updateCachedBounds(): void;
  /**
   * Destructor: setState
   *
   * Copies all fields from the given state to this state.
   */
  setState(state: mxCellState): void;
  /**
   * Returns a clone of this <mxCellState>.
   */
  clone(): mxCellState;
  /**
   * Destructor: destroy
   *
   * Destroys the state and all associated resources.
   */
  destroy(): void;
}
