/**
 * Toolbar for the editor. This modifies the state of the graph
 * or inserts new cells upon mouse clicks.
 *
 * Example:
 *
 * Create a toolbar with a button to copy the selection into the clipboard,
 * and a combo box with one action to paste the selection from the clipboard
 * into the graph.
 *
 * (code)
 * var toolbar = new mxDefaultToolbar(container, editor);
 * toolbar.addItem('Copy', null, 'copy');
 *
 * var combo = toolbar.addActionCombo('More actions...');
 * toolbar.addActionOption(combo, 'Paste', 'paste');
 * (end)
 *
 * Codec:
 *
 * This class uses the <mxDefaultToolbarCodec> to read configuration
 * data into an existing instance. See <mxDefaultToolbarCodec> for a
 * description of the configuration format.
 *
 * Constructor: mxDefaultToolbar
 *
 * Constructs a new toolbar for the given container and editor. The
 * container and editor may be null if a prototypical instance for a
 * <mxDefaultKeyHandlerCodec> is created.
 *
 * Parameters:
 *
 * container - DOM node that contains the toolbar.
 * editor - Reference to the enclosing <mxEditor>.
 */
export interface mxDefaultToolbar {
  (container: any, editor: any): void;
  /**
   * Constructs the <toolbar> for the given container and installs a listener
   * that updates the <mxEditor.insertFunction> on <editor> if an item is
   * selected in the toolbar. This assumes that <editor> is not null.
   *
   * Parameters:
   *
   * container - DOM node that contains the toolbar.
   */
  init(container: any): void;
  /**
   * Adds a new item that executes the given action in <editor>. The title,
   * icon and pressedIcon are used to display the toolbar item.
   *
   * Parameters:
   *
   * title - String that represents the title (tooltip) for the item.
   * icon - URL of the icon to be used for displaying the item.
   * action - Name of the action to execute when the item is clicked.
   * pressed - Optional URL of the icon for the pressed state.
   */
  addItem(title: any, icon: any, action: any, pressed: any): any;
  /**
   * Adds a vertical separator using the optional icon.
   *
   * Parameters:
   *
   * icon - Optional URL of the icon that represents the vertical separator.
   * Default is <mxClient.imageBasePath> + '/separator.gif'.
   */
  addSeparator(icon: any): void;
  /**
   * Helper method to invoke <mxToolbar.addCombo> on <toolbar> and return the
   * resulting DOM node.
   */
  addCombo(): any;
  /**
   * Helper method to invoke <mxToolbar.addActionCombo> on <toolbar> using
   * the given title and return the resulting DOM node.
   *
   * Parameters:
   *
   * title - String that represents the title of the combo.
   */
  addActionCombo(title: any): any;
  /**
   * Binds the given action to a option with the specified label in the
   * given combo. Combo is an object returned from an earlier call to
   * <addCombo> or <addActionCombo>.
   *
   * Parameters:
   *
   * combo - DOM node that represents the combo box.
   * title - String that represents the title of the combo.
   * action - Name of the action to execute in <editor>.
   */
  addActionOption(combo: any, title: any, action: any): void;
  /**
   * Helper method to invoke <mxToolbar.addOption> on <toolbar> and return
   * the resulting DOM node that represents the option.
   *
   * Parameters:
   *
   * combo - DOM node that represents the combo box.
   * title - String that represents the title of the combo.
   * value - Object that represents the value of the option.
   */
  addOption(combo: any, title: any, value: any): any;
  /**
   * Creates an item for selecting the given mode in the <editor>'s graph.
   * Supported modenames are select, connect and pan.
   *
   * Parameters:
   *
   * title - String that represents the title of the item.
   * icon - URL of the icon that represents the item.
   * mode - String that represents the mode name to be used in
   * <mxEditor.setMode>.
   * pressed - Optional URL of the icon that represents the pressed state.
   * funct - Optional JavaScript function that takes the <mxEditor> as the
   * first and only argument that is executed after the mode has been
   * selected.
   */
  addMode(title: any, icon: any, mode: any, pressed: any, funct: any): any;
  /**
   * Creates an item for inserting a clone of the specified prototype cell into
   * the <editor>'s graph. The ptype may either be a cell or a function that
   * returns a cell.
   *
   * Parameters:
   *
   * title - String that represents the title of the item.
   * icon - URL of the icon that represents the item.
   * ptype - Function or object that represents the prototype cell. If ptype
   * is a function then it is invoked with no arguments to create new
   * instances.
   * pressed - Optional URL of the icon that represents the pressed state.
   * insert - Optional JavaScript function that handles an insert of the new
   * cell. This function takes the <mxEditor>, new cell to be inserted, mouse
   * event and optional <mxCell> under the mouse pointer as arguments.
   * toggle - Optional boolean that specifies if the item can be toggled.
   * Default is true.
   */
  addPrototype(title: any, icon: any, ptype: any, pressed: any, insert: any, toggle: any): any;
  /**
   * Handles a drop from a toolbar item to the graph. The given vertex
   * represents the new cell to be inserted. This invokes <insert> or
   * <connect> depending on the given target cell.
   *
   * Parameters:
   *
   * vertex - <mxCell> to be inserted.
   * evt - Mouse event that represents the drop.
   * target - Optional <mxCell> that represents the drop target.
   */
  drop(vertex: any, evt: any, target: any): void;
  /**
   * Handles a drop by inserting the given vertex into the given parent cell
   * or the default parent if no parent is specified.
   *
   * Parameters:
   *
   * vertex - <mxCell> to be inserted.
   * evt - Mouse event that represents the drop.
   * parent - Optional <mxCell> that represents the parent.
   */
  insert(vertex: any, evt: any, target: any): any;
  /**
   * Handles a drop by connecting the given vertex to the given source cell.
   *
   * vertex - <mxCell> to be inserted.
   * evt - Mouse event that represents the drop.
   * source - Optional <mxCell> that represents the source terminal.
   */
  connect(vertex: any, evt: any, source: any): void;
  /**
   * Makes the given img draggable using the given function for handling a
   * drop event.
   *
   * Parameters:
   *
   * img - DOM node that represents the image.
   * dropHandler - Function that handles a drop of the image.
   */
  installDropHandler(img: any, dropHandler: any): void;
  /**
   * Destroys the <toolbar> associated with this object and removes all
   * installed listeners. This does normally not need to be called, the
   * <toolbar> is destroyed automatically when the window unloads (in IE) by
   * <mxEditor>.
   */
  destroy(): void;
}
