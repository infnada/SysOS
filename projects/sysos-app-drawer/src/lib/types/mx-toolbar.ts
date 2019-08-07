/**
 * Creates a toolbar inside a given DOM node. The toolbar may contain icons,
 * buttons and combo boxes.
 *
 * Event: mxEvent.SELECT
 *
 * Fires when an item was selected in the toolbar. The <code>function</code>
 * property contains the function that was selected in <selectMode>.
 *
 * Constructor: mxToolbar
 *
 * Constructs a toolbar in the specified container.
 *
 * Parameters:
 *
 * container - DOM node that contains the toolbar.
 */
import {mxEventSource} from "./mx-event-source";

export interface mxToolbar extends mxEventSource {
  constructor(container: any);
  /**
   * Adds the given function as an image with the specified title and icon
   * and returns the new image node.
   *
   * Parameters:
   *
   * title - Optional string that is used as the tooltip.
   * icon - Optional URL of the image to be used. If no URL is given, then a
   * button is created.
   * funct - Function to execute on a mouse click.
   * pressedIcon - Optional URL of the pressed image. Default is a gray
   * background.
   * style - Optional style classname. Default is mxToolbarItem.
   * factoryMethod - Optional factory method for popup menu, eg.
   * function(menu, evt, cell) { menu.addItem('Hello, World!'); }
   */
  addItem(title: any, icon: any, funct: any, pressedIcon: any, style: any, factoryMethod: any): HTMLImageElement | HTMLButtonElement;
  /**
   * Adds and returns a new SELECT element using the given style. The element
   * is placed inside a DIV with the mxToolbarComboContainer style classname.
   *
   * Parameters:
   *
   * style - Optional style classname. Default is mxToolbarCombo.
   */
  addCombo(style: any): HTMLSelectElement;
  /**
   * Adds and returns a new SELECT element using the given title as the
   * default element. The selection is reset to this element after each
   * change.
   *
   * Parameters:
   *
   * title - String that specifies the title of the default element.
   * style - Optional style classname. Default is mxToolbarCombo.
   */
  addActionCombo(title: any, style: any): HTMLSelectElement;
  /**
   * Adds and returns a new OPTION element inside the given SELECT element.
   * If the given value is a function then it is stored in the option's funct
   * field.
   *
   * Parameters:
   *
   * combo - SELECT element that will contain the new entry.
   * title - String that specifies the title of the option.
   * value - Specifies the value associated with this option.
   */
  addOption(combo: any, title: any, value: any): HTMLOptionElement;
  /**
   * Adds a new selectable item to the toolbar. Only one switch mode item may
   * be selected at a time. The currently selected item is the default item
   * after a reset of the toolbar.
   */
  addSwitchMode(title: any, icon: any, funct: any, pressedIcon: any, style: any): HTMLImageElement;
  /**
   * Adds a new item to the toolbar. The selection is typically reset after
   * the item has been consumed, for example by adding a new vertex to the
   * graph. The reset is not carried out if the item is double clicked.
   *
   * The function argument uses the following signature: funct(evt, cell) where
   * evt is the native mouse event and cell is the cell under the mouse.
   */
  addMode(title: any, icon: any, funct: any, pressedIcon?: any, style?: any, toggle?: any): HTMLImageElement | HTMLButtonElement;
  /**
   * Resets the state of the previously selected mode and displays the given
   * DOM node as selected. This function fires a select event with the given
   * function as a parameter.
   */
  selectMode(domNode: any, funct: any): void;
  /**
   * Selects the default mode and resets the state of the previously selected
   * mode.
   */
  resetMode(forced: any): void;
  /**
   * Adds the specifies image as a separator.
   *
   * Parameters:
   *
   * icon - URL of the separator icon.
   */
  addSeparator(icon: any): any;
  /**
   * Adds a break to the container.
   */
  addBreak(): void;
  /**
   * Adds a horizontal line to the container.
   */
  addLine(): void;
  /**
   * Removes the toolbar and all its associated resources.
   */
  destroy(): void;
}
