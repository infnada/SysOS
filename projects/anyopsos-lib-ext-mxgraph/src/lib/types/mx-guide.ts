/**
 * Implements the alignment of selection cells to other cells in the graph.
 *
 * Constructor: mxGuide
 *
 * Constructs a new guide object.
 */
import {mxPolyline} from './mx-polyline';

export interface mxGuide {
  (graph: any, states: any): void;
  /**
   * Sets the <mxCellStates> that should be used for alignment.
   */
  setStates(states: any): void;
  /**
   * Returns true if the guide should be enabled for the given native event. This
   * implementation always returns true.
   */
  isEnabledForEvent(evt: any): boolean;
  /**
   * Returns the tolerance for the guides. Default value is gridSize / 2.
   */
  getGuideTolerance(): number;
  /**
   * Returns the mxShape to be used for painting the respective guide. This
   * implementation returns a new, dashed and crisp <mxPolyline> using
   * <mxConstants.GUIDE_COLOR> and <mxConstants.GUIDE_STROKEWIDTH> as the format.
   *
   * Parameters:
   *
   * horizontal - Boolean that specifies which guide should be created.
   */
  createGuideShape(horizontal: any): mxPolyline;
  /**
   * Moves the <bounds> by the given <mxPoint> and returnt the snapped point.
   */
  move(bounds: any, delta: any, gridEnabled: any): any;
  /**
   * Hides all current guides.
   */
  getGuideColor(state: any, horizontal: any): string;
  /**
   * Hides all current guides.
   */
  hide(): void;
  /**
   * Shows or hides the current guides.
   */
  setVisible(visible: any): void;
  /**
   * Destroys all resources that this object uses.
   */
  destroy(): void;
}
