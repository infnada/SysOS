/**
 *
 * Implements animation for morphing cells. Here is an example of
 * using this class for animating the result of a layout algorithm:
 *
 * (code)
 * graph.getModel().beginUpdate();
 * try
 * {
 *   var circleLayout = new mxCircleLayout(graph);
 *   circleLayout.execute(graph.getDefaultParent());
 * }
 * finally
 * {
 *   var morph = new mxMorphing(graph);
 *   morph.addListener(mxEvent.DONE, function()
 *   {
 *     graph.getModel().endUpdate();
 *   });
 *
 *   morph.startAnimation();
 * }
 * (end)
 *
 * Constructor: mxMorphing
 *
 * Constructs an animation.
 *
 * Parameters:
 *
 * graph - Reference to the enclosing <mxGraph>.
 * steps - Optional number of steps in the morphing animation. Default is 6.
 * ease - Optional easing constant for the animation. Default is 1.5.
 * delay - Optional delay between the animation steps. Passed to <mxAnimation>.
 */
import {mxAnimation} from './mx-animation';
import {mxPoint} from './mx-point';

export interface mxMorphing extends mxAnimation {
  (graph?: any, steps?: any, ease?: any, delay?: any): void;
  /**
   * Animation step.
   */
  updateAnimation(): void;
  /**
   * Shows the changes in the given <mxCellStatePreview>.
   */
  show(move: any): void;
  /**
   * Animates the given cell state using <mxCellStatePreview.moveState>.
   */
  animateCell(cell: any, move: any, recurse: any): void;
  /**
   * Returns true if the animation should not recursively find more
   * deltas for children if the given parent state has been animated.
   */
  stopRecursion(state: any, delta: any): boolean;
  /**
   * Returns the vector between the current rendered state and the future
   * location of the state after the display will be updated.
   */
  getDelta(state: any): mxPoint;
  /**
   * Returns the top, left corner of the given cell. TODO: Improve performance
   * by using caching inside this method as the result per cell never changes
   * during the lifecycle of this object.
   */
  getOriginForCell(cell: any): any;
}
