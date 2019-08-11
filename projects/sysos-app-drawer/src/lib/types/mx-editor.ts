/**
 * Extends <mxEventSource> to implement a application wrapper for a graph that
 * adds <actions>, I/O using <mxCodec>, auto-layout using <mxLayoutManager>,
 * command history using <undoManager>, and standard dialogs and widgets, eg.
 * properties, help, outline, toolbar, and popupmenu. It also adds <templates>
 * to be used as cells in toolbars, auto-validation using the <validation>
 * flag, attribute cycling using <cycleAttributeValues>, higher-level events
 * such as <root>, and backend integration using <urlPost> and <urlImage>.
 *
 * Actions:
 *
 * Actions are functions stored in the <actions> array under their names. The
 * functions take the <mxEditor> as the first, and an optional <mxCell> as the
 * second argument and are invoked using <execute>. Any additional arguments
 * passed to execute are passed on to the action as-is.
 *
 * A list of built-in actions is available in the <addActions> description.
 *
 * Read/write Diagrams:
 *
 * To read a diagram from an XML string, for example from a textfield within the
 * page, the following code is used:
 *
 * (code)
 * var doc = mxUtils.parseXML(xmlString);
 * var node = doc.documentElement;
 * editor.readGraphModel(node);
 * (end)
 *
 * For reading a diagram from a remote location, use the <open> method.
 *
 * To save diagrams in XML on a server, you can set the <urlPost> variable.
 * This variable will be used in <getUrlPost> to construct a URL for the post
 * request that is issued in the <save> method. The post request contains the
 * XML representation of the diagram as returned by <writeGraphModel> in the
 * xml parameter.
 *
 * On the server side, the post request is processed using standard
 * technologies such as Java Servlets, CGI, .NET or ASP.
 *
 * Here are some examples of processing a post request in various languages.
 *
 * - Java: URLDecoder.decode(request.getParameter('xml'), 'UTF-8').replace('\n', '&#xa;')
 *
 * Note that the linefeeds should only be replaced if the XML is
 * processed in Java, for example when creating an image, but not
 * if the XML is passed back to the client-side.
 *
 * - .NET: HttpUtility.UrlDecode(context.Request.Params['xml'])
 * - PHP: urldecode($_POST['xml'])
 *
 * Creating images:
 *
 * A backend (Java, PHP or C#) is required for creating images. The
 * distribution contains an example for each backend (ImageHandler.java,
 * ImageHandler.cs and graph.php). More information about using a backend
 * to create images can be found in the readme.html files. Note that the
 * preview is implemented using VML/SVG in the browser and does not require
 * a backend. The backend is only required to creates images (bitmaps).
 *
 * Special characters:
 *
 * Note There are five characters that should always appear in XML content as
 * escapes, so that they do not interact with the syntax of the markup. These
 * are part of the language for all documents based on XML and for HTML.
 *
 * - &lt; (<)
 * - &gt; (>)
 * - &amp; (&)
 * - &quot; (')
 * - &apos; (')
 *
 * Although it is part of the XML language, &apos; is not defined in HTML.
 * For this reason the XHTML specification recommends instead the use of
 * &#39; if text may be passed to a HTML user agent.
 *
 * If you are having problems with special characters on the server-side then
 * you may want to try the <escapePostData> flag.
 *
 * For converting decimal escape sequences inside strings, a user has provided
 * us with the following function:
 *
 * (code)
 * function html2js(text)
 * {
 *   var entitySearch = /&#[0-9]+;/;
 *   var entity;
 *
 *   while (entity = entitySearch.exec(text))
 *   {
 *     var charCode = entity[0].substring(2, entity[0].length -1);
 *     text = text.substring(0, entity.index)
 *            + String.fromCharCode(charCode)
 *            + text.substring(entity.index + entity[0].length);
 *   }
 *
 *   return text;
 * }
 * (end)
 *
 * Otherwise try using hex escape sequences and the built-in unescape function
 * for converting such strings.
 *
 * Local Files:
 *
 * For saving and opening local files, no standardized method exists that
 * works across all browsers. The recommended way of dealing with local files
 * is to create a backend that streams the XML data back to the browser (echo)
 * as an attachment so that a Save-dialog is displayed on the client-side and
 * the file can be saved to the local disk.
 *
 * For example, in PHP the code that does this looks as follows.
 *
 * (code)
 * $xml = stripslashes($_POST['xml']);
 * header('Content-Disposition: attachment; filename=\'diagram.xml\'');
 * echo($xml);
 * (end)
 *
 * To open a local file, the file should be uploaded via a form in the browser
 * and then opened from the server in the editor.
 *
 * Cell Properties:
 *
 * The properties displayed in the properties dialog are the attributes and
 * values of the cell's user object, which is an XML node. The XML node is
 * defined in the templates section of the config file.
 *
 * The templates are stored in <mxEditor.templates> and contain cells which
 * are cloned at insertion time to create new vertices by use of drag and
 * drop from the toolbar. Each entry in the toolbar for adding a new vertex
 * must refer to an existing template.
 *
 * In the following example, the task node is a business object and only the
 * mxCell node and its mxGeometry child contain graph information:
 *
 * (code)
 * <Task label='Task' description=''>
 *   <mxCell vertex='true'>
 *     <mxGeometry as='geometry' width='72' height='32'/>
 *   </mxCell>
 * </Task>
 * (end)
 *
 * The idea is that the XML representation is inverse from the in-memory
 * representation: The outer XML node is the user object and the inner node is
 * the cell. This means the user object of the cell is the Task node with no
 * children for the above example:
 *
 * (code)
 * <Task label='Task' description=''/>
 * (end)
 *
 * The Task node can have any tag name, attributes and child nodes. The
 * <mxCodec> will use the XML hierarchy as the user object, while removing the
 * 'known annotations', such as the mxCell node. At save-time the cell data
 * will be 'merged' back into the user object. The user object is only modified
 * via the properties dialog during the lifecycle of the cell.
 *
 * In the default implementation of <createProperties>, the user object's
 * attributes are put into a form for editing. Attributes are changed using
 * the <mxCellAttributeChange> action in the model. The dialog can be replaced
 * by overriding the <createProperties> hook or by replacing the showProperties
 * action in <actions>. Alternatively, the entry in the config file's popupmenu
 * section can be modified to invoke a different action.
 *
 * If you want to displey the properties dialog on a doubleclick, you can set
 * <mxEditor.dblClickAction> to showProperties as follows:
 *
 * (code)
 * editor.dblClickAction = 'showProperties';
 * (end)
 *
 * Popupmenu and Toolbar:
 *
 * The toolbar and popupmenu are typically configured using the respective
 * sections in the config file, that is, the popupmenu is defined as follows:
 *
 * (code)
 * <mxEditor>
 *   <mxDefaultPopupMenu as='popupHandler'>
 * 		<add as='cut' action='cut' icon='images/cut.gif'/>
 *      ...
 * (end)
 *
 * New entries can be added to the toolbar by inserting an add-node into the
 * above configuration. Existing entries may be removed and changed by
 * modifying or removing the respective entries in the configuration.
 * The configuration is read by the <mxDefaultPopupMenuCodec>, the format of the
 * configuration is explained in <mxDefaultPopupMenu.decode>.
 *
 * The toolbar is defined in the mxDefaultToolbar section. Items can be added
 * and removed in this section.
 *
 * (code)
 * <mxEditor>
 *   <mxDefaultToolbar>
 *     <add as='save' action='save' icon='images/save.gif'/>
 *     <add as='Swimlane' template='swimlane' icon='images/swimlane.gif'/>
 *     ...
 * (end)
 *
 * The format of the configuration is described in
 * <mxDefaultToolbarCodec.decode>.
 *
 * Ids:
 *
 * For the IDs, there is an implicit behaviour in <mxCodec>: It moves the Id
 * from the cell to the user object at encoding time and vice versa at decoding
 * time. For example, if the Task node from above has an id attribute, then
 * the <mxCell.id> of the corresponding cell will have this value. If there
 * is no Id collision in the model, then the cell may be retrieved using this
 * Id with the <mxGraphModel.getCell> function. If there is a collision, a new
 * Id will be created for the cell using <mxGraphModel.createId>. At encoding
 * time, this new Id will replace the value previously stored under the id
 * attribute in the Task node.
 *
 * See <mxEditorCodec>, <mxDefaultToolbarCodec> and <mxDefaultPopupMenuCodec>
 * for information about configuring the editor and user interface.
 *
 * Programmatically inserting cells:
 *
 * For inserting a new cell, say, by clicking a button in the document,
 * the following code can be used. This requires an reference to the editor.
 *
 * (code)
 * var userObject = new Object();
 * var parent = editor.graph.getDefaultParent();
 * var model = editor.graph.model;
 * model.beginUpdate();
 * try
 * {
 *   editor.graph.insertVertex(parent, null, userObject, 20, 20, 80, 30);
 * }
 * finally
 * {
 *   model.endUpdate();
 * }
 * (end)
 *
 * If a template cell from the config file should be inserted, then a clone
 * of the template can be created as follows. The clone is then inserted using
 * the add function instead of addVertex.
 *
 * (code)
 * var template = editor.templates['task'];
 * var clone = editor.graph.model.cloneCell(template);
 * (end)
 *
 * Resources:
 *
 * resources/editor - Language resources for mxEditor
 *
 * Callback: onInit
 *
 * Called from within the constructor. In the callback,
 * 'this' refers to the editor instance.
 *
 * Cookie: mxgraph=seen
 *
 * Set when the editor is started. Never expires. Use
 * <resetFirstTime> to reset this cookie. This cookie
 * only exists if <onInit> is implemented.
 *
 * Event: mxEvent.OPEN
 *
 * Fires after a file was opened in <open>. The <code>filename</code> property
 * contains the filename that was used. The same value is also available in
 * <filename>.
 *
 * Event: mxEvent.SAVE
 *
 * Fires after the current file was saved in <save>. The <code>url</code>
 * property contains the URL that was used for saving.
 *
 * Event: mxEvent.POST
 *
 * Fires if a successful response was received in <postDiagram>. The
 * <code>request</code> property contains the <mxXmlRequest>, the
 * <code>url</code> and <code>data</code> properties contain the URL and the
 * data that were used in the post request.
 *
 * Event: mxEvent.ROOT
 *
 * Fires when the current root has changed, or when the title of the current
 * root has changed. This event has no properties.
 *
 * Event: mxEvent.BEFORE_ADD_VERTEX
 *
 * Fires before a vertex is added in <addVertex>. The <code>vertex</code>
 * property contains the new vertex and the <code>parent</code> property
 * contains its parent.
 *
 * Event: mxEvent.ADD_VERTEX
 *
 * Fires between begin- and endUpdate in <addVertex>. The <code>vertex</code>
 * property contains the vertex that is being inserted.
 *
 * Event: mxEvent.AFTER_ADD_VERTEX
 *
 * Fires after a vertex was inserted and selected in <addVertex>. The
 * <code>vertex</code> property contains the new vertex.
 *
 * Example:
 *
 * For starting an in-place edit after a new vertex has been added to the
 * graph, the following code can be used.
 *
 * (code)
 * editor.addListener(mxEvent.AFTER_ADD_VERTEX, function(sender, evt)
 * {
 *   var vertex = evt.getProperty('vertex');
 *
 *   if (editor.graph.isCellEditable(vertex))
 *   {
 *   	editor.graph.startEditingAtCell(vertex);
 *   }
 * });
 * (end)
 *
 * Event: mxEvent.ESCAPE
 *
 * Fires when the escape key is pressed. The <code>event</code> property
 * contains the key event.
 *
 * Constructor: mxEditor
 *
 * Constructs a new editor. This function invokes the <onInit> callback
 * upon completion.
 *
 * Example:
 *
 * (code)
 * var config = mxUtils.load('config/diagrameditor.xml').getDocumentElement();
 * var editor = new mxEditor(config);
 * (end)
 *
 * Parameters:
 *
 * config - Optional XML node that contains the configuration.
 */
