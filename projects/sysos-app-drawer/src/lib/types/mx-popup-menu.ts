/**
 * Basic popup menu. To add a vertical scrollbar to a given submenu, the
 * following code can be used.
 *
 * (code)
 * var mxPopupMenuShowMenu = mxPopupMenu.prototype.showMenu;
 * mxPopupMenu.prototype.showMenu = function()
 * {
 *   mxPopupMenuShowMenu.apply(this, arguments);
 *
 *   this.div.style.overflowY = 'auto';
 *   this.div.style.overflowX = 'hidden';
 *   this.div.style.maxHeight = '160px';
 * };
 * (end)
 *
 * Constructor: mxPopupMenu
 *
 * Constructs a popupmenu.
 *
 * Event: mxEvent.SHOW
 *
 * Fires after the menu has been shown in <popup>.
 */
import {mxEventSource} from "./mx-event-source";

export interface mxPopupMenu extends mxEventSource {
  constructor(factoryMethod?: any);
  /**
   * Initializes the shapes required for this vertex handler.
   */
  init(): void;
  /**
   * Returns true if events are handled. This implementation
   * returns <enabled>.
   */
  isEnabled(): any;
  /**
   * Enables or disables event handling. This implementation
   * updates <enabled>.
   */
  setEnabled(enabled: any): void;
  /**
   * Returns true if the given event is a popupmenu trigger for the optional
   * given cell.
   *
   * Parameters:
   *
   * me - <mxMouseEvent> that represents the mouse event.
   */
  isPopupTrigger(me: any): any;
  /**
   * Adds the given item to the given parent item. If no parent item is specified
   * then the item is added to the top-level menu. The return value may be used
   * as the parent argument, ie. as a submenu item. The return value is the table
   * row that represents the item.
   *
   * Paramters:
   *
   * title - String that represents the title of the menu item.
   * image - Optional URL for the image icon.
   * funct - Function associated that takes a mouseup or touchend event.
   * parent - Optional item returned by <addItem>.
   * iconCls - Optional string that represents the CSS class for the image icon.
   * IconsCls is ignored if image is given.
   * enabled - Optional boolean indicating if the item is enabled. Default is true.
   * active - Optional boolean indicating if the menu should implement any event handling.
   * Default is true.
   */
  addItem(title: any, image: any, funct: any, parent: any, iconCls: any, enabled: any, active: any): HTMLTableRowElement;
  /**
   * Adds a checkmark to the given menuitem.
   */
  addCheckmark(item: any, img: any): void;
  /**
   * Creates the nodes required to add submenu items inside the given parent
   * item. This is called in <addItem> if a parent item is used for the first
   * time. This adds various DOM nodes and a <submenuImage> to the parent.
   *
   * Parameters:
   *
   * parent - An item returned by <addItem>.
   */
  createSubmenu(parent: any): void;
  /**
   * Shows the submenu inside the given parent row.
   */
  showSubmenu(parent: any, row: any): void;
  /**
   * Adds a horizontal separator in the given parent item or the top-level menu
   * if no parent is specified.
   *
   * Parameters:
   *
   * parent - Optional item returned by <addItem>.
   * force - Optional boolean to ignore <smartSeparators>. Default is false.
   */
  addSeparator(parent: any, force: any): void;
  /**
   * Shows the popup menu for the given event and cell.
   *
   * Example:
   *
   * (code)
   * graph.panningHandler.popup = function(x, y, cell, evt)
   * {
   *   mxUtils.alert('Hello, World!');
   * }
   * (end)
   */
  popup(x: any, y: any, cell: any, evt: any): void;
  /**
   * Returns true if the menu is showing.
   */
  isMenuShowing(): boolean;
  /**
   * Shows the menu.
   */
  showMenu(): void;
  /**
   * Removes the menu and all submenus.
   */
  hideMenu(): void;
  /**
   * Removes all submenus inside the given parent.
   *
   * Parameters:
   *
   * parent - An item returned by <addItem>.
   */
  hideSubmenu(parent: any): void;
  /**
   * Destroys the handler and all its resources and DOM nodes.
   */
  destroy(): void;
}
