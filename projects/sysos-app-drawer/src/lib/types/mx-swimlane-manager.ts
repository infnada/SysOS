/**
 * Manager for swimlanes and nested swimlanes that sets the size of newly added
 * swimlanes to that of their siblings, and propagates changes to the size of a
 * swimlane to its siblings, if <siblings> is true, and its ancestors, if
 * <bubbling> is true.
 *
 * Constructor: mxSwimlaneManager
 *
 * Constructs a new swimlane manager for the given graph.
 *
 * Arguments:
 *
 * graph - Reference to the enclosing graph.
 */
import {mxEventSource} from "./mx-event-source";

export interface mxSwimlaneManager extends mxEventSource {
  constructor(graph?: any, horizontal?: any, addEnabled?: any, resizeEnabled?: any);
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
   * enabled - Boolean that specifies the new enabled state.
   */
  setEnabled(value: any): void;
  /**
   * Returns <horizontal>.
   */
  isHorizontal(): any;
  /**
   * Sets <horizontal>.
   */
  setHorizontal(value: any): void;
  /**
   * Returns <addEnabled>.
   */
  isAddEnabled(): any;
  /**
   * Sets <addEnabled>.
   */
  setAddEnabled(value: any): void;
  /**
   * Returns <resizeEnabled>.
   */
  isResizeEnabled(): any;
  /**
   * Sets <resizeEnabled>.
   */
  setResizeEnabled(value: any): void;
  /**
   * Returns the graph that this manager operates on.
   */
  getGraph(): any;
  /**
   * Sets the graph that the manager operates on.
   */
  setGraph(graph: any): void;
  /**
   * Returns true if the given swimlane should be ignored.
   */
  isSwimlaneIgnored(swimlane: any): boolean;
  /**
   * Returns true if the given cell is horizontal. If the given cell is not a
   * swimlane, then the global orientation is returned.
   */
  isCellHorizontal(cell: any): boolean;
  /**
   * Called if any cells have been added.
   *
   * Parameters:
   *
   * cell - Array of <mxCells> that have been added.
   */
  cellsAdded(cells: any): void;
  /**
   * Updates the size of the given swimlane to match that of any existing
   * siblings swimlanes.
   *
   * Parameters:
   *
   * swimlane - <mxCell> that represents the new swimlane.
   */
  swimlaneAdded(swimlane: any): void;
  /**
   * Called if any cells have been resizes. Calls <swimlaneResized> for all
   * swimlanes where <isSwimlaneIgnored> returns false.
   *
   * Parameters:
   *
   * cells - Array of <mxCells> whose size was changed.
   */
  cellsResized(cells: any): void;
  /**
   * Called from <cellsResized> for all swimlanes that are not ignored to update
   * the size of the siblings and the size of the parent swimlanes, recursively,
   * if <bubbling> is true.
   *
   * Parameters:
   *
   * swimlane - <mxCell> whose size has changed.
   */
  resizeSwimlane(swimlane: any, w: any, h: any, parentHorizontal: any): void;
  /**
   * Removes all handlers from the <graph> and deletes the reference to it.
   */
  destroy(): void;
}
