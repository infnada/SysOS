/**
 * An event handler that manages cell handlers and invokes their mouse event
 * processing functions.
 *
 * Group: Events
 *
 * Event: mxEvent.ADD
 *
 * Fires if a cell has been added to the selection. The <code>state</code>
 * property contains the <mxCellState> that has been added.
 *
 * Event: mxEvent.REMOVE
 *
 * Fires if a cell has been remove from the selection. The <code>state</code>
 * property contains the <mxCellState> that has been removed.
 *
 * Parameters:
 *
 * graph - Reference to the enclosing <mxGraph>.
 */
import {mxEventSource} from './mx-event-source';

export interface mxSelectionCellsHandler extends mxEventSource {
  (graph: any): void;
  /**
   * Returns <enabled>.
   */
  isEnabled(): any;
  /**
   * Sets <enabled>.
   */
  setEnabled(value: any): void;
  /**
   * Returns the handler for the given cell.
   */
  getHandler(cell: any): any;
  /**
   * Resets all handlers.
   */
  reset(): void;
  /**
   * Reloads or updates all handlers.
   */
  refresh(): void;
  /**
   * Returns true if the given handler is active and should not be redrawn.
   */
  isHandlerActive(handler: any): boolean;
  /**
   * Updates the handler for the given shape if one exists.
   */
  updateHandler(state: any): void;
  /**
   * Redirects the given event to the handlers.
   */
  mouseDown(sender: any, me: any): void;
  /**
   * Redirects the given event to the handlers.
   */
  mouseMove(sender: any, me: any): void;
  /**
   * Redirects the given event to the handlers.
   */
  mouseUp(sender: any, me: any): void;
  /**
   * Destroys the handler and all its resources and DOM nodes.
   */
  destroy(): void;
}
