/**
 *
 * Implements a basic animation in JavaScript.
 *
 * Constructor: mxAnimation
 *
 * Constructs an animation.
 *
 * Parameters:
 *
 * graph - Reference to the enclosing <mxGraph>.
 */
import {mxEventSource} from './mx-event-source';

export interface mxAnimation extends mxEventSource {
  (delay: any): void;
  /**
   * Returns true if the animation is running.
   */
  isRunning(): boolean;
  /**
   * Starts the animation by repeatedly invoking updateAnimation.
   */
  startAnimation(): void;
  /**
   * Hook for subclassers to implement the animation. Invoke stopAnimation
   * when finished, startAnimation to resume. This is called whenever the
   * timer fires and fires an mxEvent.EXECUTE event with no properties.
   */
  updateAnimation(): void;
  /**
   * Stops the animation by deleting the timer and fires an <mxEvent.DONE>.
   */
  stopAnimation(): void;
}
