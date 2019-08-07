import {mxElbowEdgeHandler} from "./mx-elbow-edge-handler";

export interface mxEdgeSegmentHandler extends mxElbowEdgeHandler {
  constructor(state: any);
  /**
   * Returns the current absolute points.
   */
  getCurrentPoints(): any;
  /**
   * Updates the given preview state taking into account the state of the constraint handler.
   */
  getPreviewPoints(point: any): any;
  /**
   * Overridden to perform optimization of the edge style result.
   */
  updatePreviewState(edge: any, point: any, terminalState: any, me: any): void;
  /**
   * Overriden to merge edge segments.
   */
  connect(edge: any, terminal: any, isSource: any, isClone: any, me: any): any;
  /**
   * Returns no tooltips.
   */
  getTooltipForNode(node: any): any;
  /**
   * Adds custom bends for the center of each segment.
   */
  start(x: any, y: any, index: any): void;
  /**
   * Adds custom bends for the center of each segment.
   */
  createBends(): any[];
  /**
   * Overridden to invoke <refresh> before the redraw.
   */
  redraw(): void;
  /**
   * Updates the position of the custom bends.
   */
  redrawInnerBends(p0: any, pe: any): void;
}
