/**
 * Event handler that creates popupmenus.
 *
 * Constructor: mxPopupMenuHandler
 *
 * Constructs an event handler that creates a <mxPopupMenu>.
 */
import {mxPopupMenu} from "./mx-popup-menu";

export interface mxPopupMenuHandler extends mxPopupMenu {
  constructor(graph?: any, factoryMethod?: any);
  /**
   * Initializes the shapes required for this vertex handler.
   */
  init(): void;
  /**
   * Hook for returning if a cell should be selected for a given <mxMouseEvent>.
   * This implementation returns <selectOnPopup>.
   */
  isSelectOnPopup(me: any): any;
  /**
   * Handles the event by initiating the panning. By consuming the event all
   * subsequent events of the gesture are redirected to this handler.
   */
  mouseDown(sender: any, me: any): void;
  /**
   * Handles the event by updating the panning on the graph.
   */
  mouseMove(sender: any, me: any): void;
  /**
   * Handles the event by setting the translation on the view or showing the
   * popupmenu.
   */
  mouseUp(sender: any, me: any): void;
  /**
   * Hook to return the cell for the mouse up popup trigger handling.
   */
  getCellForPopupEvent(me: any): any;
  /**
   * Destroys the handler and all its resources and DOM nodes.
   */
  destroy(): void;
}