import {mxEventSource} from './mx-event-source';
import {mxLayoutManager} from './mx-layout-manager';
import {mxDefaultToolbar} from './mx-default-toolbar';

export interface mxEditor extends mxEventSource {
  (config: any): void;
  /**
   * Returns <modified>.
   */
  isModified(): any;
  /**
   * Sets <modified> to the specified boolean value.
   */
  setModified(value: any): void;
  /**
   * Adds the built-in actions to the editor instance.
   *
   * save - Saves the graph using <urlPost>.
   * print - Shows the graph in a new print preview window.
   * show - Shows the graph in a new window.
   * exportImage - Shows the graph as a bitmap image using <getUrlImage>.
   * refresh - Refreshes the graph's display.
   * cut - Copies the current selection into the clipboard
   * and removes it from the graph.
   * copy - Copies the current selection into the clipboard.
   * paste - Pastes the clipboard into the graph.
   * delete - Removes the current selection from the graph.
   * group - Puts the current selection into a new group.
   * ungroup - Removes the selected groups and selects the children.
   * undo - Undoes the last change on the graph model.
   * redo - Redoes the last change on the graph model.
   * zoom - Sets the zoom via a dialog.
   * zoomIn - Zooms into the graph.
   * zoomOut - Zooms out of the graph
   * actualSize - Resets the scale and translation on the graph.
   * fit - Changes the scale so that the graph fits into the window.
   * showProperties - Shows the properties dialog.
   * selectAll - Selects all cells.
   * selectNone - Clears the selection.
   * selectVertices - Selects all vertices.
   * selectEdges = Selects all edges.
   * edit - Starts editing the current selection cell.
   * enterGroup - Drills down into the current selection cell.
   * exitGroup - Moves up in the drilling hierachy
   * home - Moves to the topmost parent in the drilling hierarchy
   * selectPrevious - Selects the previous cell.
   * selectNext - Selects the next cell.
   * selectParent - Selects the parent of the selection cell.
   * selectChild - Selects the first child of the selection cell.
   * collapse - Collapses the currently selected cells.
   * expand - Expands the currently selected cells.
   * bold - Toggle bold text style.
   * italic - Toggle italic text style.
   * underline - Toggle underline text style.
   * alignCellsLeft - Aligns the selection cells at the left.
   * alignCellsCenter - Aligns the selection cells in the center.
   * alignCellsRight - Aligns the selection cells at the right.
   * alignCellsTop - Aligns the selection cells at the top.
   * alignCellsMiddle - Aligns the selection cells in the middle.
   * alignCellsBottom - Aligns the selection cells at the bottom.
   * alignFontLeft - Sets the horizontal text alignment to left.
   * alignFontCenter - Sets the horizontal text alignment to center.
   * alignFontRight - Sets the horizontal text alignment to right.
   * alignFontTop - Sets the vertical text alignment to top.
   * alignFontMiddle - Sets the vertical text alignment to middle.
   * alignFontBottom - Sets the vertical text alignment to bottom.
   * toggleTasks - Shows or hides the tasks window.
   * toggleHelp - Shows or hides the help window.
   * toggleOutline - Shows or hides the outline window.
   * toggleConsole - Shows or hides the console window.
   */
  addActions(): void;
  /**
   * Configures the editor using the specified node. To load the
   * configuration from a given URL the following code can be used to obtain
   * the XML node.
   *
   * (code)
   * var node = mxUtils.load(url).getDocumentElement();
   * (end)
   *
   * Parameters:
   *
   * node - XML node that contains the configuration.
   */
  configure(node: any): void;
  /**
   * Resets the cookie that is used to remember if the editor has already
   * been used.
   */
  resetFirstTime(): void;
  /**
   * Resets the command history, modified state and counters.
   */
  resetHistory(): void;
  /**
   * Binds the specified actionname to the specified function.
   *
   * Parameters:
   *
   * actionname - String that specifies the name of the action
   * to be added.
   * funct - Function that implements the new action. The first
   * argument of the function is the editor it is used
   * with, the second argument is the cell it operates
   * upon.
   *
   * Example:
   * (code)
   * editor.addAction('test', function(editor, cell)
   * {
   * 		mxUtils.alert('test '+cell);
   * });
   * (end)
   */
  addAction(actionname: any, funct: any): void;
  /**
   * Executes the function with the given name in <actions> passing the
   * editor instance and given cell as the first and second argument. All
   * additional arguments are passed to the action as well. This method
   * contains a try-catch block and displays an error message if an action
   * causes an exception. The exception is re-thrown after the error
   * message was displayed.
   *
   * Example:
   *
   * (code)
   * editor.execute('showProperties', cell);
   * (end)
   */
  execute(actionname: any, cell: any, evt: any): void;
  /**
   * Adds the specified template under the given name in <templates>.
   */
  addTemplate(name: any, template: any): void;
  /**
   * Returns the template for the given name.
   */
  getTemplate(name: any): any;
  /**
   * Creates the <graph> for the editor. The graph is created with no
   * container and is initialized from <setGraphContainer>.
   */
  createGraph(): any;
  /**
   * Sets the graph's container using <mxGraph.init>.
   */
  createSwimlaneManager(graph: any): any;
  /**
   * Creates a layout manager for the swimlane and diagram layouts, that
   * is, the locally defined inter- and intraswimlane layouts.
   */
  createLayoutManager(graph: any): mxLayoutManager;
  /**
   * Sets the graph's container using <mxGraph.init>.
   */
  setGraphContainer(container: any): void;
  /**
   * Overrides <mxGraph.dblClick> to invoke <dblClickAction>
   * on a cell and reset the selection tool in the toolbar.
   */
  installDblClickHandler(graph: any): void;
  /**
   * Adds the <undoManager> to the graph model and the view.
   */
  installUndoHandler(graph: any): void;
  /**
   * Installs listeners for dispatching the <root> event.
   */
  installDrillHandler(graph: any): void;
  /**
   * Installs the listeners required to automatically validate
   * the graph. On each change of the root, this implementation
   * fires a <root> event.
   */
  installChangeHandler(graph: any): void;
  /**
   * Installs the handler for invoking <insertFunction> if
   * one is defined.
   */
  installInsertHandler(graph: any): void;
  /**
   * Creates the layout instance used to layout the
   * swimlanes in the diagram.
   */
  createDiagramLayout(): any;
  /**
   * Creates the layout instance used to layout the
   * children of each swimlane.
   */
  createSwimlaneLayout(): any;
  /**
   * Creates the <toolbar> with no container.
   */
  createToolbar(): mxDefaultToolbar;
  /**
   * Initializes the toolbar for the given container.
   */
  setToolbarContainer(container: any): void;
  /**
   * Creates the <status> using the specified container.
   *
   * This implementation adds listeners in the editor to
   * display the last saved time and the current filename
   * in the status bar.
   *
   * Parameters:
   *
   * container - DOM node that will contain the statusbar.
   */
  setStatusContainer(container: any): void;
  /**
   * Display the specified message in the status bar.
   *
   * Parameters:
   *
   * message - String the specified the message to
   * be displayed.
   */
  setStatus(message: any): void;
  /**
   * Creates a listener to update the inner HTML of the
   * specified DOM node with the value of <getTitle>.
   *
   * Parameters:
   *
   * container - DOM node that will contain the title.
   */
  setTitleContainer(container: any): void;
  /**
   * Executes a vertical or horizontal compact tree layout
   * using the specified cell as an argument. The cell may
   * either be a group or the root of a tree.
   *
   * Parameters:
   *
   * cell - <mxCell> to use in the compact tree layout.
   * horizontal - Optional boolean to specify the tree's
   * orientation. Default is true.
   */
  treeLayout(cell: any, horizontal: any): void;
  /**
   * Returns the string value for the current root of the
   * diagram.
   */
  getTitle(): string;
  /**
   * Returns the string value of the root cell in
   * <mxGraph.model>.
   */
  getRootTitle(): any;
  /**
   * Undo the last change in <graph>.
   */
  undo(): void;
  /**
   * Redo the last change in <graph>.
   */
  redo(): void;
  /**
   * Invokes <createGroup> to create a new group cell and the invokes
   * <mxGraph.groupCells>, using the grid size of the graph as the spacing
   * in the group's content area.
   */
  groupCells(): any;
  /**
   * Creates and returns a clone of <defaultGroup> to be used
   * as a new group cell in <group>.
   */
  createGroup(): any;
  /**
   * Opens the specified file synchronously and parses it using
   * <readGraphModel>. It updates <filename> and fires an <open>-event after
   * the file has been opened. Exceptions should be handled as follows:
   *
   * (code)
   * try
   * {
   *   editor.open(filename);
   * }
   * catch (e)
   * {
   *   mxUtils.error('Cannot open ' + filename +
   *     ': ' + e.message, 280, true);
   * }
   * (end)
   *
   * Parameters:
   *
   * filename - URL of the file to be opened.
   */
  open(filename: any): void;
  /**
   * Reads the specified XML node into the existing graph model and resets
   * the command history and modified state.
   */
  readGraphModel(node: any): void;
  /**
   * Posts the string returned by <writeGraphModel> to the given URL or the
   * URL returned by <getUrlPost>. The actual posting is carried out by
   * <postDiagram>. If the URL is null then the resulting XML will be
   * displayed using <mxUtils.popup>. Exceptions should be handled as
   * follows:
   *
   * (code)
   * try
   * {
   *   editor.save();
   * }
   * catch (e)
   * {
   *   mxUtils.error('Cannot save : ' + e.message, 280, true);
   * }
   * (end)
   */
  save(url: any, linefeed: any): void;
  /**
   * Hook for subclassers to override the posting of a diagram
   * represented by the given node to the given URL. This fires
   * an asynchronous <post> event if the diagram has been posted.
   *
   * Example:
   *
   * To replace the diagram with the diagram in the response, use the
   * following code.
   *
   * (code)
   * editor.addListener(mxEvent.POST, function(sender, evt)
   * {
   *   // Process response (replace diagram)
   *   var req = evt.getProperty('request');
   *   var root = req.getDocumentElement();
   *   editor.graph.readGraphModel(root)
   * });
   * (end)
   */
  postDiagram(url: any, data: any): void;
  /**
   * Hook to create the string representation of the diagram. The default
   * implementation uses an <mxCodec> to encode the graph model as
   * follows:
   *
   * (code)
   * var enc = new mxCodec();
   * var node = enc.encode(this.graph.getModel());
   * return mxUtils.getXml(node, this.linefeed);
   * (end)
   *
   * Parameters:
   *
   * linefeed - Optional character to be used as the linefeed. Default is
   * <linefeed>.
   */
  writeGraphModel(linefeed: any): any;
  /**
   * Returns the URL to post the diagram to. This is used
   * in <save>. The default implementation returns <urlPost>,
   * adding <code>?draft=true</code>.
   */
  getUrlPost(): any;
  /**
   * Returns the URL to create the image with. This is typically
   * the URL of a backend which accepts an XML representation
   * of a graph view to create an image. The function is used
   * in the image action to create an image. This implementation
   * returns <urlImage>.
   */
  getUrlImage(): any;
  /**
   * Swaps the styles for the given names in the graph's
   * stylesheet and refreshes the graph.
   */
  swapStyles(first: any, second: any): void;
  /**
   * Creates and shows the properties dialog for the given
   * cell. The content area of the dialog is created using
   * <createProperties>.
   */
  showProperties(cell: any): void;
  /**
   * Returns true if the properties dialog is currently visible.
   */
  isPropertiesVisible(): boolean;
  /**
   * Creates and returns the DOM node that represents the contents
   * of the properties dialog for the given cell. This implementation
   * works for user objects that are XML nodes and display all the
   * node attributes in a form.
   */
  createProperties(cell: any): any;
  /**
   * Hides the properties dialog.
   */
  hideProperties(): void;
  /**
   * Shows the tasks window. The tasks window is created using <createTasks>. The
   * default width of the window is 200 pixels, the y-coordinate of the location
   * can be specifies in <tasksTop> and the x-coordinate is right aligned with a
   * 20 pixel offset from the right border. To change the location of the tasks
   * window, the following code can be used:
   *
   * (code)
   * var oldShowTasks = mxEditor.prototype.showTasks;
   * mxEditor.prototype.showTasks = function()
   * {
   *   oldShowTasks.apply(this, arguments); // 'supercall'
   *
   *   if (this.tasks != null)
   *   {
   *     this.tasks.setLocation(10, 10);
   *   }
   * };
   * (end)
   */
  showTasks(): void;
  /**
   * Updates the contents of the tasks window using <createTasks>.
   */
  refreshTasks(div: any): void;
  /**
   * Updates the contents of the given DOM node to
   * display the tasks associated with the current
   * editor state. This is invoked whenever there
   * is a possible change of state in the editor.
   * Default implementation is empty.
   */
  createTasks(div: any): void;
  /**
   * Shows the help window. If the help window does not exist
   * then it is created using an iframe pointing to the resource
   * for the <code>urlHelp</code> key or <urlHelp> if the resource
   * is undefined.
   */
  showHelp(tasks: any): void;
  /**
   * Shows the outline window. If the window does not exist, then it is
   * created using an <mxOutline>.
   */
  showOutline(): void;
  /**
   * Puts the graph into the specified mode. The following modenames are
   * supported:
   *
   * select - Selects using the left mouse button, new connections
   * are disabled.
   * connect - Selects using the left mouse button or creates new
   * connections if mouse over cell hotspot. See <mxConnectionHandler>.
   * pan - Pans using the left mouse button, new connections are disabled.
   */
  setMode(modename: any): void;
  /**
   * Uses <popupHandler> to create the menu in the graph's
   * panning handler. The redirection is setup in
   * <setToolbarContainer>.
   */
  createPopupMenu(menu: any, cell: any, evt: any): void;
  /**
   * Uses <defaultEdge> as the prototype for creating new edges
   * in the connection handler of the graph. The style of the
   * edge will be overridden with the value returned by
   * <getEdgeStyle>.
   */
  createEdge(source: any, target: any): any;
  /**
   * Returns a string identifying the style of new edges.
   * The function is used in <createEdge> when new edges
   * are created in the graph.
   */
  getEdgeStyle(): any;
  /**
   * Returns the next attribute in <cycleAttributeValues>
   * or null, if not attribute should be used in the
   * specified cell.
   */
  consumeCycleAttribute(cell: any): any;
  /**
   * Uses the returned value from <consumeCycleAttribute>
   * as the value for the <cycleAttributeName> key in
   * the given cell's style.
   */
  cycleAttribute(cell: any): void;
  /**
   * Adds the given vertex as a child of parent at the specified
   * x and y coordinate and fires an <addVertex> event.
   */
  addVertex(parent: any, vertex: any, x: any, y: any): any;
  /**
   * Removes the editor and all its associated resources. This does not
   * normally need to be called, it is called automatically when the window
   * unloads.
   */
  destroy(): void;
}
