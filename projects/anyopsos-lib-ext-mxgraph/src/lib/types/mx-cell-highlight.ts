/**
 * A helper class to highlight cells. Here is an example for a given cell.
 *
 * (code)
 * var highlight = new mxCellHighlight(graph, '#ff0000', 2);
 * highlight.highlight(graph.view.getState(cell)));
 * (end)
 *
 * Constructor: mxCellHighlight
 *
 * Constructs a cell highlight.
 */
export interface mxCellHighlight {
  (graph: any, highlightColor: any, strokeWidth: any, dashed: any): void;
  /**
   * Sets the color of the rectangle used to highlight drop targets.
   *
   * Parameters:
   *
   * color - String that represents the new highlight color.
   */
  setHighlightColor(color: any): void;
  /**
   * Creates and returns the highlight shape for the given state.
   */
  drawHighlight(): void;
  /**
   * Creates and returns the highlight shape for the given state.
   */
  createShape(): any;
  /**
   * Updates the highlight after a change of the model or view.
   */
  getStrokeWidth(state: any): any;
  /**
   * Updates the highlight after a change of the model or view.
   */
  repaint(): void;
  /**
   * Resets the state of the cell marker.
   */
  hide(): void;
  /**
   * Marks the <markedState> and fires a <mark> event.
   */
  highlight(state: any): void;
  /**
   * Returns true if this highlight is at the given position.
   */
  isHighlightAt(x: any, y: any): boolean;
  /**
   * Destroys the handler and all its resources and DOM nodes.
   */
  destroy(): void;
}
