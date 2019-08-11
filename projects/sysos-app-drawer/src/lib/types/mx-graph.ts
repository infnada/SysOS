/**
 * Extends <mxEventSource> to implement a graph component for
 * the browser. This is the main class of the package. To activate
 * panning and connections use <setPanning> and <setConnectable>.
 * For rubberband selection you must create a new instance of
 * <mxRubberband>. The following listeners are added to
 * <mouseListeners> by default:
 *
 * - <tooltipHandler>: <mxTooltipHandler> that displays tooltips
 * - <panningHandler>: <mxPanningHandler> for panning and popup menus
 * - <connectionHandler>: <mxConnectionHandler> for creating connections
 * - <graphHandler>: <mxGraphHandler> for moving and cloning cells
 *
 * These listeners will be called in the above order if they are enabled.
 *
 * Background Images:
 *
 * To display a background image, set the image, image width and
 * image height using <setBackgroundImage>. If one of the
 * above values has changed then the <view>'s <mxGraphView.validate>
 * should be invoked.
 *
 * Cell Images:
 *
 * To use images in cells, a shape must be specified in the default
 * vertex style (or any named style). Possible shapes are
 * <mxConstants.SHAPE_IMAGE> and <mxConstants.SHAPE_LABEL>.
 * The code to change the shape used in the default vertex style,
 * the following code is used:
 *
 * (code)
 * var style = graph.getStylesheet().getDefaultVertexStyle();
 * style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
 * (end)
 *
 * For the default vertex style, the image to be displayed can be
 * specified in a cell's style using the <mxConstants.STYLE_IMAGE>
 * key and the image URL as a value, for example:
 *
 * (code)
 * image=http://www.example.com/image.gif
 * (end)
 *
 * For a named style, the the stylename must be the first element
 * of the cell style:
 *
 * (code)
 * stylename;image=http://www.example.com/image.gif
 * (end)
 *
 * A cell style can have any number of key=value pairs added, divided
 * by a semicolon as follows:
 *
 * (code)
 * [stylename;|key=value;]
 * (end)
 *
 * Labels:
 *
 * The cell labels are defined by <getLabel> which uses <convertValueToString>
 * if <labelsVisible> is true. If a label must be rendered as HTML markup, then
 * <isHtmlLabel> should return true for the respective cell. If all labels
 * contain HTML markup, <htmlLabels> can be set to true. NOTE: Enabling HTML
 * labels carries a possible security risk (see the section on security in
 * the manual).
 *
 * If wrapping is needed for a label, then <isHtmlLabel> and <isWrapping> must
 * return true for the cell whose label should be wrapped. See <isWrapping> for
 * an example.
 *
 * If clipping is needed to keep the rendering of a HTML label inside the
 * bounds of its vertex, then <isClipping> should return true for the
 * respective cell.
 *
 * By default, edge labels are movable and vertex labels are fixed. This can be
 * changed by setting <edgeLabelsMovable> and <vertexLabelsMovable>, or by
 * overriding <isLabelMovable>.
 *
 * In-place Editing:
 *
 * In-place editing is started with a doubleclick or by typing F2.
 * Programmatically, <edit> is used to check if the cell is editable
 * (<isCellEditable>) and call <startEditingAtCell>, which invokes
 * <mxCellEditor.startEditing>. The editor uses the value returned
 * by <getEditingValue> as the editing value.
 *
 * After in-place editing, <labelChanged> is called, which invokes
 * <mxGraphModel.setValue>, which in turn calls
 * <mxGraphModel.valueForCellChanged> via <mxValueChange>.
 *
 * The event that triggers in-place editing is passed through to the
 * <cellEditor>, which may take special actions depending on the type of the
 * event or mouse location, and is also passed to <getEditingValue>. The event
 * is then passed back to the event processing functions which can perform
 * specific actions based on the trigger event.
 *
 * Tooltips:
 *
 * Tooltips are implemented by <getTooltip>, which calls <getTooltipForCell>
 * if a cell is under the mousepointer. The default implementation checks if
 * the cell has a getTooltip function and calls it if it exists. Hence, in order
 * to provide custom tooltips, the cell must provide a getTooltip function, or
 * one of the two above functions must be overridden.
 *
 * Typically, for custom cell tooltips, the latter function is overridden as
 * follows:
 *
 * (code)
 * graph.getTooltipForCell = function(cell)
 * {
 *   var label = this.convertValueToString(cell);
 *   return 'Tooltip for '+label;
 * }
 * (end)
 *
 * When using a config file, the function is overridden in the mxGraph section
 * using the following entry:
 *
 * (code)
 * <add as='getTooltipForCell'><![CDATA[
 *   function(cell)
 *   {
 *     var label = this.convertValueToString(cell);
 *     return 'Tooltip for '+label;
 *   }
 * ]]></add>
 * (end)
 *
 * 'this' refers to the graph in the implementation, so for example to check if
 * a cell is an edge, you use this.getModel().isEdge(cell)
 *
 * For replacing the default implementation of <getTooltipForCell> (rather than
 * replacing the function on a specific instance), the following code should be
 * used after loading the JavaScript files, but before creating a new mxGraph
 * instance using <mxGraph>:
 *
 * (code)
 * mxGraph.prototype.getTooltipForCell = function(cell)
 * {
 *   var label = this.convertValueToString(cell);
 *   return 'Tooltip for '+label;
 * }
 * (end)
 *
 * Shapes & Styles:
 *
 * The implementation of new shapes is demonstrated in the examples. We'll assume
 * that we have implemented a custom shape with the name BoxShape which we want
 * to use for drawing vertices. To use this shape, it must first be registered in
 * the cell renderer as follows:
 *
 * (code)
 * mxCellRenderer.registerShape('box', BoxShape);
 * (end)
 *
 * The code registers the BoxShape constructor under the name box in the cell
 * renderer of the graph. The shape can now be referenced using the shape-key in
 * a style definition. (The cell renderer contains a set of additional shapes,
 * namely one for each constant with a SHAPE-prefix in <mxConstants>.)
 *
 * Styles are a collection of key, value pairs and a stylesheet is a collection
 * of named styles. The names are referenced by the cellstyle, which is stored
 * in <mxCell.style> with the following format: [stylename;|key=value;]. The
 * string is resolved to a collection of key, value pairs, where the keys are
 * overridden with the values in the string.
 *
 * When introducing a new shape, the name under which the shape is registered
 * must be used in the stylesheet. There are three ways of doing this:
 *
 *   - By changing the default style, so that all vertices will use the new
 * 		shape
 *   - By defining a new style, so that only vertices with the respective
 * 		cellstyle will use the new shape
 *   - By using shape=box in the cellstyle's optional list of key, value pairs
 * 		to be overridden
 *
 * In the first case, the code to fetch and modify the default style for
 * vertices is as follows:
 *
 * (code)
 * var style = graph.getStylesheet().getDefaultVertexStyle();
 * style[mxConstants.STYLE_SHAPE] = 'box';
 * (end)
 *
 * The code takes the default vertex style, which is used for all vertices that
 * do not have a specific cellstyle, and modifies the value for the shape-key
 * in-place to use the new BoxShape for drawing vertices. This is done by
 * assigning the box value in the second line, which refers to the name of the
 * BoxShape in the cell renderer.
 *
 * In the second case, a collection of key, value pairs is created and then
 * added to the stylesheet under a new name. In order to distinguish the
 * shapename and the stylename we'll use boxstyle for the stylename:
 *
 * (code)
 * var style = new Object();
 * style[mxConstants.STYLE_SHAPE] = 'box';
 * style[mxConstants.STYLE_STROKECOLOR] = '#000000';
 * style[mxConstants.STYLE_FONTCOLOR] = '#000000';
 * graph.getStylesheet().putCellStyle('boxstyle', style);
 * (end)
 *
 * The code adds a new style with the name boxstyle to the stylesheet. To use
 * this style with a cell, it must be referenced from the cellstyle as follows:
 *
 * (code)
 * var vertex = graph.insertVertex(parent, null, 'Hello, World!', 20, 20, 80, 20,
 * 				'boxstyle');
 * (end)
 *
 * To summarize, each new shape must be registered in the <mxCellRenderer> with
 * a unique name. That name is then used as the value of the shape-key in a
 * default or custom style. If there are multiple custom shapes, then there
 * should be a separate style for each shape.
 *
 * Inheriting Styles:
 *
 * For fill-, stroke-, gradient- and indicatorColors special keywords can be
 * used. The inherit keyword for one of these colors will inherit the color
 * for the same key from the parent cell. The swimlane keyword does the same,
 * but inherits from the nearest swimlane in the ancestor hierarchy. Finally,
 * the indicated keyword will use the color of the indicator as the color for
 * the given key.
 *
 * Scrollbars:
 *
 * The <containers> overflow CSS property defines if scrollbars are used to
 * display the graph. For values of 'auto' or 'scroll', the scrollbars will
 * be shown. Note that the <resizeContainer> flag is normally not used
 * together with scrollbars, as it will resize the container to match the
 * size of the graph after each change.
 *
 * Multiplicities and Validation:
 *
 * To control the possible connections in mxGraph, <getEdgeValidationError> is
 * used. The default implementation of the function uses <multiplicities>,
 * which is an array of <mxMultiplicity>. Using this class allows to establish
 * simple multiplicities, which are enforced by the graph.
 *
 * The <mxMultiplicity> uses <mxCell.is> to determine for which terminals it
 * applies. The default implementation of <mxCell.is> works with DOM nodes (XML
 * nodes) and checks if the given type parameter matches the nodeName of the
 * node (case insensitive). Optionally, an attributename and value can be
 * specified which are also checked.
 *
 * <getEdgeValidationError> is called whenever the connectivity of an edge
 * changes. It returns an empty string or an error message if the edge is
 * invalid or null if the edge is valid. If the returned string is not empty
 * then it is displayed as an error message.
 *
 * <mxMultiplicity> allows to specify the multiplicity between a terminal and
 * its possible neighbors. For example, if any rectangle may only be connected
 * to, say, a maximum of two circles you can add the following rule to
 * <multiplicities>:
 *
 * (code)
 * graph.multiplicities.push(new mxMultiplicity(
 *   true, 'rectangle', null, null, 0, 2, ['circle'],
 *   'Only 2 targets allowed',
 *   'Only shape targets allowed'));
 * (end)
 *
 * This will display the first error message whenever a rectangle is connected
 * to more than two circles and the second error message if a rectangle is
 * connected to anything but a circle.
 *
 * For certain multiplicities, such as a minimum of 1 connection, which cannot
 * be enforced at cell creation time (unless the cell is created together with
 * the connection), mxGraph offers <validate> which checks all multiplicities
 * for all cells and displays the respective error messages in an overlay icon
 * on the cells.
 *
 * If a cell is collapsed and contains validation errors, a respective warning
 * icon is attached to the collapsed cell.
 *
 * Auto-Layout:
 *
 * For automatic layout, the <getLayout> hook is provided in <mxLayoutManager>.
 * It can be overridden to return a layout algorithm for the children of a
 * given cell.
 *
 * Unconnected edges:
 *
 * The default values for all switches are designed to meet the requirements of
 * general diagram drawing applications. A very typical set of settings to
 * avoid edges that are not connected is the following:
 *
 * (code)
 * graph.setAllowDanglingEdges(false);
 * graph.setDisconnectOnMove(false);
 * (end)
 *
 * Setting the <cloneInvalidEdges> switch to true is optional. This switch
 * controls if edges are inserted after a copy, paste or clone-drag if they are
 * invalid. For example, edges are invalid if copied or control-dragged without
 * having selected the corresponding terminals and allowDanglingEdges is
 * false, in which case the edges will not be cloned if the switch is false.
 *
 * Output:
 *
 * To produce an XML representation for a diagram, the following code can be
 * used.
 *
 * (code)
 * var enc = new mxCodec(mxUtils.createXmlDocument());
 * var node = enc.encode(graph.getModel());
 * (end)
 *
 * This will produce an XML node than can be handled using the DOM API or
 * turned into a string representation using the following code:
 *
 * (code)
 * var xml = mxUtils.getXml(node);
 * (end)
 *
 * To obtain a formatted string, mxUtils.getPrettyXml can be used instead.
 *
 * This string can now be stored in a local persistent storage (for example
 * using Google Gears) or it can be passed to a backend using mxUtils.post as
 * follows. The url variable is the URL of the Java servlet, PHP page or HTTP
 * handler, depending on the server.
 *
 * (code)
 * var xmlString = encodeURIComponent(mxUtils.getXml(node));
 * mxUtils.post(url, 'xml='+xmlString, function(req)
 * {
 *   // Process server response using req of type mxXmlRequest
 * });
 * (end)
 *
 * Input:
 *
 * To load an XML representation of a diagram into an existing graph object
 * mxUtils.load can be used as follows. The url variable is the URL of the Java
 * servlet, PHP page or HTTP handler that produces the XML string.
 *
 * (code)
 * var xmlDoc = mxUtils.load(url).getXml();
 * var node = xmlDoc.documentElement;
 * var dec = new mxCodec(node.ownerDocument);
 * dec.decode(node, graph.getModel());
 * (end)
 *
 * For creating a page that loads the client and a diagram using a single
 * request please refer to the deployment examples in the backends.
 *
 * Functional dependencies:
 *
 * (see images/callgraph.png)
 *
 * Resources:
 *
 * resources/graph - Language resources for mxGraph
 *
 * Group: Events
 *
 * Event: mxEvent.ROOT
 *
 * Fires if the root in the model has changed. This event has no properties.
 *
 * Event: mxEvent.ALIGN_CELLS
 *
 * Fires between begin- and endUpdate in <alignCells>. The <code>cells</code>
 * and <code>align</code> properties contain the respective arguments that were
 * passed to <alignCells>.
 *
 * Event: mxEvent.FLIP_EDGE
 *
 * Fires between begin- and endUpdate in <flipEdge>. The <code>edge</code>
 * property contains the edge passed to <flipEdge>.
 *
 * Event: mxEvent.ORDER_CELLS
 *
 * Fires between begin- and endUpdate in <orderCells>. The <code>cells</code>
 * and <code>back</code> properties contain the respective arguments that were
 * passed to <orderCells>.
 *
 * Event: mxEvent.CELLS_ORDERED
 *
 * Fires between begin- and endUpdate in <cellsOrdered>. The <code>cells</code>
 * and <code>back</code> arguments contain the respective arguments that were
 * passed to <cellsOrdered>.
 *
 * Event: mxEvent.GROUP_CELLS
 *
 * Fires between begin- and endUpdate in <groupCells>. The <code>group</code>,
 * <code>cells</code> and <code>border</code> arguments contain the respective
 * arguments that were passed to <groupCells>.
 *
 * Event: mxEvent.UNGROUP_CELLS
 *
 * Fires between begin- and endUpdate in <ungroupCells>. The <code>cells</code>
 * property contains the array of cells that was passed to <ungroupCells>.
 *
 * Event: mxEvent.REMOVE_CELLS_FROM_PARENT
 *
 * Fires between begin- and endUpdate in <removeCellsFromParent>. The
 * <code>cells</code> property contains the array of cells that was passed to
 * <removeCellsFromParent>.
 *
 * Event: mxEvent.ADD_CELLS
 *
 * Fires between begin- and endUpdate in <addCells>. The <code>cells</code>,
 * <code>parent</code>, <code>index</code>, <code>source</code> and
 * <code>target</code> properties contain the respective arguments that were
 * passed to <addCells>.
 *
 * Event: mxEvent.CELLS_ADDED
 *
 * Fires between begin- and endUpdate in <cellsAdded>. The <code>cells</code>,
 * <code>parent</code>, <code>index</code>, <code>source</code>,
 * <code>target</code> and <code>absolute</code> properties contain the
 * respective arguments that were passed to <cellsAdded>.
 *
 * Event: mxEvent.REMOVE_CELLS
 *
 * Fires between begin- and endUpdate in <removeCells>. The <code>cells</code>
 * and <code>includeEdges</code> arguments contain the respective arguments
 * that were passed to <removeCells>.
 *
 * Event: mxEvent.CELLS_REMOVED
 *
 * Fires between begin- and endUpdate in <cellsRemoved>. The <code>cells</code>
 * argument contains the array of cells that was removed.
 *
 * Event: mxEvent.SPLIT_EDGE
 *
 * Fires between begin- and endUpdate in <splitEdge>. The <code>edge</code>
 * property contains the edge to be splitted, the <code>cells</code>,
 * <code>newEdge</code>, <code>dx</code> and <code>dy</code> properties contain
 * the respective arguments that were passed to <splitEdge>.
 *
 * Event: mxEvent.TOGGLE_CELLS
 *
 * Fires between begin- and endUpdate in <toggleCells>. The <code>show</code>,
 * <code>cells</code> and <code>includeEdges</code> properties contain the
 * respective arguments that were passed to <toggleCells>.
 *
 * Event: mxEvent.FOLD_CELLS
 *
 * Fires between begin- and endUpdate in <foldCells>. The
 * <code>collapse</code>, <code>cells</code> and <code>recurse</code>
 * properties contain the respective arguments that were passed to <foldCells>.
 *
 * Event: mxEvent.CELLS_FOLDED
 *
 * Fires between begin- and endUpdate in cellsFolded. The
 * <code>collapse</code>, <code>cells</code> and <code>recurse</code>
 * properties contain the respective arguments that were passed to
 * <cellsFolded>.
 *
 * Event: mxEvent.UPDATE_CELL_SIZE
 *
 * Fires between begin- and endUpdate in <updateCellSize>. The
 * <code>cell</code> and <code>ignoreChildren</code> properties contain the
 * respective arguments that were passed to <updateCellSize>.
 *
 * Event: mxEvent.RESIZE_CELLS
 *
 * Fires between begin- and endUpdate in <resizeCells>. The <code>cells</code>
 * and <code>bounds</code> properties contain the respective arguments that
 * were passed to <resizeCells>.
 *
 * Event: mxEvent.CELLS_RESIZED
 *
 * Fires between begin- and endUpdate in <cellsResized>. The <code>cells</code>
 * and <code>bounds</code> properties contain the respective arguments that
 * were passed to <cellsResized>.
 *
 * Event: mxEvent.MOVE_CELLS
 *
 * Fires between begin- and endUpdate in <moveCells>. The <code>cells</code>,
 * <code>dx</code>, <code>dy</code>, <code>clone</code>, <code>target</code>
 * and <code>event</code> properties contain the respective arguments that
 * were passed to <moveCells>.
 *
 * Event: mxEvent.CELLS_MOVED
 *
 * Fires between begin- and endUpdate in <cellsMoved>. The <code>cells</code>,
 * <code>dx</code>, <code>dy</code> and <code>disconnect</code> properties
 * contain the respective arguments that were passed to <cellsMoved>.
 *
 * Event: mxEvent.CONNECT_CELL
 *
 * Fires between begin- and endUpdate in <connectCell>. The <code>edge</code>,
 * <code>terminal</code> and <code>source</code> properties contain the
 * respective arguments that were passed to <connectCell>.
 *
 * Event: mxEvent.CELL_CONNECTED
 *
 * Fires between begin- and endUpdate in <cellConnected>. The
 * <code>edge</code>, <code>terminal</code> and <code>source</code> properties
 * contain the respective arguments that were passed to <cellConnected>.
 *
 * Event: mxEvent.REFRESH
 *
 * Fires after <refresh> was executed. This event has no properties.
 *
 * Event: mxEvent.CLICK
 *
 * Fires in <click> after a click event. The <code>event</code> property
 * contains the original mouse event and <code>cell</code> property contains
 * the cell under the mouse or null if the background was clicked.
 *
 * Event: mxEvent.DOUBLE_CLICK
 *
 * Fires in <dblClick> after a double click. The <code>event</code> property
 * contains the original mouse event and the <code>cell</code> property
 * contains the cell under the mouse or null if the background was clicked.
 *
 * Event: mxEvent.GESTURE
 *
 * Fires in <fireGestureEvent> after a touch gesture. The <code>event</code>
 * property contains the original gesture end event and the <code>cell</code>
 * property contains the optional cell associated with the gesture.
 *
 * Event: mxEvent.TAP_AND_HOLD
 *
 * Fires in <tapAndHold> if a tap and hold event was detected. The <code>event</code>
 * property contains the initial touch event and the <code>cell</code> property
 * contains the cell under the mouse or null if the background was clicked.
 *
 * Event: mxEvent.FIRE_MOUSE_EVENT
 *
 * Fires in <fireMouseEvent> before the mouse listeners are invoked. The
 * <code>eventName</code> property contains the event name and the
 * <code>event</code> property contains the <mxMouseEvent>.
 *
 * Event: mxEvent.SIZE
 *
 * Fires after <sizeDidChange> was executed. The <code>bounds</code> property
 * contains the new graph bounds.
 *
 * Event: mxEvent.START_EDITING
 *
 * Fires before the in-place editor starts in <startEditingAtCell>. The
 * <code>cell</code> property contains the cell that is being edited and the
 * <code>event</code> property contains the optional event argument that was
 * passed to <startEditingAtCell>.
 *
 * Event: mxEvent.EDITING_STARTED
 *
 * Fires after the in-place editor starts in <startEditingAtCell>. The
 * <code>cell</code> property contains the cell that is being edited and the
 * <code>event</code> property contains the optional event argument that was
 * passed to <startEditingAtCell>.
 *
 * Event: mxEvent.EDITING_STOPPED
 *
 * Fires after the in-place editor stops in <stopEditing>.
 *
 * Event: mxEvent.LABEL_CHANGED
 *
 * Fires between begin- and endUpdate in <cellLabelChanged>. The
 * <code>cell</code> property contains the cell, the <code>value</code>
 * property contains the new value for the cell, the <code>old</code> property
 * contains the old value and the optional <code>event</code> property contains
 * the mouse event that started the edit.
 *
 * Event: mxEvent.ADD_OVERLAY
 *
 * Fires after an overlay is added in <addCellOverlay>. The <code>cell</code>
 * property contains the cell and the <code>overlay</code> property contains
 * the <mxCellOverlay> that was added.
 *
 * Event: mxEvent.REMOVE_OVERLAY
 *
 * Fires after an overlay is removed in <removeCellOverlay> and
 * <removeCellOverlays>. The <code>cell</code> property contains the cell and
 * the <code>overlay</code> property contains the <mxCellOverlay> that was
 * removed.
 *
 * Constructor: mxGraph
 *
 * Constructs a new mxGraph in the specified container. Model is an optional
 * mxGraphModel. If no model is provided, a new mxGraphModel instance is
 * used as the model. The container must have a valid owner document prior
 * to calling this function in Internet Explorer. RenderHint is a string to
 * affect the display performance and rendering in IE, but not in SVG-based
 * browsers. The parameter is mapped to <dialect>, which may
 * be one of <mxConstants.DIALECT_SVG> for SVG-based browsers,
 * <mxConstants.DIALECT_STRICTHTML> for fastest display mode,
 * <mxConstants.DIALECT_PREFERHTML> for faster display mode,
 * <mxConstants.DIALECT_MIXEDHTML> for fast and <mxConstants.DIALECT_VML>
 * for exact display mode (slowest). The dialects are defined in mxConstants.
 * The default values are DIALECT_SVG for SVG-based browsers and
 * DIALECT_MIXED for IE.
 *
 * The possible values for the renderingHint parameter are explained below:
 *
 * fast - The parameter is based on the fact that the display performance is
 * highly improved in IE if the VML is not contained within a VML group
 * element. The lack of a group element only slightly affects the display while
 * panning, but improves the performance by almost a factor of 2, while keeping
 * the display sufficiently accurate. This also allows to render certain shapes as HTML
 * if the display accuracy is not affected, which is implemented by
 * <mxShape.isMixedModeHtml>. This is the default setting and is mapped to
 * DIALECT_MIXEDHTML.
 * faster - Same as fast, but more expensive shapes are avoided. This is
 * controlled by <mxShape.preferModeHtml>. The default implementation will
 * avoid gradients and rounded rectangles, but more significant shapes, such
 * as rhombus, ellipse, actor and cylinder will be rendered accurately. This
 * setting is mapped to DIALECT_PREFERHTML.
 * fastest - Almost anything will be rendered in Html. This allows for
 * rectangles, labels and images. This setting is mapped to
 * DIALECT_STRICTHTML.
 * exact - If accurate panning is required and if the diagram is small (up
 * to 100 cells), then this value should be used. In this mode, a group is
 * created that contains the VML. This allows for accurate panning and is
 * mapped to DIALECT_VML.
 *
 * Example:
 *
 * To create a graph inside a DOM node with an id of graph:
 * (code)
 * var container = document.getElementById('graph');
 * var graph = new mxGraph(container);
 * (end)
 *
 * container - Optional DOM node that acts as a container for the graph.
 * If this is null then the container can be initialized later using
 * <init>.
 * model - Optional <mxGraphModel> that constitutes the graph data.
 * renderHint - Optional string that specifies the display accuracy and
 * performance. Default is mxConstants.DIALECT_MIXEDHTML (for IE).
 * stylesheet - Optional <mxStylesheet> to be used in the graph.
 */
import {mxEventSource} from './mx-event-source';
import {mxGraphModel} from './mx-graph-model';
import {mxGraphView} from './mx-graph-view';
import {mxStylesheet} from './mx-stylessheet';
import {mxGraphSelectionModel} from './mx-graph-selection-model';
import {mxCellEditor} from './mx-cell-editor';
import {mxCellRenderer} from './mx-cell-render';
import {mxMultiplicity} from './mx-multiplicity';
import {mxImage} from './mx-image';
import {mxRectangle} from './mx-rectangle';
import {mxTooltipHandler} from './mx-tooltip-handler';
import {mxSelectionCellsHandler} from './mx-selection-cells-handler';
import {mxConnectionHandler} from './mx-connection-handler';
import {mxGraphHandler} from './mx-graph-handler';
import {mxPanningHandler} from './mx-panning-handler';
import {mxPopupMenuHandler} from './mx-popup-menu-handler';
import {renderingHint} from './rendering-hint';
import {mxRootChange} from './mx-root-change';
import {mxChildChange} from './mx-child-change';
import {mxCell} from './mx-cell';
import {mxCellOverlay} from './mx-cell-overlay';
import {mxGeometry} from './mx-geometry';
import {mxConnectionConstraint} from './mx-connection-constraint';
import {mxCellState} from './mx-cell-state';
import {mxPoint} from './mx-point';
import {mxElbowEdgeHandler} from './mx-elbow-edge-handler';
import {mxEdgeSegmentHandler} from './mx-edge-segment-handler';
import {mxVertexHandler} from './mx-vertex-handler';

export interface mxGraph {
  /**
   * Constructs a new mxGraph in the specified container.
   *
   * Model is an optional {@link mxGraphModel}. If no model is provided, a new mxGraphModel instance is used as the model.
   * The container must have a valid owner document prior to calling this function in Internet Explorer.
   * RenderHint - see {@link renderingHint}
   *
   * To create a graph inside a DOM node with an id of graph:
   * @example
   * var container = document.getElementById('graph');
   * var graph = new mxGraph(container);
   *
   * @param container - Optional DOM node that acts as a container for the graph.
   * If this is null then the container can be initialized later using
   * <init>.
   * @param model - Optional <mxGraphModel> that constitutes the graph data.
   * @param renderHint - Optional string that specifies the display accuracy and
   * performance. Default is mxConstants.DIALECT_MIXEDHTML (for IE).
   * @param stylesheet - Optional <mxStylesheet> to be used in the graph.
   */
  (container?: Element, model?: mxGraphModel, renderHint?: renderingHint, stylesheet?: mxStylesheet): void;
  /**
   * Immutable empty array instance.
   */
  readonly EMPTY_ARRAY: any[];
  /**
   * Holds the mouse event listeners. See <fireMouseEvent>.
   */
  mouseListeners: any;
  /**
   * Holds the state of the mouse button.
   */
  isMouseDown: boolean;
  /**
   * Holds the <mxGraphModel> that contains the cells to be displayed.
   */
  model: mxGraphModel;
  /**
   * Holds the <mxGraphView> that caches the <mxCellStates> for the cells.
   */
  view: mxGraphView;
  /**
   * Holds the <mxStylesheet> that defines the appearance of the cells.
   *
   *
   * Example:
   *
   * Use the following code to read a stylesheet into an existing graph.
   *
   * (code)
   * var req = mxUtils.load('stylesheet.xml');
   * var root = req.getDocumentElement();
   * var dec = new mxCodec(root.ownerDocument);
   * dec.decode(root, graph.stylesheet);
   * (end)
   */
  stylesheet: mxStylesheet;
  /**
   * Holds the <mxGraphSelectionModel> that models the current selection.
   */
  selectionModel: mxGraphSelectionModel;
  /**
   * Holds the <mxCellEditor> that is used as the in-place editing.
   */
  cellEditor: mxCellEditor;
  /**
   * Holds the <mxCellRenderer> for rendering the cells in the graph.
   */
  cellRenderer: mxCellRenderer;
  /**
   * An array of <mxMultiplicities> describing the allowed
   * connections in a graph.
   */
  multiplicities: mxMultiplicity[];
  /**
   * RenderHint as it was passed to the constructor.
   */
  renderHint: any;
  /**
   * Dialect to be used for drawing the graph. Possible values are all
   * constants in <mxConstants> with a DIALECT-prefix.
   */
  dialect: any;
  /**
   * Specifies the grid size. Default is 10.
   */
  gridSize: number;
  /**
   * Specifies if the grid is enabled. This is used in <snap>. Default is
   * true.
   */
  gridEnabled: boolean;
  /**
   * Specifies if ports are enabled. This is used in <cellConnected> to update
   * the respective style. Default is true.
   */
  portsEnabled: boolean;
  /**
   * Specifies if native double click events should be detected. Default is true.
   */
  nativeDblClickEnabled: boolean;
  /**
   * Specifies if double taps on touch-based devices should be handled as a
   * double click. Default is true.
   */
  doubleTapEnabled: boolean;
  /**
   * Specifies the timeout for double taps and non-native double clicks. Default
   * is 500 ms.
   */
  doubleTapTimeout: number;
  /**
   * Specifies the tolerance for double taps and double clicks in quirks mode.
   * Default is 25 pixels.
   */
  doubleTapTolerance: number;
  /**
   * Holds the x-coordinate of the last touch event for double tap detection.
   */
  lastTouchX: number;
  /**
   * Holds the y-coordinate of the last touch event for double tap detection.
   */
  lastTouchY: number;
  /**
   * Holds the time of the last touch event for double click detection.
   */
  lastTouchTime: number;
  /**
   * Specifies if tap and hold should be used for starting connections on touch-based
   * devices. Default is true.
   */
  tapAndHoldEnabled: boolean;
  /**
   * Specifies the time for a tap and hold. Default is 500 ms.
   */
  tapAndHoldDelay: number;
  /**
   * True if the timer for tap and hold events is running.
   */
  tapAndHoldInProgress: boolean;
  /**
   * True as long as the timer is running and the touch events
   * stay within the given <tapAndHoldTolerance>.
   */
  tapAndHoldValid: boolean;
  /**
   * Holds the x-coordinate of the intial touch event for tap and hold.
   */
  initialTouchX: number;
  /**
   * Holds the y-coordinate of the intial touch event for tap and hold.
   */
  initialTouchY: number;
  /**
   * Tolerance for a move to be handled as a single click.
   * Default is 4 pixels.
   */
  tolerance: number;
  /**
   * Value returned by <getOverlap> if <isAllowOverlapParent> returns
   * true for the given cell. <getOverlap> is used in <constrainChild> if
   * <isConstrainChild> returns true. The value specifies the
   * portion of the child which is allowed to overlap the parent.
   */
  defaultOverlap: number;
  /**
   * Specifies the default parent to be used to insert new cells.
   * This is used in <getDefaultParent>. Default is null.
   */
  defaultParent: any;
  /**
   * Specifies the alternate edge style to be used if the main control point
   * on an edge is being doubleclicked. Default is null.
   */
  alternateEdgeStyle: any;
  /**
   * Specifies the <mxImage> to be returned by <getBackgroundImage>. Default
   * is null.
   *
   * Example:
   *
   * (code)
   * var img = new mxImage('http://www.example.com/maps/examplemap.jpg', 1024, 768);
   * graph.setBackgroundImage(img);
   * graph.view.validate();
   * (end)
   */
  backgroundImage: mxImage;
  /**
   * Specifies if the background page should be visible. Default is false.
   * Not yet implemented.
   */
  pageVisible: boolean;
  /**
   * Specifies if a dashed line should be drawn between multiple pages. Default
   * is false. If you change this value while a graph is being displayed then you
   * should call <sizeDidChange> to force an update of the display.
   */
  pageBreaksVisible: boolean;
  /**
   * Specifies the color for page breaks. Default is 'gray'.
   */
  pageBreakColor: string;
  /**
   * Specifies the page breaks should be dashed. Default is true.
   */
  pageBreakDashed: boolean;
  /**
   * Specifies the minimum distance for page breaks to be visible. Default is
   * 20 (in pixels).
   */
  minPageBreakDist: number;
  /**
   * Specifies if the graph size should be rounded to the next page number in
   * <sizeDidChange>. This is only used if the graph container has scrollbars.
   * Default is false.
   */
  preferPageSize: boolean;
  /**
   * Specifies the page format for the background page. Default is
   * <mxConstants.PAGE_FORMAT_A4_PORTRAIT>. This is used as the default in
   * <mxPrintPreview> and for painting the background page if <pageVisible> is
   * true and the pagebreaks if <pageBreaksVisible> is true.
   */
  pageFormat: mxRectangle;
  /**
   * Specifies the scale of the background page. Default is 1.5.
   * Not yet implemented.
   */
  pageScale: number;
  /**
   * Specifies the return value for <isEnabled>. Default is true.
   */
  enabled: boolean;
  /**
   * Specifies if <mxKeyHandler> should invoke <escape> when the escape key
   * is pressed. Default is true.
   */
  escapeEnabled: boolean;
  /**
   * If true, when editing is to be stopped by way of selection changing,
   * data in diagram changing or other means stopCellEditing is invoked, and
   * changes are saved. This is implemented in a focus handler in
   * <mxCellEditor>. Default is true.
   */
  invokesStopCellEditing: boolean;
  /**
   * If true, pressing the enter key without pressing control or shift will stop
   * editing and accept the new value. This is used in <mxCellEditor> to stop
   * cell editing. Note: You can always use F2 and escape to stop editing.
   * Default is false.
   */
  enterStopsCellEditing: boolean;
  /**
   * Specifies if scrollbars should be used for panning in <panGraph> if
   * any scrollbars are available. If scrollbars are enabled in CSS, but no
   * scrollbars appear because the graph is smaller than the container size,
   * then no panning occurs if this is true. Default is true.
   */
  useScrollbarsForPanning: boolean;
  /**
   * Specifies the return value for <canExportCell>. Default is true.
   */
  exportEnabled: boolean;
  /**
   * Specifies the return value for <canImportCell>. Default is true.
   */
  importEnabled: boolean;
  /**
   * Specifies the return value for <isCellLocked>. Default is false.
   */
  cellsLocked: boolean;
  /**
   * Specifies the return value for <isCellCloneable>. Default is true.
   */
  cellsCloneable: boolean;
  /**
   * Specifies if folding (collapse and expand via an image icon in the graph
   * should be enabled). Default is true.
   */
  foldingEnabled: boolean;
  /**
   * Specifies the return value for <isCellEditable>. Default is true.
   */
  cellsEditable: boolean;
  /**
   * Specifies the return value for <isCellDeletable>. Default is true.
   */
  cellsDeletable: boolean;
  /**
   * Specifies the return value for <isCellMovable>. Default is true.
   */
  cellsMovable: boolean;
  /**
   * Specifies the return value for edges in <isLabelMovable>. Default is true.
   */
  edgeLabelsMovable: boolean;
  /**
   * Specifies the return value for vertices in <isLabelMovable>. Default is false.
   */
  vertexLabelsMovable: boolean;
  /**
   * Specifies the return value for <isDropEnabled>. Default is false.
   */
  dropEnabled: boolean;
  /**
   * Specifies if dropping onto edges should be enabled. This is ignored if
   * <dropEnabled> is false. If enabled, it will call <splitEdge> to carry
   * out the drop operation. Default is true.
   */
  splitEnabled: boolean;
  /**
   * Specifies the return value for <isCellResizable>. Default is true.
   */
  cellsResizable: boolean;
  /**
   * Specifies the return value for <isCellsBendable>. Default is true.
   */
  cellsBendable: boolean;
  /**
   * Specifies the return value for <isCellSelectable>. Default is true.
   */
  cellsSelectable: boolean;
  /**
   * Specifies the return value for <isCellDisconntable>. Default is true.
   */
  cellsDisconnectable: boolean;
  /**
   * Specifies if the graph should automatically update the cell size after an
   * edit. This is used in <isAutoSizeCell>. Default is false.
   */
  autoSizeCells: boolean;
  /**
   * Specifies if autoSize style should be applied when cells are added. Default is false.
   */
  autoSizeCellsOnAdd: boolean;
  /**
   * Specifies if the graph should automatically scroll if the mouse goes near
   * the container edge while dragging. This is only taken into account if the
   * container has scrollbars. Default is true.
   *
   * If you need this to work without scrollbars then set <ignoreScrollbars> to
   * true. Please consult the <ignoreScrollbars> for details. In general, with
   * no scrollbars, the use of <allowAutoPanning> is recommended.
   */
  autoScroll: boolean;
  /**
   * Specifies if the graph should automatically scroll regardless of the
   * scrollbars. This will scroll the container using positive values for
   * scroll positions (ie usually only rightwards and downwards). To avoid
   * possible conflicts with panning, set <translateToScrollPosition> to true.
   */
  ignoreScrollbars: boolean;
  /**
   * Specifies if the graph should automatically convert the current scroll
   * position to a translate in the graph view when a mouseUp event is received.
   * This can be used to avoid conflicts when using <autoScroll> and
   * <ignoreScrollbars> with no scrollbars in the container.
   */
  translateToScrollPosition: boolean;
  /**
   * Specifies if autoscrolling should be carried out via mxPanningManager even
   * if the container has scrollbars. This disables <scrollPointToVisible> and
   * uses <mxPanningManager> instead. If this is true then <autoExtend> is
   * disabled. It should only be used with a scroll buffer or when scollbars
   * are visible and scrollable in all directions. Default is false.
   */
  timerAutoScroll: boolean;
  /**
   * Specifies if panning via <panGraph> should be allowed to implement autoscroll
   * if no scrollbars are available in <scrollPointToVisible>. To enable panning
   * inside the container, near the edge, set <mxPanningManager.border> to a
   * positive value. Default is false.
   */
  allowAutoPanning: boolean;
  /**
   * Specifies if the size of the graph should be automatically extended if the
   * mouse goes near the container edge while dragging. This is only taken into
   * account if the container has scrollbars. Default is true. See <autoScroll>.
   */
  autoExtend: boolean;
  /**
   * <mxRectangle> that specifies the area in which all cells in the diagram
   * should be placed. Uses in <getMaximumGraphBounds>. Use a width or height of
   * 0 if you only want to give a upper, left corner.
   */
  maximumGraphBounds: any;
  /**
   * <mxRectangle> that specifies the minimum size of the graph. This is ignored
   * if the graph container has no scrollbars. Default is null.
   */
  minimumGraphSize: any;
  /**
   * <mxRectangle> that specifies the minimum size of the <container> if
   * <resizeContainer> is true.
   */
  minimumContainerSize: any;
  /**
   * <mxRectangle> that specifies the maximum size of the container if
   * <resizeContainer> is true.
   */
  maximumContainerSize: any;
  /**
   * Specifies if the container should be resized to the graph size when
   * the graph size has changed. Default is false.
   */
  resizeContainer: boolean;
  /**
   * Border to be added to the bottom and right side when the container is
   * being resized after the graph has been changed. Default is 0.
   */
  border: number;
  /**
   * Specifies if edges should appear in the foreground regardless of their order
   * in the model. If <keepEdgesInForeground> and <keepEdgesInBackground> are
   * both true then the normal order is applied. Default is false.
   */
  keepEdgesInForeground: boolean;
  /**
   * Specifies if edges should appear in the background regardless of their order
   * in the model. If <keepEdgesInForeground> and <keepEdgesInBackground> are
   * both true then the normal order is applied. Default is false.
   */
  keepEdgesInBackground: boolean;
  /**
   * Specifies if negative coordinates for vertices are allowed. Default is true.
   */
  allowNegativeCoordinates: boolean;
  /**
   * Specifies if a child should be constrained inside the parent bounds after a
   * move or resize of the child. Default is true.
   */
  constrainChildren: boolean;
  /**
   * Specifies if child cells with relative geometries should be constrained
   * inside the parent bounds, if <constrainChildren> is true, and/or the
   * <maximumGraphBounds>. Default is false.
   */
  constrainRelativeChildren: boolean;
  /**
   * Specifies if a parent should contain the child bounds after a resize of
   * the child. Default is true. This has precedence over <constrainChildren>.
   */
  extendParents: boolean;
  /**
   * Specifies if parents should be extended according to the <extendParents>
   * switch if cells are added. Default is true.
   */
  extendParentsOnAdd: boolean;
  /**
   * Specifies if parents should be extended according to the <extendParents>
   * switch if cells are added. Default is false for backwards compatiblity.
   */
  extendParentsOnMove: boolean;
  /**
   * Specifies the return value for <isRecursiveResize>. Default is
   * false for backwards compatiblity.
   */
  recursiveResize: boolean;
  /**
   * Specifies if the cell size should be changed to the preferred size when
   * a cell is first collapsed. Default is true.
   */
  collapseToPreferredSize: boolean;
  /**
   * Specifies the factor used for <zoomIn> and <zoomOut>. Default is 1.2
   * (120%).
   */
  zoomFactor: number;
  /**
   * Specifies if the viewport should automatically contain the selection cells
   * after a zoom operation. Default is false.
   */
  keepSelectionVisibleOnZoom: boolean;
  /**
   * Specifies if the zoom operations should go into the center of the actual
   * diagram rather than going from top, left. Default is true.
   */
  centerZoom: boolean;
  /**
   * Specifies if the scale and translate should be reset if the root changes in
   * the model. Default is true.
   */
  resetViewOnRootChange: boolean;
  /**
   * Specifies if edge control points should be reset after the resize of a
   * connected cell. Default is false.
   */
  resetEdgesOnResize: boolean;
  /**
   * Specifies if edge control points should be reset after the move of a
   * connected cell. Default is false.
   */
  resetEdgesOnMove: boolean;
  /**
   * Specifies if edge control points should be reset after the the edge has been
   * reconnected. Default is true.
   */
  resetEdgesOnConnect: boolean;
  /**
   * Specifies if loops (aka self-references) are allowed. Default is false.
   */
  allowLoops: boolean;
  /**
   * <mxEdgeStyle> to be used for loops. This is a fallback for loops if the
   * <mxConstants.STYLE_LOOP> is undefined. Default is <mxEdgeStyle.Loop>.
   */
  defaultLoopStyle: (state: any, source: any, target: any, points: any, result: any) => void;
  /**
   * Specifies if multiple edges in the same direction between the same pair of
   * vertices are allowed. Default is true.
   */
  multigraph: boolean;
  /**
   * Specifies if edges are connectable. Default is false. This overrides the
   * connectable field in edges.
   */
  connectableEdges: boolean;
  /**
   * Specifies if edges with disconnected terminals are allowed in the graph.
   * Default is true.
   */
  allowDanglingEdges: boolean;
  /**
   * Specifies if edges that are cloned should be validated and only inserted
   * if they are valid. Default is true.
   */
  cloneInvalidEdges: boolean;
  /**
   * Specifies if edges should be disconnected from their terminals when they
   * are moved. Default is true.
   */
  disconnectOnMove: boolean;
  /**
   * Specifies if labels should be visible. This is used in <getLabel>. Default
   * is true.
   */
  labelsVisible: boolean;
  /**
   * Specifies the return value for <isHtmlLabel>. Default is false.
   */
  htmlLabels: boolean;
  /**
   * Specifies if swimlanes should be selectable via the content if the
   * mouse is released. Default is true.
   */
  swimlaneSelectionEnabled: boolean;
  /**
   * Specifies if nesting of swimlanes is allowed. Default is true.
   */
  swimlaneNesting: boolean;
  /**
   * The attribute used to find the color for the indicator if the indicator
   * color is set to 'swimlane'. Default is <mxConstants.STYLE_FILLCOLOR>.
   */
  swimlaneIndicatorColorAttribute: string;
  /**
   * Holds the list of image bundles.
   */
  imageBundles: any;
  /**
   * Specifies the minimum scale to be applied in <fit>. Default is 0.1. Set this
   * to null to allow any value.
   */
  minFitScale: number;
  /**
   * Specifies the maximum scale to be applied in <fit>. Default is 8. Set this
   * to null to allow any value.
   */
  maxFitScale: number;
  /**
   * Current horizontal panning value. Default is 0.
   */
  panDx: number;
  /**
   * Current vertical panning value. Default is 0.
   */
  panDy: number;
  /**
   * Specifies the <mxImage> to indicate a collapsed state.
   * Default value is mxClient.imageBasePath + '/collapsed.gif'
   */
  collapsedImage: mxImage;
  /**
   * Specifies the <mxImage> to indicate a expanded state.
   * Default value is mxClient.imageBasePath + '/expanded.gif'
   */
  expandedImage: mxImage;
  /**
   * Specifies the <mxImage> for the image to be used to display a warning
   * overlay. See <setCellWarning>. Default value is mxClient.imageBasePath +
   * '/warning'.  The extension for the image depends on the platform. It is
   * '.png' on the Mac and '.gif' on all other platforms.
   */
  warningImage: mxImage;
  /**
   * Specifies the resource key for the error message to be displayed in
   * non-multigraphs when two vertices are already connected. If the resource
   * for this key does not exist then the value is used as the error message.
   * Default is 'alreadyConnected'.
   */
  alreadyConnectedResource: string;
  /**
   * Specifies the resource key for the warning message to be displayed when
   * a collapsed cell contains validation errors. If the resource for this
   * key does not exist then the value is used as the warning message.
   * Default is 'containsValidationErrors'.
   */
  containsValidationErrorsResource: string;
  /**
   * Specifies the resource key for the tooltip on the collapse/expand icon.
   * If the resource for this key does not exist then the value is used as
   * the tooltip. Default is 'collapse-expand'.
   */
  tooltipHandler: mxTooltipHandler;
  selectionCellsHandler: mxSelectionCellsHandler;
  connectionHandler: mxConnectionHandler;
  graphHandler: mxGraphHandler;
  panningHandler: mxPanningHandler;
  popupMenuHandler: mxPopupMenuHandler;
  graphModelChangeListener: any;
  panningManager: any;
  collapseExpandResource: string;
  container: HTMLScriptElement;
  /**
   * Initializes the <container> and creates the respective datastructures.
   *
   * container - DOM node that will contain the graph display.
   */
  init(container: HTMLScriptElement): void;
  /**
   * Creates the tooltip-, panning-, connection- and graph-handler (in this
   * order). This is called in the constructor before <init> is called.
   */
  createHandlers(): void;
  /**
   * Creates and returns a new <mxTooltipHandler> to be used in this graph.
   */
  createTooltipHandler(): mxTooltipHandler;
  /**
   * Creates and returns a new <mxTooltipHandler> to be used in this graph.
   */
  createSelectionCellsHandler(): mxSelectionCellsHandler;
  /**
   * Creates and returns a new <mxConnectionHandler> to be used in this graph.
   */
  createConnectionHandler(): mxConnectionHandler;
  /**
   * Creates and returns a new <mxGraphHandler> to be used in this graph.
   */
  createGraphHandler(): mxGraphHandler;
  /**
   * Creates and returns a new <mxPanningHandler> to be used in this graph.
   */
  createPanningHandler(): mxPanningHandler;
  /**
   * Creates and returns a new <mxPopupMenuHandler> to be used in this graph.
   */
  createPopupMenuHandler(): mxPopupMenuHandler;
  /**
   * Creates a new <mxGraphSelectionModel> to be used in this graph.
   */
  createSelectionModel(): mxGraphSelectionModel;
  /**
   * Creates a new <mxGraphSelectionModel> to be used in this graph.
   */
  createStylesheet(): mxStylesheet;
  /**
   * Creates a new <mxGraphView> to be used in this graph.
   */
  createGraphView(): mxGraphView;
  /**
   * Creates a new <mxCellRenderer> to be used in this graph.
   */
  createCellRenderer(): mxCellRenderer;
  /**
   * Creates a new <mxCellEditor> to be used in this graph.
   */
  createCellEditor(): mxCellEditor;
  /**
   * Returns the <mxGraphModel> that contains the cells.
   */
  getModel(): mxGraphModel;
  /**
   * Returns the <mxGraphView> that contains the <mxCellStates>.
   */
  getView(): mxGraphView;
  /**
   * Returns the <mxStylesheet> that defines the style.
   */
  getStylesheet(): mxStylesheet;
  /**
   * Sets the <mxStylesheet> that defines the style.
   */
  setStylesheet(stylesheet: mxStylesheet): void;
  /**
   * Returns the <mxGraphSelectionModel> that contains the selection.
   */
  getSelectionModel(): mxGraphSelectionModel;
  /**
   * Sets the <mxGraphSelectionModel> that contains the selection.
   */
  setSelectionModel(selectionModel: mxGraphSelectionModel): void;
  /**
   * Returns the cells to be selected for the given array of changes.
   */
  getSelectionCellsForChanges(changes: (mxRootChange | mxChildChange | {
    cell: mxCell;
  })[]): mxCell[];
  /**
   * Called when the graph model changes. Invokes <processChange> on each
   * item of the given array to update the view accordingly.
   *
   * changes - Array that contains the individual changes.
   */
  graphModelChanged(changes: any): void;
  /**
   * Returns the cells that have been removed from the model.
   */
  getRemovedCellsForChanges(changes: any): mxCell[];
  /**
   * Processes the given change and invalidates the respective cached data
   * in <view>. This fires a <root> event if the root has changed in the
   * model.
   *
   * change - Object that represents the change on the model.
   */
  processChange(change: any): void;
  /**
   * Removes all cached information for the given cell and its descendants.
   * This is called when a cell was removed from the model.
   *
   * Paramters:
   *
   * cell - <mxCell> that was removed from the model.
   */
  removeStateForCell(cell: mxCell): void;
  /**
   * Adds an <mxCellOverlay> for the specified cell. This method fires an
   * <addoverlay> event and returns the new <mxCellOverlay>.
   *
   * cell - <mxCell> to add the overlay for.
   * overlay - <mxCellOverlay> to be added for the cell.
   */
  addCellOverlay(cell: mxCell, overlay: mxCellOverlay): mxCellOverlay;
  /**
   * Returns the array of <mxCellOverlays> for the given cell or null, if
   * no overlays are defined.
   *
   * cell - <mxCell> whose overlays should be returned.
   */
  getCellOverlays(cell: mxCell): mxCellOverlay[];
  /**
   * Removes and returns the given <mxCellOverlay> from the given cell. This
   * method fires a <removeoverlay> event. If no overlay is given, then all
   * overlays are removed using <removeOverlays>.
   *
   * cell - <mxCell> whose overlay should be removed.
   * overlay - Optional <mxCellOverlay> to be removed.
   */
  removeCellOverlay(cell: mxCell, overlay: mxCellOverlay): mxCellOverlay;
  /**
   * Removes all <mxCellOverlays> from the given cell. This method
   * fires a <removeoverlay> event for each <mxCellOverlay> and returns
   * the array of <mxCellOverlays> that was removed from the cell.
   *
   * cell - <mxCell> whose overlays should be removed
   */
  removeCellOverlays(cell: mxCell): mxCellOverlay[];
  /**
   * Removes all <mxCellOverlays> in the graph for the given cell and all its
   * descendants. If no cell is specified then all overlays are removed from
   * the graph. This implementation uses <removeCellOverlays> to remove the
   * overlays from the individual cells.
   *
   * cell - Optional <mxCell> that represents the root of the subtree to
   * remove the overlays from. Default is the root in the model.
   */
  clearCellOverlays(cell: mxCell): void;
  /**
   * Creates an overlay for the given cell using the warning and image or
   * <warningImage> and returns the new <mxCellOverlay>. The warning is
   * displayed as a tooltip in a red font and may contain HTML markup. If
   * the warning is null or a zero length string, then all overlays are
   * removed from the cell.
   *
   * Example:
   *
   * (code)
   * graph.setCellWarning(cell, '<b>Warning:</b>: Hello, World!');
   * (end)
   *
   * cell - <mxCell> whose warning should be set.
   * warning - String that represents the warning to be displayed.
   * img - Optional <mxImage> to be used for the overlay. Default is
   * <warningImage>.
   * isSelect - Optional boolean indicating if a click on the overlay
   * should select the corresponding cell. Default is false.
   */
  setCellWarning(cell: mxCell, warning: string, img?: mxImage, isSelect?: boolean): mxCellOverlay;
  /**
   * Calls <startEditingAtCell> using the given cell or the first selection
   * cell.
   *
   * evt - Optional mouse event that triggered the editing.
   */
  startEditing(evt: any): void;
  /**
   * Fires a <startEditing> event and invokes <mxCellEditor.startEditing>
   * on <editor>. After editing was started, a <editingStarted> event is
   * fired.
   *
   * cell - <mxCell> to start the in-place editor for.
   * evt - Optional mouse event that triggered the editing.
   */
  startEditingAtCell(cell: any, evt: any): void;
  /**
   * Returns the initial value for in-place editing. This implementation
   * returns <convertValueToString> for the given cell. If this function is
   * overridden, then <mxGraphModel.valueForCellChanged> should take care
   * of correctly storing the actual new value inside the user object.
   *
   * cell - <mxCell> for which the initial editing value should be returned.
   * evt - Optional mouse event that triggered the editor.
   */
  getEditingValue(cell: any, evt: any): string;
  /**
   * Stops the current editing  and fires a <editingStopped> event.
   *
   * cancel - Boolean that specifies if the current editing value
   * should be stored.
   */
  stopEditing(cancel: any): void;
  /**
   * Sets the label of the specified cell to the given value using
   * <cellLabelChanged> and fires <mxEvent.LABEL_CHANGED> while the
   * transaction is in progress. Returns the cell whose label was changed.
   *
   * cell - <mxCell> whose label should be changed.
   * value - New label to be assigned.
   * evt - Optional event that triggered the change.
   */
  labelChanged(cell: any, value: any, evt: any): any;
  /**
   * Sets the new label for a cell. If autoSize is true then
   * <cellSizeUpdated> will be called.
   *
   * In the following example, the function is extended to map changes to
   * attributes in an XML node, as shown in <convertValueToString>.
   * Alternatively, the handling of this can be implemented as shown in
   * <mxGraphModel.valueForCellChanged> without the need to clone the
   * user object.
   *
   * (code)
   * var graphCellLabelChanged = graph.cellLabelChanged;
   * graph.cellLabelChanged = function(cell, newValue, autoSize)
   * {
   * 	// Cloned for correct undo/redo
   * 	var elt = cell.value.cloneNode(true);
   *  elt.setAttribute('label', newValue);
   *
   *  newValue = elt;
   *  graphCellLabelChanged.apply(this, arguments);
   * };
   * (end)
   *
   * cell - <mxCell> whose label should be changed.
   * value - New label to be assigned.
   * autoSize - Boolean that specifies if <cellSizeUpdated> should be called.
   */
  cellLabelChanged(cell: any, value: any, autoSize: any): void;
  /**
   * Processes an escape keystroke.
   *
   * evt - Mouseevent that represents the keystroke.
   */
  escape(evt: any): void;
  /**
   * Processes a singleclick on an optional cell and fires a <click> event.
   * The click event is fired initially. If the graph is enabled and the
   * event has not been consumed, then the cell is selected using
   * <selectCellForEvent> or the selection is cleared using
   * <clearSelection>. The events consumed state is set to true if the
   * corresponding <mxMouseEvent> has been consumed.
   *
   * To handle a click event, use the following code.
   *
   * (code)
   * graph.addListener(mxEvent.CLICK, function(sender, evt)
   * {
   *   var e = evt.getProperty('event'); // mouse event
   *   var cell = evt.getProperty('cell'); // cell may be null
   *
   *   if (cell != null)
   *   {
   *     // Do something useful with cell and consume the event
   *     evt.consume();
   *   }
   * });
   * (end)
   *
   * me - <mxMouseEvent> that represents the single click.
   */
  click(me: any): void;
  /**
   * Processes a doubleclick on an optional cell and fires a <dblclick>
   * event. The event is fired initially. If the graph is enabled and the
   * event has not been consumed, then <edit> is called with the given
   * cell. The event is ignored if no cell was specified.
   *
   * Example for overriding this method.
   *
   * (code)
   * graph.dblClick = function(evt, cell)
   * {
   *   var mxe = new mxEventObject(mxEvent.DOUBLE_CLICK, 'event', evt, 'cell', cell);
   *   this.fireEvent(mxe);
   *
   *   if (this.isEnabled() && !mxEvent.isConsumed(evt) && !mxe.isConsumed())
   *   {
   * 	   mxUtils.alert('Hello, World!');
   *     mxe.consume();
   *   }
   * }
   * (end)
   *
   * Example listener for this event.
   *
   * (code)
   * graph.addListener(mxEvent.DOUBLE_CLICK, function(sender, evt)
   * {
   *   var cell = evt.getProperty('cell');
   *   // do something with the cell and consume the
   *   // event to prevent in-place editing from start
   * });
   * (end)
   *
   * evt - Mouseevent that represents the doubleclick.
   * cell - Optional <mxCell> under the mousepointer.
   */
  dblClick(evt: any, cell: any): void;
  /**
   * Handles the <mxMouseEvent> by highlighting the <mxCellState>.
   *
   * me - <mxMouseEvent> that represents the touch event.
   * state - Optional <mxCellState> that is associated with the event.
   */
  tapAndHold(me: any): void;
  /**
   * Scrolls the graph to the given point, extending the graph container if
   * specified.
   */
  scrollPointToVisible(x: any, y: any, extend: any, border: any): void;
  /**
   * Creates and returns an <mxPanningManager>.
   */
  createPanningManager(): any;
  /**
   * Returns the size of the border and padding on all four sides of the
   * container. The left, top, right and bottom borders are stored in the x, y,
   * width and height of the returned <mxRectangle>, respectively.
   */
  getBorderSizes(): mxRectangle;
  /**
   * Returns the preferred size of the background page if <preferPageSize> is true.
   */
  getPreferredPageSize(bounds: any, width: any, height: any): mxRectangle;
  /**
   * Scales the graph such that the complete diagram fits into <container> and
   * returns the current scale in the view. To fit an initial graph prior to
   * rendering, set <mxGraphView.rendering> to false prior to changing the model
   * and execute the following after changing the model.
   *
   * @example
   * graph.fit();
   * graph.view.rendering = true;
   * graph.refresh();
   *
   * @example <caption>To fit and center the graph, the following code can be used.</caption>
   * var margin = 2;
   * var max = 3;
   *
   * var bounds = graph.getGraphBounds();
   * var cw = graph.container.clientWidth - margin;
   * var ch = graph.container.clientHeight - margin;
   * var w = bounds.width / graph.view.scale;
   * var h = bounds.height / graph.view.scale;
   * var s = Math.min(max, Math.min(cw / w, ch / h));
   *
   * graph.view.scaleAndTranslate(s,
   *   (margin + cw - w * s) / (2 * s) - bounds.x / graph.view.scale,
   *   (margin + ch - h * s) / (2 * s) - bounds.y / graph.view.scale);
   *
   * @param border - Optional number that specifies the border. Default is <border>.
   * @param keepOrigin - Optional boolean that specifies if the translate should be
   * changed. Default is false.
   * @param margin - Optional margin in pixels. Default is 0.
   * @param enabled - Optional boolean that specifies if the scale should be set or
   * just returned. Default is true.
   * @param ignoreWidth - Optional boolean that specifies if the width should be
   * ignored. Default is false.
   * @param ignoreHeight - Optional boolean that specifies if the height should be
   * ignored. Default is false.
   * @param maxHeight - Optional maximum height.
   */
  fit(border?: number, keepOrigin?: boolean, margin?: number, enabled?: boolean, ignoreWidth?: boolean, ignoreHeight?: boolean, maxHeight?: number): number;
  /**
   * Called when the size of the graph has changed. This implementation fires
   * a <size> event after updating the clipping region of the SVG element in
   * SVG-bases browsers.
   */
  sizeDidChange(): void;
  /**
   * Resizes the container for the given graph width and height.
   */
  doResizeContainer(width: any, height: any): void;
  /**
   * Invokes from <sizeDidChange> to redraw the page breaks.
   *
   * visible - Boolean that specifies if page breaks should be shown.
   * width - Specifies the width of the container in pixels.
   * height - Specifies the height of the container in pixels.
   */
  updatePageBreaks(visible: any, width: any, height: any): void;
  /**
   * Returns an array of key, value pairs representing the cell style for the
   * given cell. If no string is defined in the model that specifies the
   * style, then the default style for the cell is returned or <EMPTY_ARRAY>,
   * if not style can be found. Note: You should try and get the cell state
   * for the given cell and use the cached style in the state before using
   * this method.
   *
   * cell - <mxCell> whose style should be returned as an array.
   */
  getCellStyle(cell: any): any;
  /**
   * Tries to resolve the value for the image style in the image bundles and
   * turns short data URIs as defined in mxImageBundle to data URIs as
   * defined in RFC 2397 of the IETF.
   */
  postProcessCellStyle(style: any): any;
  /**
   * Sets the style of the specified cells. If no cells are given, then the
   * selection cells are changed.
   *
   * style - String representing the new style of the cells.
   * cells - Optional array of <mxCells> to set the style for. Default is the
   * selection cells.
   */
  setCellStyle(style: any, cells: any): void;
  /**
   * Toggles the boolean value for the given key in the style of the given cell
   * and returns the new value as 0 or 1. If no cell is specified then the
   * selection cell is used.
   *
   * Parameter:
   *
   * key - String representing the key for the boolean value to be toggled.
   * defaultValue - Optional boolean default value if no value is defined.
   * Default is false.
   * cell - Optional <mxCell> whose style should be modified. Default is
   * the selection cell.
   */
  toggleCellStyle(key: any, defaultValue: any, cell: any): any;
  /**
   * Toggles the boolean value for the given key in the style of the given cells
   * and returns the new value as 0 or 1. If no cells are specified, then the
   * selection cells are used. For example, this can be used to toggle
   * <mxConstants.STYLE_ROUNDED> or any other style with a boolean value.
   *
   * Parameter:
   *
   * key - String representing the key for the boolean value to be toggled.
   * defaultValue - Optional boolean default value if no value is defined.
   * Default is false.
   * cells - Optional array of <mxCells> whose styles should be modified.
   * Default is the selection cells.
   */
  toggleCellStyles(key: any, defaultValue: any, cells: any): any;
  /**
   * Sets the key to value in the styles of the given cells. This will modify
   * the existing cell styles in-place and override any existing assignment
   * for the given key. If no cells are specified, then the selection cells
   * are changed. If no value is specified, then the respective key is
   * removed from the styles.
   *
   * key - String representing the key to be assigned.
   * value - String representing the new value for the key.
   * cells - Optional array of <mxCells> to change the style for. Default is
   * the selection cells.
   */
  setCellStyles(key: any, value: any, cells: any): void;
  /**
   * Toggles the given bit for the given key in the styles of the specified
   * cells.
   *
   * key - String representing the key to toggle the flag in.
   * flag - Integer that represents the bit to be toggled.
   * cells - Optional array of <mxCells> to change the style for. Default is
   * the selection cells.
   */
  toggleCellStyleFlags(key: any, flag: any, cells: any): void;
  /**
   * Sets or toggles the given bit for the given key in the styles of the
   * specified cells.
   *
   * key - String representing the key to toggle the flag in.
   * flag - Integer that represents the bit to be toggled.
   * value - Boolean value to be used or null if the value should be toggled.
   * cells - Optional array of <mxCells> to change the style for. Default is
   * the selection cells.
   */
  setCellStyleFlags(key: any, flag: any, value: any, cells: any): void;
  /**
   * Aligns the given cells vertically or horizontally according to the given
   * alignment using the optional parameter as the coordinate.
   *
   * align - Specifies the alignment. Possible values are all constants in
   * mxConstants with an ALIGN prefix.
   * cells - Array of <mxCells> to be aligned.
   * param - Optional coordinate for the alignment.
   */
  alignCells(align: any, cells: any, param: any): any;
  /**
   * Toggles the style of the given edge between null (or empty) and
   * <alternateEdgeStyle>. This method fires <mxEvent.FLIP_EDGE> while the
   * transaction is in progress. Returns the edge that was flipped.
   *
   * Here is an example that overrides this implementation to invert the
   * value of <mxConstants.STYLE_ELBOW> without removing any existing styles.
   *
   * (code)
   * graph.flipEdge = function(edge)
   * {
   *   if (edge != null)
   *   {
   *     var state = this.view.getState(edge);
   *     var style = (state != null) ? state.style : this.getCellStyle(edge);
   *
   *     if (style != null)
   *     {
   *       var elbow = mxUtils.getValue(style, mxConstants.STYLE_ELBOW,
   *           mxConstants.ELBOW_HORIZONTAL);
   *       var value = (elbow == mxConstants.ELBOW_HORIZONTAL) ?
   *           mxConstants.ELBOW_VERTICAL : mxConstants.ELBOW_HORIZONTAL;
   *       this.setCellStyles(mxConstants.STYLE_ELBOW, value, [edge]);
   *     }
   *   }
   * };
   * (end)
   *
   * edge - <mxCell> whose style should be changed.
   */
  flipEdge(edge: any): any;
  /**
   * Adds the specified <mxImageBundle>.
   */
  addImageBundle(bundle: any): void;
  /**
   * Removes the specified <mxImageBundle>.
   */
  removeImageBundle(bundle: any): void;
  /**
   * Searches all <imageBundles> for the specified key and returns the value
   * for the first match or null if the key is not found.
   */
  getImageFromBundles(key: any): any;
  /**
   * Moves the given cells to the front or back. The change is carried out
   * using <cellsOrdered>. This method fires <mxEvent.ORDER_CELLS> while the
   * transaction is in progress.
   *
   * back - Boolean that specifies if the cells should be moved to back.
   * cells - Array of <mxCells> to move to the background. If null is
   * specified then the selection cells are used.
   */
  orderCells(back: any, cells: any): any;
  /**
   * Moves the given cells to the front or back. This method fires
   * <mxEvent.CELLS_ORDERED> while the transaction is in progress.
   *
   * cells - Array of <mxCells> whose order should be changed.
   * back - Boolean that specifies if the cells should be moved to back.
   */
  cellsOrdered(cells: any, back: any): void;
  /**
   * Adds the cells into the given group. The change is carried out using
   * <cellsAdded>, <cellsMoved> and <cellsResized>. This method fires
   * <mxEvent.GROUP_CELLS> while the transaction is in progress. Returns the
   * new group. A group is only created if there is at least one entry in the
   * given array of cells.
   *
   * group - <mxCell> that represents the target group. If null is specified
   * then a new group is created using <createGroupCell>.
   * border - Optional integer that specifies the border between the child
   * area and the group bounds. Default is 0.
   * cells - Optional array of <mxCells> to be grouped. If null is specified
   * then the selection cells are used.
   */
  groupCells(group: any, border: any, cells: any): any;
  /**
   * Returns the cells with the same parent as the first cell
   * in the given array.
   */
  getCellsForGroup(cells: any): any[];
  /**
   * Returns the bounds to be used for the given group and children.
   */
  getBoundsForGroup(group: any, children: any, border: any): mxRectangle;
  /**
   * Hook for creating the group cell to hold the given array of <mxCells> if
   * no group cell was given to the <group> function.
   *
   * The following code can be used to set the style of new group cells.
   *
   * (code)
   * var graphCreateGroupCell = graph.createGroupCell;
   * graph.createGroupCell = function(cells)
   * {
   *   var group = graphCreateGroupCell.apply(this, arguments);
   *   group.setStyle('group');
   *
   *   return group;
   * };
   */
  createGroupCell(cells: any): mxCell;
  /**
   * Ungroups the given cells by moving the children the children to their
   * parents parent and removing the empty groups. Returns the children that
   * have been removed from the groups.
   *
   * cells - Array of cells to be ungrouped. If null is specified then the
   * selection cells are used.
   */
  ungroupCells(cells: any): any[];
  /**
   * Hook to remove the groups after <ungroupCells>.
   *
   * cells - Array of <mxCells> that were ungrouped.
   */
  removeCellsAfterUngroup(cells: any): void;
  /**
   * Removes the specified cells from their parents and adds them to the
   * default parent. Returns the cells that were removed from their parents.
   *
   * cells - Array of <mxCells> to be removed from their parents.
   */
  removeCellsFromParent(cells: any): any;
  /**
   * Updates the bounds of the given groups to include all children and returns
   * the passed-in cells. Call this with the groups in parent to child order,
   * top-most group first, the cells are processed in reverse order and cells
   * with no children are ignored.
   *
   * cells - The groups whose bounds should be updated. If this is null, then
   * the selection cells are used.
   * border - Optional border to be added in the group. Default is 0.
   * moveGroup - Optional boolean that allows the group to be moved. Default
   * is false.
   * topBorder - Optional top border to be added in the group. Default is 0.
   * rightBorder - Optional top border to be added in the group. Default is 0.
   * bottomBorder - Optional top border to be added in the group. Default is 0.
   * leftBorder - Optional top border to be added in the group. Default is 0.
   */
  updateGroupBounds(cells: any, border: any, moveGroup: any, topBorder: any, rightBorder: any, bottomBorder: any, leftBorder: any): any;
  /**
   * Returns the bounding box for the given array of <mxCells>. The bounding box for
   * each cell and its descendants is computed using <mxGraphView.getBoundingBox>.
   *
   * cells - Array of <mxCells> whose bounding box should be returned.
   */
  getBoundingBox(cells: any): any;
  /**
   * Returns the clones for the given cells. The clones are created recursively
   * using <mxGraphModel.cloneCells>. If the terminal of an edge is not in the
   * given array, then the respective end is assigned a terminal point and the
   * terminal is removed.
   *
   * @param cells - Array of <mxCells> to be cloned.
   * @param allowInvalidEdges - Optional boolean that specifies if invalid edges
   * should be cloned. Default is true.
   * @param mapping - Optional mapping for existing clones.
   */
  cloneCells(cells: mxCell[], allowInvalidEdges?: boolean, mapping?: any): any;
  /**
   * Adds a new vertex into the given parent {@link mxCell} using value as the user
   * object and the given coordinates as the {@link mxGeometry} of the new vertex.
   * The id and style are used for the respective properties of the new
   * {@link mxCell}, which is returned.
   *
   * When adding new vertices from a mouse event, one should take into
   * account the offset of the graph container and the scale and translation
   * of the view in order to find the correct unscaled, untranslated
   * coordinates using {@link mxGraph.getPointForEvent} as follows:
   *
   * (code)
   * var pt = graph.getPointForEvent(evt);
   * var parent = graph.getDefaultParent();
   * graph.insertVertex(parent, null, 'Hello, World!', x, y, 220, 30);
   * (end)
   *
   * For adding image cells, the style parameter can be assigned as
   *
   * (code)
   * stylename;image=imageUrl
   * (end)
   *
   * See {@link mxGraph} for more information on using images.
   *
   * @param parent Specifies the parent of the new vertex.
   * @param id Optional string that defines the Id of the new vertex.
   * @param value User defined data object.
   * @param x Integer that defines the x coordinate of the vertex.
   * @param y Integer that defines the y coordinate of the vertex.
   * @param width Integer that defines the width of the vertex.
   * @param height Integer that defines the height of the vertex.
   * @param [style] Optional string that defines the cell style.
   * @param [relative] Optional boolean that specifies if the geometry is relative. Default is false.
   */
  insertVertex(parent: mxCell, id: string | null, value: object, x: number, y: number, width: number, height: number, style?: string, relative?: boolean): mxCell;
  /**
   * Adds a new edge into the given parent {@link mxCell} using value as the user
   * object and the given source and target as the terminals of the new edge.
   * The id and style are used for the respective properties of the new
   * {@link mxCell}, which is returned.
   *
   * @param parent specifies the parent of the new edge.
   * @param id Optional string that defines the Id of the new edge.
   * @param value User defined data object.
   * @param source Source of the edge.
   * @param target Target of the edge.
   * @param [style] Optional string that defines the cell style.
   */
  insertEdge(parent: mxCell, id: string | null, value: object, source: mxCell, target: mxCell, style?: string): mxCell;
  /**
   * Adds the edge to the parent and connects it to the given source and
   * target terminals. This is a shortcut method. Returns the edge that was
   * added.
   *
   * @param edge - <mxCell> to be inserted into the given parent.
   * @param parent - <mxCell> that represents the new parent. If no parent is
   * given then the default parent is used.
   * @param source - Optional <mxCell> that represents the source terminal.
   * @param target - Optional <mxCell> that represents the target terminal.
   * @param index - Optional index to insert the cells at. Default is to append.
   */
  addEdge(edge: mxCell, parent: mxCell, source?: mxCell, target?: mxCell, index?: number): mxCell;
  /**
   * Adds the cell to the parent and connects it to the given source and
   * target terminals. This is a shortcut method. Returns the cell that was
   * added.
   *
   * @param cell - <mxCell> to be inserted into the given parent.
   * @param parent - <mxCell> that represents the new parent. If no parent is
   * given then the default parent is used.
   * @param index - Optional index to insert the cells at. Default is to append.
   * @param source - Optional <mxCell> that represents the source terminal.
   * @param target - Optional <mxCell> that represents the target terminal.
   */
  addCell(cell: mxCell, parent?: mxCell, index?: number, source?: mxCell, target?: mxCell): mxCell;
  /**
   * Adds the cells to the parent at the given index, connecting each cell to
   * the optional source and target terminal. The change is carried out using
   * <cellsAdded>. This method fires <mxEvent.ADD_CELLS> while the
   * transaction is in progress. Returns the cells that were added.
   *
   * @param cells - Array of <mxCells> to be inserted.
   * @param parent - <mxCell> that represents the new parent. If no parent is
   * given then the default parent is used.
   * @param index - Optional index to insert the cells at. Default is to append.
   * @param source - Optional source <mxCell> for all inserted cells.
   * @param target - Optional target <mxCell> for all inserted cells.
   */
  addCells(cells: mxCell[], parent: mxCell, index?: number, source?: mxCell, target?: mxCell): mxCell[];
  /**
   * Resizes the specified cell to just fit around the its label and/or children
   *
   * @param cell - <mxCells> to be resized.
   * @param recurse - Optional boolean which specifies if all descendants should be
   * autosized. Default is true.
   */
  autoSizeCell(cell: mxCell, recurse?: boolean): void;
  /**
   * Removes the given cells from the graph including all connected edges if
   * includeEdges is true. The change is carried out using <cellsRemoved>.
   * This method fires <mxEvent.REMOVE_CELLS> while the transaction is in
   * progress. The removed cells are returned as an array.
   *
   * cells - Array of <mxCells> to remove. If null is specified then the
   * selection cells which are deletable are used.
   * includeEdges - Optional boolean which specifies if all connected edges
   * should be removed as well. Default is true.
   */
  removeCells(cells?: any, includeEdges?: any): any;
  /**
   * Removes the given cells from the model. This method fires
   * <mxEvent.CELLS_REMOVED> while the transaction is in progress.
   *
   * cells - Array of <mxCells> to remove.
   */
  cellsRemoved(cells: any): void;
  /**
   * Splits the given edge by adding the newEdge between the previous source
   * and the given cell and reconnecting the source of the given edge to the
   * given cell. This method fires <mxEvent.SPLIT_EDGE> while the transaction
   * is in progress. Returns the new edge that was inserted.
   *
   * edge - <mxCell> that represents the edge to be splitted.
   * cells - <mxCells> that represents the cells to insert into the edge.
   * newEdge - <mxCell> that represents the edge to be inserted.
   * dx - Optional integer that specifies the vector to move the cells.
   * dy - Optional integer that specifies the vector to move the cells.
   */
  splitEdge(edge: any, cells: any, newEdge: any, dx: any, dy: any): any;
  /**
   * Sets the visible state of the specified cells and all connected edges
   * if includeEdges is true. The change is carried out using <cellsToggled>.
   * This method fires <mxEvent.TOGGLE_CELLS> while the transaction is in
   * progress. Returns the cells whose visible state was changed.
   *
   * show - Boolean that specifies the visible state to be assigned.
   * cells - Array of <mxCells> whose visible state should be changed. If
   * null is specified then the selection cells are used.
   * includeEdges - Optional boolean indicating if the visible state of all
   * connected edges should be changed as well. Default is true.
   */
  toggleCells(show: any, cells: any, includeEdges: any): any;
  /**
   * Sets the visible state of the specified cells.
   *
   * cells - Array of <mxCells> whose visible state should be changed.
   * show - Boolean that specifies the visible state to be assigned.
   */
  cellsToggled(cells: any, show: any): void;
  /**
   * Sets the collapsed state of the specified cells and all descendants
   * if recurse is true. The change is carried out using <cellsFolded>.
   * This method fires <mxEvent.FOLD_CELLS> while the transaction is in
   * progress. Returns the cells whose collapsed state was changed.
   *
   * @param collapse - Boolean indicating the collapsed state to be assigned.
   * @param recurse - Optional boolean indicating if the collapsed state of all
   * descendants should be set. Default is false.
   * @param cells - Array of <mxCells> whose collapsed state should be set. If
   * null is specified then the foldable selection cells are used.
   * @param checkFoldable - Optional boolean indicating of isCellFoldable should be
   * checked. Default is false.
   * @param evt - Optional native event that triggered the invocation.
   */
  foldCells(collapse: boolean, recurse?: boolean, cells?: mxCell[], checkFoldable?: boolean, evt?: Event): mxCell[];
  /**
   * Sets the collapsed state of the specified cells. This method fires
   * <mxEvent.CELLS_FOLDED> while the transaction is in progress. Returns the
   * cells whose collapsed state was changed.
   *
   * @param cells - Array of <mxCells> whose collapsed state should be set.
   * @param collapse - Boolean indicating the collapsed state to be assigned.
   * @param recurse - Boolean indicating if the collapsed state of all descendants
   * should be set.
   * @param checkFoldable - Optional boolean indicating of isCellFoldable should be
   * checked. Default is false.
   */
  cellsFolded(cells: mxCell[], collapse: boolean, recurse: boolean, checkFoldable?: boolean): void;
  /**
   * Swaps the alternate and the actual bounds in the geometry of the given
   * cell invoking <updateAlternateBounds> before carrying out the swap.
   *
   * cell - <mxCell> for which the bounds should be swapped.
   * willCollapse - Boolean indicating if the cell is going to be collapsed.
   */
  swapBounds(cell: any, willCollapse: any): void;
  /**
   * Updates or sets the alternate bounds in the given geometry for the given
   * cell depending on whether the cell is going to be collapsed. If no
   * alternate bounds are defined in the geometry and
   * <collapseToPreferredSize> is true, then the preferred size is used for
   * the alternate bounds. The top, left corner is always kept at the same
   * location.
   *
   * cell - <mxCell> for which the geometry is being udpated.
   * g - <mxGeometry> for which the alternate bounds should be updated.
   * willCollapse - Boolean indicating if the cell is going to be collapsed.
   */
  updateAlternateBounds(cell: any, geo: any, willCollapse: any): void;
  /**
   * Returns an array with the given cells and all edges that are connected
   * to a cell or one of its descendants.
   */
  addAllEdges(cells: any): any;
  /**
   * Returns all edges connected to the given cells or its descendants.
   */
  getAllEdges(cells: any): any[];
  /**
   * Updates the size of the given cell in the model using <cellSizeUpdated>.
   * This method fires <mxEvent.UPDATE_CELL_SIZE> while the transaction is in
   * progress. Returns the cell whose size was updated.
   *
   * @param cell - <mxCell> whose size should be updated.
   * @param ignoreChildren - boolean - Optional.
   */
  updateCellSize(cell: mxCell, ignoreChildren?: boolean): mxCell;
  /**
   * Updates the size of the given cell in the model using
   * <getPreferredSizeForCell> to get the new size.
   *
   * cell - <mxCell> for which the size should be changed.
   */
  cellSizeUpdated(cell: any, ignoreChildren: any): void;
  /**
   * Returns the preferred width and height of the given <mxCell> as an
   * <mxRectangle>. To implement a minimum width, add a new style eg.
   * minWidth in the vertex and override this method as follows.
   *
   * (code)
   * var graphGetPreferredSizeForCell = graph.getPreferredSizeForCell;
   * graph.getPreferredSizeForCell = function(cell)
   * {
   *   var result = graphGetPreferredSizeForCell.apply(this, arguments);
   *   var style = this.getCellStyle(cell);
   *
   *   if (style['minWidth'] > 0)
   *   {
   *     result.width = Math.max(style['minWidth'], result.width);
   *   }
   *
   *   return result;
   * };
   * (end)
   *
   * cell - <mxCell> for which the preferred size should be returned.
   */
  getPreferredSizeForCell(cell: any): any;
  /**
   * Sets the bounds of the given cell using <resizeCells>. Returns the
   * cell which was passed to the function.
   *
   * @param cell - <mxCell> whose bounds should be changed.
   * @param bounds - <mxRectangle> that represents the new bounds.
   * @param recurse - Recursively resize children
   */
  resizeCell(cell: mxCell, bounds: mxRectangle, recurse?: any): mxCell;
  /**
   * Sets the bounds of the given cells and fires a <mxEvent.RESIZE_CELLS>
   * event while the transaction is in progress. Returns the cells which
   * have been passed to the function.
   *
   * @param cells - Array of <mxCells> whose bounds should be changed.
   * @param bounds - Array of <mxRectangles> that represent the new bounds.
   * @param recurse - Recursively resize children
   */
  resizeCells(cells: mxCell[], bounds: mxRectangle[], recurse?: any): mxCell[];
  /**
   * Sets the bounds of the given cells and fires a <mxEvent.CELLS_RESIZED>
   * event. If <extendParents> is true, then the parent is extended if a
   * child size is changed so that it overlaps with the parent.
   *
   * The following example shows how to control group resizes to make sure
   * that all child cells stay within the group.
   *
   * @example
   * graph.addListener(mxEvent.CELLS_RESIZED, function(sender, evt)
   * {
   *   var cells = evt.getProperty('cells');
   *
   *   if (cells != null)
   *   {
   *     for (var i = 0; i < cells.length; i++)
   *     {
   *       if (graph.getModel().getChildCount(cells[i]) > 0)
   *       {
   *         var geo = graph.getCellGeometry(cells[i]);
   *
   *         if (geo != null)
   *         {
   *           var children = graph.getChildCells(cells[i], true, true);
   *           var bounds = graph.getBoundingBoxFromGeometry(children, true);
   *
   *           geo = geo.clone();
   *           geo.width = Math.max(geo.width, bounds.width);
   *           geo.height = Math.max(geo.height, bounds.height);
   *
   *           graph.getModel().setGeometry(cells[i], geo);
   *         }
   *       }
   *     }
   *   }
   * });
   *
   * @param cells - Array of <mxCells> whose bounds should be changed.
   * @param bounds - Array of <mxRectangles> that represent the new bounds.
   * @param recurse - Optional boolean that specifies if the children should be resized.
   */
  cellsResized(cells: mxCell[], bounds: mxRectangle[], recurse?: boolean): void;
  /**
   * Resizes the parents recursively so that they contain the complete area
   * of the resized child cell.
   *
   * @param cell - <mxCell> whose bounds should be changed.
   * @param bounds - <mxRectangles> that represent the new bounds.
   * @param ignoreRelative - Boolean that indicates if relative cells should be ignored.
   * @param recurse - Optional boolean that specifies if the children should be resized.
   */
  cellResized(cell: mxCell, bounds: mxRectangle, ignoreRelative: boolean, recurse: boolean): void;
  /**
   * Resizes the child cells of the given cell for the given new geometry with
   * respect to the current geometry of the cell.
   *
   * @param cell - <mxCell> that has been resized.
   * @param newGeo - <mxGeometry> that represents the new bounds.
   */
  resizeChildCells(cell: mxCell, newGeo: mxGeometry): void;
  /**
   * Constrains the children of the given cell using <constrainChild>.
   *
   * cell - <mxCell> that has been resized.
   */
  constrainChildCells(cell: any): void;
  /**
   * Scales the points, position and size of the given cell according to the
   * given vertical and horizontal scaling factors.
   *
   * @param cell - <mxCell> whose geometry should be scaled.
   * @param dx - Horizontal scaling factor.
   * @param dy - Vertical scaling factor.
   * @param recurse - Boolean indicating if the child cells should be scaled.
   */
  scaleCell(cell: mxCell, dx: number, dy: number, recurse: boolean): void;
  /**
   * Resizes the parents recursively so that they contain the complete area
   * of the resized child cell.
   *
   * @param cell - <mxCell> that has been resized.
   */
  extendParent(cell: mxCell): void;
  /**
   * Clones and inserts the given cells into the graph using the move
   * method and returns the inserted cells. This shortcut is used if
   * cells are inserted via datatransfer.
   *
   * @param cells - Array of <mxCells> to be imported.
   * @param dx - Integer that specifies the x-coordinate of the vector. Default is 0.
   * @param dy - Integer that specifies the y-coordinate of the vector. Default is 0.
   * @param target - <mxCell> that represents the new parent of the cells.
   * @param evt - Mouseevent that triggered the invocation.
   * @param mapping - Optional mapping for existing clones.
   */
  importCells(cells: mxCell[], dx: number, dy: number, target: mxCell, evt: Event, mapping: any): mxCell[];
  /**
   * Moves or clones the specified cells and moves the cells or clones by the
   * given amount, adding them to the optional target cell. The evt is the
   * mouse event as the mouse was released. The change is carried out using
   * <cellsMoved>. This method fires <mxEvent.MOVE_CELLS> while the
   * transaction is in progress. Returns the cells that were moved.
   *
   * Use the following code to move all cells in the graph.
   *
   * @example graph.moveCells(graph.getChildCells(null, true, true), 10, 10);
   *
   * @param cells - Array of <mxCells> to be moved, cloned or added to the target.
   * @param dx - Integer that specifies the x-coordinate of the vector. Default is 0.
   * @param dy - Integer that specifies the y-coordinate of the vector. Default is 0.
   * @param clone - Boolean indicating if the cells should be cloned. Default is false.
   * @param target - <mxCell> that represents the new parent of the cells.
   * @param evt - Mouseevent that triggered the invocation.
   * @param mapping - Optional mapping for existing clones.
   */
  moveCells(cells: mxCell[], dx?: number, dy?: number, clone?: boolean, target?: mxCell, evt?: Event, mapping?: any): mxCell[];
  /**
   * Moves the specified cells by the given vector, disconnecting the cells
   * using disconnectGraph is disconnect is true. This method fires
   * <mxEvent.CELLS_MOVED> while the transaction is in progress.
   */
  cellsMoved(cells: mxCell[], dx: number, dy: number, disconnect?: boolean, constrain?: boolean, extend?: boolean): void;
  /**
   * Translates the geometry of the given cell and stores the new,
   * translated geometry in the model as an atomic change.
   */
  translateCell(cell: any, dx: any, dy: any): void;
  /**
   * Returns the <mxRectangle> inside which a cell is to be kept.
   *
   * cell - <mxCell> for which the area should be returned.
   */
  getCellContainmentArea(cell: any): mxRectangle;
  /**
   * Returns the bounds inside which the diagram should be kept as an
   * <mxRectangle>.
   */
  getMaximumGraphBounds(): any;
  /**
   * Keeps the given cell inside the bounds returned by
   * <getCellContainmentArea> for its parent, according to the rules defined by
   * <getOverlap> and <isConstrainChild>. This modifies the cell's geometry
   * in-place and does not clone it.
   *
   * cells - <mxCell> which should be constrained.
   * sizeFirst - Specifies if the size should be changed first. Default is true.
   */
  constrainChild(cell: mxCell, sizeFirst?: boolean): void;
  /**
   * Resets the control points of the edges that are connected to the given
   * cells if not both ends of the edge are in the given cells array.
   *
   * cells - Array of <mxCells> for which the connected edges should be
   * reset.
   */
  resetEdges(cells: mxCell[]): void;
  /**
   * Resets the control points of the given edge.
   *
   * edge - <mxCell> whose points should be reset.
   */
  resetEdge(edge: any): any;
  /**
   * Returns the constraint used to connect to the outline of the given state.
   */
  getOutlineConstraint(point: any, terminalState: any, me: any): mxConnectionConstraint;
  /**
   * Returns an array of all <mxConnectionConstraints> for the given terminal. If
   * the shape of the given terminal is a <mxStencilShape> then the constraints
   * of the corresponding <mxStencil> are returned.
   *
   * terminal - <mxCellState> that represents the terminal.
   * source - Boolean that specifies if the terminal is the source or target.
   */
  getAllConnectionConstraints(terminal: any, source: any): any;
  /**
   * Returns an <mxConnectionConstraint> that describes the given connection
   * point. This result can then be passed to <getConnectionPoint>.
   *
   * @param edge - <mxCellState> that represents the edge.
   * @param terminal - <mxCellState> that represents the terminal.
   * @param source - Boolean indicating if the terminal is the source or target.
   */
  getConnectionConstraint(edge: mxCellState, terminal: mxCellState, source: boolean): mxConnectionConstraint;
  /**
   * Sets the <mxConnectionConstraint> that describes the given connection point.
   * If no constraint is given then nothing is changed. To remove an existing
   * constraint from the given edge, use an empty constraint instead.
   *
   * @param edge - <mxCell> that represents the edge.
   * @param terminal - <mxCell> that represents the terminal.
   * @param source - Boolean indicating if the terminal is the source or target.
   * @param constraint - Optional <mxConnectionConstraint> to be used for this
   * connection.
   */
  setConnectionConstraint(edge: mxCell, terminal: mxCell, source: boolean, constraint?: mxConnectionConstraint): void;
  /**
   * Returns the nearest point in the list of absolute points or the center
   * of the opposite terminal.
   *
   * @param vertex - <mxCellState> that represents the vertex.
   * @param constraint - <mxConnectionConstraint> that represents the connection point
   * constraint as returned by <getConnectionConstraint>.
   */
  getConnectionPoint(vertex: mxCellState, constraint: mxConnectionConstraint): mxPoint;
  /**
   * Connects the specified end of the given edge to the given terminal
   * using <cellConnected> and fires <mxEvent.CONNECT_CELL> while the
   * transaction is in progress. Returns the updated edge.
   *
   * @param edge - <mxCell> whose terminal should be updated.
   * @param terminal - <mxCell> that represents the new terminal to be used.
   * @param source - Boolean indicating if the new terminal is the source or target.
   * @param constraint - Optional <mxConnectionConstraint> to be used for this
   * connection.
   */
  connectCell(edge: mxCell, terminal: mxCell, source: boolean, constraint?: mxConnectionConstraint): mxCell;
  /**
   * Sets the new terminal for the given edge and resets the edge points if
   * <resetEdgesOnConnect> is true. This method fires
   * <mxEvent.CELL_CONNECTED> while the transaction is in progress.
   *
   * @param edge - <mxCell> whose terminal should be updated.
   * @param terminal - <mxCell> that represents the new terminal to be used.
   * @param source - Boolean indicating if the new terminal is the source or target.
   * @param constraint - <mxConnectionConstraint> to be used for this connection.
   */
  cellConnected(edge: mxCell, terminal: mxCell, source: boolean, constraint?: mxConnectionConstraint): void;
  /**
   * Disconnects the given edges from the terminals which are not in the
   * given array.
   *
   * @param cells - Array of <mxCells> to be disconnected.
   */
  disconnectGraph(cells: mxCell[]): void;
  /**
   * Returns the current root of the displayed cell hierarchy. This is a
   * shortcut to <mxGraphView.currentRoot> in <view>.
   */
  getCurrentRoot(): mxCell;
  /**
   * Returns the translation to be used if the given cell is the root cell as
   * an <mxPoint>. This implementation returns null.
   *
   * Example:
   *
   * To keep the children at their absolute position while stepping into groups,
   * this function can be overridden as follows.
   *
   * (code)
   * var offset = new mxPoint(0, 0);
   *
   * while (cell != null)
   * {
   *   var geo = this.model.getGeometry(cell);
   *
   *   if (geo != null)
   *   {
   *     offset.x -= geo.x;
   *     offset.y -= geo.y;
   *   }
   *
   *   cell = this.model.getParent(cell);
   * }
   *
   * return offset;
   * (end)
   *
   * @param cell - <mxCell> that represents the root.
   */
  getTranslateForRoot(cell: mxCell): any;
  /**
   * Returns true if the given cell is a 'port', that is, when connecting to
   * it, the cell returned by getTerminalForPort should be used as the
   * terminal and the port should be referenced by the ID in either the
   * mxConstants.STYLE_SOURCE_PORT or the or the
   * mxConstants.STYLE_TARGET_PORT. Note that a port should not be movable.
   * This implementation always returns false.
   *
   * A typical implementation is the following:
   *
   * (code)
   * graph.isPort = function(cell)
   * {
   *   var geo = this.getCellGeometry(cell);
   *
   *   return (geo != null) ? geo.relative : false;
   * };
   * (end)
   *
   * @param cell - <mxCell> that represents the port.
   */
  isPort(cell: mxCell): boolean;
  /**
   * Returns the terminal to be used for a given port. This implementation
   * always returns the parent cell.
   *
   * @param cell - <mxCell> that represents the port.
   * @param source - If the cell is the source or target port.
   */
  getTerminalForPort(cell: mxCell, source: any): mxCell;
  /**
   * Returns the offset to be used for the cells inside the given cell. The
   * root and layer cells may be identified using <mxGraphModel.isRoot> and
   * <mxGraphModel.isLayer>. For all other current roots, the
   * <mxGraphView.currentRoot> field points to the respective cell, so that
   * the following holds: cell == this.view.currentRoot. This implementation
   * returns null.
   *
   * @param cell - <mxCell> whose offset should be returned.
   */
  getChildOffsetForCell(cell: mxCell): any;
  /**
   * Uses the given cell as the root of the displayed cell hierarchy. If no
   * cell is specified then the selection cell is used. The cell is only used
   * if <isValidRoot> returns true.
   *
   * @param cell - Optional <mxCell> to be used as the new root. Default is the
   * selection cell.
   */
  enterGroup(cell?: mxCell): void;
  /**
   * Changes the current root to the next valid root in the displayed cell
   * hierarchy.
   */
  exitGroup(): void;
  /**
   * Uses the root of the model as the root of the displayed cell hierarchy
   * and selects the previous root.
   */
  home(): void;
  /**
   * Returns true if the given cell is a valid root for the cell display
   * hierarchy. This implementation returns true for all non-null values.
   *
   * cell - <mxCell> which should be checked as a possible root.
   */
  isValidRoot(cell: any): boolean;
  /**
   * Returns the bounds of the visible graph. Shortcut to
   * <mxGraphView.getGraphBounds>. See also: <getBoundingBoxFromGeometry>.
   */
  getGraphBounds(): mxRectangle;
  /**
   * Returns the scaled, translated bounds for the given cell. See
   * <mxGraphView.getBounds> for arrays.
   *
   * @param cell - <mxCell> whose bounds should be returned.
   * @param includeEdges - Optional boolean that specifies if the bounds of
   * the connected edges should be included. Default is false.
   * @param includeDescendants - Optional boolean that specifies if the bounds
   * of all descendants should be included. Default is false.
   */
  getCellBounds(cell: mxCell, includeEdges?: boolean, includeDescendants?: boolean): mxRectangle;
  /**
   * Returns the bounding box for the geometries of the vertices in the
   * given array of cells. This can be used to find the graph bounds during
   * a layout operation (ie. before the last endUpdate) as follows:
   *
   * (code)
   * var cells = graph.getChildCells(graph.getDefaultParent(), true, true);
   * var bounds = graph.getBoundingBoxFromGeometry(cells, true);
   * (end)
   *
   * This can then be used to move cells to the origin:
   *
   * (code)
   * if (bounds.x < 0 || bounds.y < 0)
   * {
   *   graph.moveCells(cells, -Math.min(bounds.x, 0), -Math.min(bounds.y, 0))
   * }
   * (end)
   *
   * Or to translate the graph view:
   *
   * (code)
   * if (bounds.x < 0 || bounds.y < 0)
   * {
   *   graph.view.setTranslate(-Math.min(bounds.x, 0), -Math.min(bounds.y, 0));
   * }
   * (end)
   *
   * @param cells - Array of <mxCells> whose bounds should be returned.
   * @param includeEdges - Specifies if edge bounds should be included by computing
   * the bounding box for all points in geometry. Default is false.
   */
  getBoundingBoxFromGeometry(cells: mxCell[], includeEdges?: boolean): mxRectangle;
  /**
   * Clears all cell states or the states for the hierarchy starting at the
   * given cell and validates the graph. This fires a refresh event as the
   * last step.
   *
   * @param cell - Optional <mxCell> for which the cell states should be cleared.
   */
  refresh(cell: mxCell): void;
  /**
   * Snaps the given numeric value to the grid if <gridEnabled> is true.
   *
   * value - Numeric value to be snapped to the grid.
   */
  snap(value: any): any;
  /**
   * Shifts the graph display by the given amount. This is used to preview
   * panning operations, use <mxGraphView.setTranslate> to set a persistent
   * translation of the view. Fires <mxEvent.PAN>.
   *
   * dx - Amount to shift the graph along the x-axis.
   * dy - Amount to shift the graph along the y-axis.
   */
  panGraph(dx: any, dy: any): void;
  /**
   * Zooms into the graph by <zoomFactor>.
   */
  zoomIn(): void;
  /**
   * Zooms out of the graph by <zoomFactor>.
   */
  zoomOut(): void;
  /**
   * Resets the zoom and panning in the view.
   */
  zoomActual(): void;
  /**
   * Zooms the graph to the given scale with an optional boolean center
   * argument, which is passd to <zoom>.
   */
  zoomTo(scale: any, center: any): void;
  /**
   * Centers the graph in the container.
   *
   * horizontal - Optional boolean that specifies if the graph should be centered
   * horizontally. Default is true.
   * vertical - Optional boolean that specifies if the graph should be centered
   * vertically. Default is true.
   * cx - Optional float that specifies the horizontal center. Default is 0.5.
   * cy - Optional float that specifies the vertical center. Default is 0.5.
   */
  center(horizontal: any, vertical: any, cx: any, cy: any): void;
  /**
   * Zooms the graph using the given factor. Center is an optional boolean
   * argument that keeps the graph scrolled to the center. If the center argument
   * is omitted, then <centerZoom> will be used as its value.
   */
  zoom(factor: number, center?: boolean): void;
  /**
   * Zooms the graph to the specified rectangle. If the rectangle does not have same aspect
   * ratio as the display container, it is increased in the smaller relative dimension only
   * until the aspect match. The original rectangle is centralised within this expanded one.
   *
   * Note that the input rectangular must be un-scaled and un-translated.
   *
   * rect - The un-scaled and un-translated rectangluar region that should be just visible
   * after the operation
   */
  zoomToRect(rect: any): void;
  /**
   * Pans the graph so that it shows the given cell. Optionally the cell may
   * be centered in the container.
   *
   * To center a given graph if the <container> has no scrollbars, use the following code.
   *
   * [code]
   * var bounds = graph.getGraphBounds();
   * graph.view.setTranslate(-bounds.x - (bounds.width - container.clientWidth) / 2,
   * 						   -bounds.y - (bounds.height - container.clientHeight) / 2);
   * [/code]
   *
   * cell - <mxCell> to be made visible.
   * center - Optional boolean flag. Default is false.
   */
  scrollCellToVisible(cell: any, center: any): void;
  /**
   * Pans the graph so that it shows the given rectangle.
   *
   * rect - <mxRectangle> to be made visible.
   */
  scrollRectToVisible(rect: any): boolean;
  /**
   * Returns the <mxGeometry> for the given cell. This implementation uses
   * <mxGraphModel.getGeometry>. Subclasses can override this to implement
   * specific geometries for cells in only one graph, that is, it can return
   * geometries that depend on the current state of the view.
   *
   * cell - <mxCell> whose geometry should be returned.
   */
  getCellGeometry(cell: any): mxGeometry;
  /**
   * Returns true if the given cell is visible in this graph. This
   * implementation uses <mxGraphModel.isVisible>. Subclassers can override
   * this to implement specific visibility for cells in only one graph, that
   * is, without affecting the visible state of the cell.
   *
   * When using dynamic filter expressions for cell visibility, then the
   * graph should be revalidated after the filter expression has changed.
   *
   * cell - <mxCell> whose visible state should be returned.
   */
  isCellVisible(cell: any): boolean;
  /**
   * Returns true if the given cell is collapsed in this graph. This
   * implementation uses <mxGraphModel.isCollapsed>. Subclassers can override
   * this to implement specific collapsed states for cells in only one graph,
   * that is, without affecting the collapsed state of the cell.
   *
   * When using dynamic filter expressions for the collapsed state, then the
   * graph should be revalidated after the filter expression has changed.
   *
   * cell - <mxCell> whose collapsed state should be returned.
   */
  isCellCollapsed(cell: any): boolean;
  /**
   * Returns true if the given cell is connectable in this graph. This
   * implementation uses <mxGraphModel.isConnectable>. Subclassers can override
   * this to implement specific connectable states for cells in only one graph,
   * that is, without affecting the connectable state of the cell in the model.
   *
   * cell - <mxCell> whose connectable state should be returned.
   */
  isCellConnectable(cell: any): boolean;
  /**
   * Returns true if perimeter points should be computed such that the
   * resulting edge has only horizontal or vertical segments.
   *
   * edge - <mxCellState> that represents the edge.
   */
  isOrthogonal(edge: mxCellState): any;
  /**
   * Returns true if the given cell state is a loop.
   *
   * state - <mxCellState> that represents a potential loop.
   */
  isLoop(state: any): boolean;
  /**
   * Returns true if the given event is a clone event. This implementation
   * returns true if control is pressed.
   */
  isCloneEvent(evt: any): boolean;
  /**
   * Hook for implementing click-through behaviour on selected cells. If this
   * returns true the cell behind the selected cell will be selected. This
   * implementation returns false;
   */
  isTransparentClickEvent(evt: any): boolean;
  /**
   * Returns true if the given event is a toggle event. This implementation
   * returns true if the meta key (Cmd) is pressed on Macs or if control is
   * pressed on any other platform.
   */
  isToggleEvent(evt: any): boolean;
  /**
   * Returns true if the given mouse event should be aligned to the grid.
   */
  isGridEnabledEvent(evt: any): boolean;
  /**
   * Returns true if the given mouse event should be aligned to the grid.
   */
  isConstrainedEvent(evt: any): boolean;
  /**
   * Returns true if the given mouse event should not allow any connections to be
   * made. This implementation returns false.
   */
  isIgnoreTerminalEvent(evt: any): boolean;
  /**
   * Displays the given validation error in a dialog. This implementation uses
   * mxUtils.alert.
   */
  validationAlert(message: any): void;
  /**
   * Checks if the return value of <getEdgeValidationError> for the given
   * arguments is null.
   *
   * edge - <mxCell> that represents the edge to validate.
   * source - <mxCell> that represents the source terminal.
   * target - <mxCell> that represents the target terminal.
   */
  isEdgeValid(edge: any, source: any, target: any): boolean;
  /**
   * Returns the validation error message to be displayed when inserting or
   * changing an edges' connectivity. A return value of null means the edge
   * is valid, a return value of '' means it's not valid, but do not display
   * an error message. Any other (non-empty) string returned from this method
   * is displayed as an error message when trying to connect an edge to a
   * source and target. This implementation uses the <multiplicities>, and
   * checks <multigraph>, <allowDanglingEdges> and <allowLoops> to generate
   * validation errors.
   *
   * For extending this method with specific checks for source/target cells,
   * the method can be extended as follows. Returning an empty string means
   * the edge is invalid with no error message, a non-null string specifies
   * the error message, and null means the edge is valid.
   *
   * (code)
   * graph.getEdgeValidationError = function(edge, source, target)
   * {
   *   if (source != null && target != null &&
   *     this.model.getValue(source) != null &&
   *     this.model.getValue(target) != null)
   *   {
   *     if (target is not valid for source)
   *     {
   *       return 'Invalid Target';
   *     }
   *   }
   *
   *   // 'Supercall'
   *   return mxGraph.prototype.getEdgeValidationError.apply(this, arguments);
   * }
   * (end)
   *
   * edge - <mxCell> that represents the edge to validate.
   * source - <mxCell> that represents the source terminal.
   * target - <mxCell> that represents the target terminal.
   */
  getEdgeValidationError(edge: any, source: any, target: any): string;
  /**
   * Hook method for subclassers to return an error message for the given
   * edge and terminals. This implementation returns null.
   *
   * edge - <mxCell> that represents the edge to validate.
   * source - <mxCell> that represents the source terminal.
   * target - <mxCell> that represents the target terminal.
   */
  validateEdge(edge: any, source: any, target: any): any;
  /**
   * Validates the graph by validating each descendant of the given cell or
   * the root of the model. Context is an object that contains the validation
   * state for the complete validation run. The validation errors are
   * attached to their cells using <setCellWarning>. Returns null in the case of
   * successful validation or an array of strings (warnings) in the case of
   * failed validations.
   *
   * Paramters:
   *
   * cell - Optional <mxCell> to start the validation recursion. Default is
   * the graph root.
   * context - Object that represents the global validation state.
   */
  validateGraph(cell: any, context: any): any;
  /**
   * Checks all <multiplicities> that cannot be enforced while the graph is
   * being modified, namely, all multiplicities that require a minimum of
   * 1 edge.
   *
   * cell - <mxCell> for which the multiplicities should be checked.
   */
  getCellValidationError(cell: any): string;
  /**
   * Hook method for subclassers to return an error message for the given
   * cell and validation context. This implementation returns null. Any HTML
   * breaks will be converted to linefeeds in the calling method.
   *
   * cell - <mxCell> that represents the cell to validate.
   * context - Object that represents the global validation state.
   */
  validateCell(cell: any, context: any): any;
  /**
   * Returns the <backgroundImage> as an <mxImage>.
   */
  getBackgroundImage(): mxImage;
  /**
   * Sets the new <backgroundImage>.
   *
   * image - New <mxImage> to be used for the background.
   */
  setBackgroundImage(image: any): void;
  /**
   * Returns the <mxImage> used to display the collapsed state of
   * the specified cell state. This returns null for all edges.
   */
  getFoldingImage(state: any): mxImage;
  /**
   * Returns the textual representation for the given cell. This
   * implementation returns the nodename or string-representation of the user
   * object.
   *
   * Example:
   *
   * The following returns the label attribute from the cells user
   * object if it is an XML node.
   *
   * (code)
   * graph.convertValueToString = function(cell)
   * {
   * 	return cell.getAttribute('label');
   * }
   * (end)
   *
   * See also: <cellLabelChanged>.
   *
   * cell - <mxCell> whose textual representation should be returned.
   */
  convertValueToString(cell: any): string;
  /**
   * Returns a string or DOM node that represents the label for the given
   * cell. This implementation uses <convertValueToString> if <labelsVisible>
   * is true. Otherwise it returns an empty string.
   *
   * To truncate a label to match the size of the cell, the following code
   * can be used.
   *
   * (code)
   * graph.getLabel = function(cell)
   * {
   *   var label = mxGraph.prototype.getLabel.apply(this, arguments);
   *
   *   if (label != null && this.model.isVertex(cell))
   *   {
   *     var geo = this.getCellGeometry(cell);
   *
   *     if (geo != null)
   *     {
   *       var max = parseInt(geo.width / 8);
   *
   *       if (label.length > max)
   *       {
   *         label = label.substring(0, max)+'...';
   *       }
   *     }
   *   }
   *   return mxUtils.htmlEntities(label);
   * }
   * (end)
   *
   * A resize listener is needed in the graph to force a repaint of the label
   * after a resize.
   *
   * (code)
   * graph.addListener(mxEvent.RESIZE_CELLS, function(sender, evt)
   * {
   *   var cells = evt.getProperty('cells');
   *
   *   for (var i = 0; i < cells.length; i++)
   *   {
   *     this.view.removeState(cells[i]);
   *   }
   * });
   * (end)
   *
   * cell - <mxCell> whose label should be returned.
   */
  getLabel(cell: any): string;
  /**
   * Returns true if the label must be rendered as HTML markup. The default
   * implementation returns <htmlLabels>.
   *
   * cell - <mxCell> whose label should be displayed as HTML markup.
   */
  isHtmlLabel(cell: any): boolean;
  /**
   * Returns <htmlLabels>.
   */
  isHtmlLabels(): boolean;
  /**
   * Sets <htmlLabels>.
   */
  setHtmlLabels(value: any): void;
  /**
   * This enables wrapping for HTML labels.
   *
   * Returns true if no white-space CSS style directive should be used for
   * displaying the given cells label. This implementation returns true if
   * <mxConstants.STYLE_WHITE_SPACE> in the style of the given cell is 'wrap'.
   *
   * This is used as a workaround for IE ignoring the white-space directive
   * of child elements if the directive appears in a parent element. It
   * should be overridden to return true if a white-space directive is used
   * in the HTML markup that represents the given cells label. In order for
   * HTML markup to work in labels, <isHtmlLabel> must also return true
   * for the given cell.
   *
   * Example:
   *
   * (code)
   * graph.getLabel = function(cell)
   * {
   *   var tmp = mxGraph.prototype.getLabel.apply(this, arguments); // 'supercall'
   *
   *   if (this.model.isEdge(cell))
   *   {
   *     tmp = '<div style='width: 150px; white-space:normal;'>'+tmp+'</div>';
   *   }
   *
   *   return tmp;
   * }
   *
   * graph.isWrapping = function(state)
   * {
   * 	 return this.model.isEdge(state.cell);
   * }
   * (end)
   *
   * Makes sure no edge label is wider than 150 pixels, otherwise the content
   * is wrapped. Note: No width must be specified for wrapped vertex labels as
   * the vertex defines the width in its geometry.
   *
   * state - <mxCell> whose label should be wrapped.
   */
  isWrapping(cell: any): boolean;
  /**
   * Returns true if the overflow portion of labels should be hidden. If this
   * returns true then vertex labels will be clipped to the size of the vertices.
   * This implementation returns true if <mxConstants.STYLE_OVERFLOW> in the
   * style of the given cell is 'hidden'.
   *
   * state - <mxCell> whose label should be clipped.
   */
  isLabelClipped(cell: any): boolean;
  /**
   * Returns the string or DOM node that represents the tooltip for the given
   * state, node and coordinate pair. This implementation checks if the given
   * node is a folding icon or overlay and returns the respective tooltip. If
   * this does not result in a tooltip, the handler for the cell is retrieved
   * from <selectionCellsHandler> and the optional getTooltipForNode method is
   * called. If no special tooltip exists here then <getTooltipForCell> is used
   * with the cell in the given state as the argument to return a tooltip for the
   * given state.
   *
   * state - <mxCellState> whose tooltip should be returned.
   * node - DOM node that is currently under the mouse.
   * x - X-coordinate of the mouse.
   * y - Y-coordinate of the mouse.
   */
  getTooltip(state: any, node: any, x: any, y: any): any;
  /**
   * Returns the string or DOM node to be used as the tooltip for the given
   * cell. This implementation uses the cells getTooltip function if it
   * exists, or else it returns <convertValueToString> for the cell.
   *
   * Example:
   *
   * (code)
   * graph.getTooltipForCell = function(cell)
   * {
   *   return 'Hello, World!';
   * }
   * (end)
   *
   * Replaces all tooltips with the string Hello, World!
   *
   * cell - <mxCell> whose tooltip should be returned.
   */
  getTooltipForCell(cell: any): any;
  /**
   * Returns the cursor value to be used for the CSS of the shape for the
   * given event. This implementation calls <getCursorForCell>.
   *
   * me - <mxMouseEvent> whose cursor should be returned.
   */
  getCursorForMouseEvent(me: any): any;
  /**
   * Returns the cursor value to be used for the CSS of the shape for the
   * given cell. This implementation returns null.
   *
   * cell - <mxCell> whose cursor should be returned.
   */
  getCursorForCell(cell: any): any;
  /**
   * Returns the start size of the given swimlane, that is, the width or
   * height of the part that contains the title, depending on the
   * horizontal style. The return value is an <mxRectangle> with either
   * width or height set as appropriate.
   *
   * swimlane - <mxCell> whose start size should be returned.
   */
  getStartSize(swimlane: any): mxRectangle;
  /**
   * Returns the image URL for the given cell state. This implementation
   * returns the value stored under <mxConstants.STYLE_IMAGE> in the cell
   * style.
   *
   * state - <mxCellState> whose image URL should be returned.
   */
  getImage(state: any): any;
  /**
   * Returns the vertical alignment for the given cell state. This
   * implementation returns the value stored under
   * <mxConstants.STYLE_VERTICAL_ALIGN> in the cell style.
   *
   * state - <mxCellState> whose vertical alignment should be
   * returned.
   */
  getVerticalAlign(state: any): any;
  /**
   * Returns the indicator color for the given cell state. This
   * implementation returns the value stored under
   * <mxConstants.STYLE_INDICATOR_COLOR> in the cell style.
   *
   * state - <mxCellState> whose indicator color should be
   * returned.
   */
  getIndicatorColor(state: any): any;
  /**
   * Returns the indicator gradient color for the given cell state. This
   * implementation returns the value stored under
   * <mxConstants.STYLE_INDICATOR_GRADIENTCOLOR> in the cell style.
   *
   * state - <mxCellState> whose indicator gradient color should be
   * returned.
   */
  getIndicatorGradientColor(state: any): any;
  /**
   * Returns the indicator shape for the given cell state. This
   * implementation returns the value stored under
   * <mxConstants.STYLE_INDICATOR_SHAPE> in the cell style.
   *
   * state - <mxCellState> whose indicator shape should be returned.
   */
  getIndicatorShape(state: any): any;
  /**
   * Returns the indicator image for the given cell state. This
   * implementation returns the value stored under
   * <mxConstants.STYLE_INDICATOR_IMAGE> in the cell style.
   *
   * state - <mxCellState> whose indicator image should be returned.
   */
  getIndicatorImage(state: any): any;
  /**
   * Returns the value of <border>.
   */
  getBorder(): number;
  /**
   * Sets the value of <border>.
   *
   * value - Positive integer that represents the border to be used.
   */
  setBorder(value: any): void;
  /**
   * Returns true if the given cell is a swimlane in the graph. A swimlane is
   * a container cell with some specific behaviour. This implementation
   * checks if the shape associated with the given cell is a <mxSwimlane>.
   *
   * cell - <mxCell> to be checked.
   */
  isSwimlane(cell: any): boolean;
  /**
   * Returns <resizeContainer>.
   */
  isResizeContainer(): boolean;
  /**
   * Sets <resizeContainer>.
   *
   * value - Boolean indicating if the container should be resized.
   */
  setResizeContainer(value: any): void;
  /**
   * Returns true if the graph is <enabled>.
   */
  isEnabled(): boolean;
  /**
   * Specifies if the graph should allow any interactions. This
   * implementation updates <enabled>.
   *
   * value - Boolean indicating if the graph should be enabled.
   */
  setEnabled(value: any): void;
  /**
   * Returns <escapeEnabled>.
   */
  isEscapeEnabled(): boolean;
  /**
   * Sets <escapeEnabled>.
   *
   * enabled - Boolean indicating if escape should be enabled.
   */
  setEscapeEnabled(value: any): void;
  /**
   * Returns <invokesStopCellEditing>.
   */
  isInvokesStopCellEditing(): boolean;
  /**
   * Sets <invokesStopCellEditing>.
   */
  setInvokesStopCellEditing(value: any): void;
  /**
   * Returns <enterStopsCellEditing>.
   */
  isEnterStopsCellEditing(): boolean;
  /**
   * Sets <enterStopsCellEditing>.
   */
  setEnterStopsCellEditing(value: any): void;
  /**
   * Returns true if the given cell may not be moved, sized, bended,
   * disconnected, edited or selected. This implementation returns true for
   * all vertices with a relative geometry if <locked> is false.
   *
   * cell - <mxCell> whose locked state should be returned.
   */
  isCellLocked(cell: any): boolean;
  /**
   * Returns true if the given cell may not be moved, sized, bended,
   * disconnected, edited or selected. This implementation returns true for
   * all vertices with a relative geometry if <locked> is false.
   *
   * cell - <mxCell> whose locked state should be returned.
   */
  isCellsLocked(): boolean;
  /**
   * Sets if any cell may be moved, sized, bended, disconnected, edited or
   * selected.
   *
   * value - Boolean that defines the new value for <cellsLocked>.
   */
  setCellsLocked(value: any): void;
  /**
   * Returns the cells which may be exported in the given array of cells.
   */
  getCloneableCells(cells: any): mxCell[];
  /**
   * Returns true if the given cell is cloneable. This implementation returns
   * <isCellsCloneable> for all cells unless a cell style specifies
   * <mxConstants.STYLE_CLONEABLE> to be 0.
   *
   * cell - Optional <mxCell> whose cloneable state should be returned.
   */
  isCellCloneable(cell: any): boolean;
  /**
   * Returns <cellsCloneable>, that is, if the graph allows cloning of cells
   * by using control-drag.
   */
  isCellsCloneable(): boolean;
  /**
   * Specifies if the graph should allow cloning of cells by holding down the
   * control key while cells are being moved. This implementation updates
   * <cellsCloneable>.
   *
   * value - Boolean indicating if the graph should be cloneable.
   */
  setCellsCloneable(value: any): void;
  /**
   * Returns the cells which may be exported in the given array of cells.
   */
  getExportableCells(cells: any): mxCell[];
  /**
   * Returns true if the given cell may be exported to the clipboard. This
   * implementation returns <exportEnabled> for all cells.
   *
   * cell - <mxCell> that represents the cell to be exported.
   */
  canExportCell(cell: any): boolean;
  /**
   * Returns the cells which may be imported in the given array of cells.
   */
  getImportableCells(cells: any): mxCell[];
  /**
   * Returns true if the given cell may be imported from the clipboard.
   * This implementation returns <importEnabled> for all cells.
   *
   * cell - <mxCell> that represents the cell to be imported.
   */
  canImportCell(cell: any): boolean;
  /**
   * Returns true if the given cell is selectable. This implementation
   * returns <cellsSelectable>.
   *
   * To add a new style for making cells (un)selectable, use the following code.
   *
   * (code)
   * mxGraph.prototype.isCellSelectable = function(cell)
   * {
   *   var state = this.view.getState(cell);
   *   var style = (state != null) ? state.style : this.getCellStyle(cell);
   *
   *   return this.isCellsSelectable() && !this.isCellLocked(cell) && style['selectable'] != 0;
   * };
   * (end)
   *
   * You can then use the new style as shown in this example.
   *
   * (code)
   * graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30, 'selectable=0');
   * (end)
   *
   * cell - <mxCell> whose selectable state should be returned.
   */
  isCellSelectable(cell: any): boolean;
  /**
   * Returns <cellsSelectable>.
   */
  isCellsSelectable(): boolean;
  /**
   * Sets <cellsSelectable>.
   */
  setCellsSelectable(value: any): void;
  /**
   * Returns the cells which may be exported in the given array of cells.
   */
  getDeletableCells(cells: any): mxCell[];
  /**
   * Returns true if the given cell is moveable. This returns
   * <cellsDeletable> for all given cells if a cells style does not specify
   * <mxConstants.STYLE_DELETABLE> to be 0.
   *
   * cell - <mxCell> whose deletable state should be returned.
   */
  isCellDeletable(cell: any): boolean;
  /**
   * Returns <cellsDeletable>.
   */
  isCellsDeletable(): boolean;
  /**
   * Sets <cellsDeletable>.
   *
   * value - Boolean indicating if the graph should allow deletion of cells.
   */
  setCellsDeletable(value: any): void;
  /**
   * Returns true if the given edges's label is moveable. This returns
   * <movable> for all given cells if <isLocked> does not return true
   * for the given cell.
   *
   * cell - <mxCell> whose label should be moved.
   */
  isLabelMovable(cell: any): boolean;
  /**
   * Returns true if the given cell is rotatable. This returns true for the given
   * cell if its style does not specify <mxConstants.STYLE_ROTATABLE> to be 0.
   *
   * cell - <mxCell> whose rotatable state should be returned.
   */
  isCellRotatable(cell: any): boolean;
  /**
   * Returns the cells which are movable in the given array of cells.
   */
  getMovableCells(cells: any): mxCell[];
  /**
   * Returns true if the given cell is moveable. This returns <cellsMovable>
   * for all given cells if <isCellLocked> does not return true for the given
   * cell and its style does not specify <mxConstants.STYLE_MOVABLE> to be 0.
   *
   * cell - <mxCell> whose movable state should be returned.
   */
  isCellMovable(cell: any): boolean;
  /**
   * Returns <cellsMovable>.
   */
  isCellsMovable(): boolean;
  /**
   * Specifies if the graph should allow moving of cells. This implementation
   * updates <cellsMsovable>.
   *
   * value - Boolean indicating if the graph should allow moving of cells.
   */
  setCellsMovable(value: any): void;
  /**
   * Returns <gridEnabled> as a boolean.
   */
  isGridEnabled(): boolean;
  /**
   * Specifies if the grid should be enabled.
   *
   * value - Boolean indicating if the grid should be enabled.
   */
  setGridEnabled(value: any): void;
  /**
   * Returns <portsEnabled> as a boolean.
   */
  isPortsEnabled(): boolean;
  /**
   * Specifies if the ports should be enabled.
   *
   * value - Boolean indicating if the ports should be enabled.
   */
  setPortsEnabled(value: any): void;
  /**
   * Returns <gridSize>.
   */
  getGridSize(): number;
  /**
   * Sets <gridSize>.
   */
  setGridSize(value: any): void;
  /**
   * Returns <tolerance>.
   */
  getTolerance(): number;
  /**
   * Sets <tolerance>.
   */
  setTolerance(value: any): void;
  /**
   * Returns <vertexLabelsMovable>.
   */
  isVertexLabelsMovable(): boolean;
  /**
   * Sets <vertexLabelsMovable>.
   */
  setVertexLabelsMovable(value: any): void;
  /**
   * Returns <edgeLabelsMovable>.
   */
  isEdgeLabelsMovable(): boolean;
  /**
   * Sets <edgeLabelsMovable>.
   */
  setEdgeLabelsMovable(value: any): void;
  /**
   * Returns <swimlaneNesting> as a boolean.
   */
  isSwimlaneNesting(): boolean;
  /**
   * Specifies if swimlanes can be nested by drag and drop. This is only
   * taken into account if dropEnabled is true.
   *
   * value - Boolean indicating if swimlanes can be nested.
   */
  setSwimlaneNesting(value: any): void;
  /**
   * Returns <swimlaneSelectionEnabled> as a boolean.
   */
  isSwimlaneSelectionEnabled(): boolean;
  /**
   * Specifies if swimlanes should be selected if the mouse is released
   * over their content area.
   *
   * value - Boolean indicating if swimlanes content areas
   * should be selected when the mouse is released over them.
   */
  setSwimlaneSelectionEnabled(value: any): void;
  /**
   * Returns <multigraph> as a boolean.
   */
  isMultigraph(): boolean;
  /**
   * Specifies if the graph should allow multiple connections between the
   * same pair of vertices.
   *
   * value - Boolean indicating if the graph allows multiple connections
   * between the same pair of vertices.
   */
  setMultigraph(value: any): void;
  /**
   * Returns <allowLoops> as a boolean.
   */
  isAllowLoops(): boolean;
  /**
   * Specifies if dangling edges are allowed, that is, if edges are allowed
   * that do not have a source and/or target terminal defined.
   *
   * value - Boolean indicating if dangling edges are allowed.
   */
  setAllowDanglingEdges(value: any): void;
  /**
   * Returns <allowDanglingEdges> as a boolean.
   */
  isAllowDanglingEdges(): boolean;
  /**
   * Specifies if edges should be connectable.
   *
   * value - Boolean indicating if edges should be connectable.
   */
  setConnectableEdges(value: any): void;
  /**
   * Returns <connectableEdges> as a boolean.
   */
  isConnectableEdges(): boolean;
  /**
   * Specifies if edges should be inserted when cloned but not valid wrt.
   * <getEdgeValidationError>. If false such edges will be silently ignored.
   *
   * value - Boolean indicating if cloned invalid edges should be
   * inserted into the graph or ignored.
   */
  setCloneInvalidEdges(value: any): void;
  /**
   * Returns <cloneInvalidEdges> as a boolean.
   */
  isCloneInvalidEdges(): boolean;
  /**
   * Specifies if loops are allowed.
   *
   * value - Boolean indicating if loops are allowed.
   */
  setAllowLoops(value: any): void;
  /**
   * Returns <disconnectOnMove> as a boolean.
   */
  isDisconnectOnMove(): boolean;
  /**
   * Specifies if edges should be disconnected when moved. (Note: Cloned
   * edges are always disconnected.)
   *
   * value - Boolean indicating if edges should be disconnected
   * when moved.
   */
  setDisconnectOnMove(value: any): void;
  /**
   * Returns <dropEnabled> as a boolean.
   */
  isDropEnabled(): boolean;
  /**
   * Specifies if the graph should allow dropping of cells onto or into other
   * cells.
   *
   * dropEnabled - Boolean indicating if the graph should allow dropping
   * of cells into other cells.
   */
  setDropEnabled(value: any): void;
  /**
   * Returns <splitEnabled> as a boolean.
   */
  isSplitEnabled(): boolean;
  /**
   * Specifies if the graph should allow dropping of cells onto or into other
   * cells.
   *
   * dropEnabled - Boolean indicating if the graph should allow dropping
   * of cells into other cells.
   */
  setSplitEnabled(value: any): void;
  /**
   * Returns true if the given cell is resizable. This returns
   * <cellsResizable> for all given cells if <isCellLocked> does not return
   * true for the given cell and its style does not specify
   * <mxConstants.STYLE_RESIZABLE> to be 0.
   *
   * cell - <mxCell> whose resizable state should be returned.
   */
  isCellResizable(cell: any): boolean;
  /**
   * Returns <cellsResizable>.
   */
  isCellsResizable(): boolean;
  /**
   * Specifies if the graph should allow resizing of cells. This
   * implementation updates <cellsResizable>.
   *
   * value - Boolean indicating if the graph should allow resizing of
   * cells.
   */
  setCellsResizable(value: any): void;
  /**
   * Returns true if the given terminal point is movable. This is independent
   * from <isCellConnectable> and <isCellDisconnectable> and controls if terminal
   * points can be moved in the graph if the edge is not connected. Note that it
   * is required for this to return true to connect unconnected edges. This
   * implementation returns true.
   *
   * cell - <mxCell> whose terminal point should be moved.
   * source - Boolean indicating if the source or target terminal should be moved.
   */
  isTerminalPointMovable(cell: any, source: any): boolean;
  /**
   * Returns true if the given cell is bendable. This returns <cellsBendable>
   * for all given cells if <isLocked> does not return true for the given
   * cell and its style does not specify <mxConstants.STYLE_BENDABLE> to be 0.
   *
   * cell - <mxCell> whose bendable state should be returned.
   */
  isCellBendable(cell: any): boolean;
  /**
   * Returns <cellsBenadable>.
   */
  isCellsBendable(): boolean;
  /**
   * Specifies if the graph should allow bending of edges. This
   * implementation updates <bendable>.
   *
   * value - Boolean indicating if the graph should allow bending of
   * edges.
   */
  setCellsBendable(value: any): void;
  /**
   * Returns true if the given cell is editable. This returns <cellsEditable> for
   * all given cells if <isCellLocked> does not return true for the given cell
   * and its style does not specify <mxConstants.STYLE_EDITABLE> to be 0.
   *
   * cell - <mxCell> whose editable state should be returned.
   */
  isCellEditable(cell: any): boolean;
  /**
   * Returns <cellsEditable>.
   */
  isCellsEditable(): boolean;
  /**
   * Specifies if the graph should allow in-place editing for cell labels.
   * This implementation updates <cellsEditable>.
   *
   * value - Boolean indicating if the graph should allow in-place
   * editing.
   */
  setCellsEditable(value: any): void;
  /**
   * Returns true if the given cell is disconnectable from the source or
   * target terminal. This returns <isCellsDisconnectable> for all given
   * cells if <isCellLocked> does not return true for the given cell.
   *
   * cell - <mxCell> whose disconnectable state should be returned.
   * terminal - <mxCell> that represents the source or target terminal.
   * source - Boolean indicating if the source or target terminal is to be
   * disconnected.
   */
  isCellDisconnectable(cell: any, terminal: any, source: any): boolean;
  /**
   * Returns <cellsDisconnectable>.
   */
  isCellsDisconnectable(): boolean;
  /**
   * Sets <cellsDisconnectable>.
   */
  setCellsDisconnectable(value: any): void;
  /**
   * Returns true if the given cell is a valid source for new connections.
   * This implementation returns true for all non-null values and is
   * called by is called by <isValidConnection>.
   *
   * cell - <mxCell> that represents a possible source or null.
   */
  isValidSource(cell: any): boolean;
  /**
   * Returns <isValidSource> for the given cell. This is called by
   * <isValidConnection>.
   *
   * cell - <mxCell> that represents a possible target or null.
   */
  isValidTarget(cell: any): boolean;
  /**
   * Returns true if the given target cell is a valid target for source.
   * This is a boolean implementation for not allowing connections between
   * certain pairs of vertices and is called by <getEdgeValidationError>.
   * This implementation returns true if <isValidSource> returns true for
   * the source and <isValidTarget> returns true for the target.
   *
   * source - <mxCell> that represents the source cell.
   * target - <mxCell> that represents the target cell.
   */
  isValidConnection(source: any, target: any): boolean;
  /**
   * Specifies if the graph should allow new connections. This implementation
   * updates <mxConnectionHandler.enabled> in <connectionHandler>.
   *
   * connectable - Boolean indicating if new connections should be allowed.
   */
  setConnectable(connectable: any): void;
  /**
   * Returns true if the <connectionHandler> is enabled.
   */
  isConnectable(connectable: any): boolean;
  /**
   * Specifies if tooltips should be enabled. This implementation updates
   * <mxTooltipHandler.enabled> in <tooltipHandler>.
   *
   * enabled - Boolean indicating if tooltips should be enabled.
   */
  setTooltips(enabled: any): void;
  /**
   * Specifies if panning should be enabled. This implementation updates
   * <mxPanningHandler.panningEnabled> in <panningHandler>.
   *
   * enabled - Boolean indicating if panning should be enabled.
   */
  setPanning(enabled: any): void;
  /**
   * Returns true if the given cell is currently being edited.
   * If no cell is specified then this returns true if any
   * cell is currently being edited.
   *
   * @param cell - <mxCell> that should be checked.
   */
  isEditing(cell?: mxCell): boolean;
  /**
   * Returns true if the size of the given cell should automatically be
   * updated after a change of the label. This implementation returns
   * <autoSizeCells> or checks if the cell style does specify
   * <mxConstants.STYLE_AUTOSIZE> to be 1.
   *
   * cell - <mxCell> that should be resized.
   */
  isAutoSizeCell(cell: any): boolean;
  /**
   * Returns <autoSizeCells>.
   */
  isAutoSizeCells(): boolean;
  /**
   * Specifies if cell sizes should be automatically updated after a label
   * change. This implementation sets <autoSizeCells> to the given parameter.
   * To update the size of cells when the cells are added, set
   * <autoSizeCellsOnAdd> to true.
   *
   * value - Boolean indicating if cells should be resized
   * automatically.
   */
  setAutoSizeCells(value: any): void;
  /**
   * Returns true if the parent of the given cell should be extended if the
   * child has been resized so that it overlaps the parent. This
   * implementation returns <isExtendParents> if the cell is not an edge.
   *
   * cell - <mxCell> that has been resized.
   */
  isExtendParent(cell: any): boolean;
  /**
   * Returns <extendParents>.
   */
  isExtendParents(): boolean;
  /**
   * Sets <extendParents>.
   *
   * value - New boolean value for <extendParents>.
   */
  setExtendParents(value: any): void;
  /**
   * Returns <extendParentsOnAdd>.
   */
  isExtendParentsOnAdd(cell: any): boolean;
  /**
   * Sets <extendParentsOnAdd>.
   *
   * value - New boolean value for <extendParentsOnAdd>.
   */
  setExtendParentsOnAdd(value: any): void;
  /**
   * Returns <extendParentsOnMove>.
   */
  isExtendParentsOnMove(): boolean;
  /**
   * Sets <extendParentsOnMove>.
   *
   * value - New boolean value for <extendParentsOnAdd>.
   */
  setExtendParentsOnMove(value: any): void;
  /**
   * Returns <recursiveResize>.
   *
   * state - <mxCellState> that is being resized.
   */
  isRecursiveResize(state?: mxCellState): boolean;
  /**
   * Sets <recursiveResize>.
   *
   * value - New boolean value for <recursiveResize>.
   */
  setRecursiveResize(value: any): void;
  /**
   * Returns true if the given cell should be kept inside the bounds of its
   * parent according to the rules defined by <getOverlap> and
   * <isAllowOverlapParent>. This implementation returns false for all children
   * of edges and <isConstrainChildren> otherwise.
   *
   * cell - <mxCell> that should be constrained.
   */
  isConstrainChild(cell: any): boolean;
  /**
   * Returns <constrainChildren>.
   */
  isConstrainChildren(): boolean;
  /**
   * Sets <constrainChildren>.
   */
  setConstrainChildren(value: any): void;
  /**
   * Returns <constrainRelativeChildren>.
   */
  isConstrainRelativeChildren(): boolean;
  /**
   * Sets <constrainRelativeChildren>.
   */
  setConstrainRelativeChildren(value: any): void;
  /**
   * Returns <allowNegativeCoordinates>.
   */
  isAllowNegativeCoordinates(): boolean;
  /**
   * Sets <allowNegativeCoordinates>.
   */
  setAllowNegativeCoordinates(value: any): void;
  /**
   * Returns a decimal number representing the amount of the width and height
   * of the given cell that is allowed to overlap its parent. A value of 0
   * means all children must stay inside the parent, 1 means the child is
   * allowed to be placed outside of the parent such that it touches one of
   * the parents sides. If <isAllowOverlapParent> returns false for the given
   * cell, then this method returns 0.
   *
   * cell - <mxCell> for which the overlap ratio should be returned.
   */
  getOverlap(cell: any): number;
  /**
   * Returns true if the given cell is allowed to be placed outside of the
   * parents area.
   *
   * cell - <mxCell> that represents the child to be checked.
   */
  isAllowOverlapParent(cell: any): boolean;
  /**
   * Returns the cells which are movable in the given array of cells.
   */
  getFoldableCells(cells: any, collapse: any): mxCell[];
  /**
   * Returns true if the given cell is foldable. This implementation
   * returns true if the cell has at least one child and its style
   * does not specify <mxConstants.STYLE_FOLDABLE> to be 0.
   *
   * cell - <mxCell> whose foldable state should be returned.
   */
  isCellFoldable(cell: any, collapse: any): boolean;
  /**
   * Returns true if the given cell is a valid drop target for the specified
   * cells. If <splitEnabled> is true then this returns <isSplitTarget> for
   * the given arguments else it returns true if the cell is not collapsed
   * and its child count is greater than 0.
   *
   * cell - <mxCell> that represents the possible drop target.
   * cells - <mxCells> that should be dropped into the target.
   * evt - Mouseevent that triggered the invocation.
   */
  isValidDropTarget(cell: any, cells: any, evt: any): boolean;
  /**
   * Returns true if the given edge may be splitted into two edges with the
   * given cell as a new terminal between the two.
   *
   * target - <mxCell> that represents the edge to be splitted.
   * cells - <mxCells> that should split the edge.
   * evt - Mouseevent that triggered the invocation.
   */
  isSplitTarget(target: any, cells: any, evt: any): boolean;
  /**
   * Returns the given cell if it is a drop target for the given cells or the
   * nearest ancestor that may be used as a drop target for the given cells.
   * If the given array contains a swimlane and <swimlaneNesting> is false
   * then this always returns null. If no cell is given, then the bottommost
   * swimlane at the location of the given event is returned.
   *
   * This function should only be used if <isDropEnabled> returns true.
   *
   * cells - Array of <mxCells> which are to be dropped onto the target.
   * evt - Mouseevent for the drag and drop.
   * cell - <mxCell> that is under the mousepointer.
   * clone - Optional boolean to indicate of cells will be cloned.
   */
  getDropTarget(cells: any, evt: any, cell: any, clone: any): any;
  /**
   * Returns <defaultParent> or <mxGraphView.currentRoot> or the first child
   * child of <mxGraphModel.root> if both are null. The value returned by
   * this function should be used as the parent for new cells (aka default
   * layer).
   */
  getDefaultParent(): mxCell;
  /**
   * Sets the <defaultParent> to the given cell. Set this to null to return
   * the first child of the root in getDefaultParent.
   */
  setDefaultParent(cell: any): void;
  /**
   * Returns the nearest ancestor of the given cell which is a swimlane, or
   * the given cell, if it is itself a swimlane.
   *
   * cell - <mxCell> for which the ancestor swimlane should be returned.
   */
  getSwimlane(cell: any): any;
  /**
   * Returns the bottom-most swimlane that intersects the given point (x, y)
   * in the cell hierarchy that starts at the given parent.
   *
   * x - X-coordinate of the location to be checked.
   * y - Y-coordinate of the location to be checked.
   * parent - <mxCell> that should be used as the root of the recursion.
   * Default is <defaultParent>.
   */
  getSwimlaneAt(x: number, y: number, parent?: mxCell): any;
  /**
   * Returns the bottom-most cell that intersects the given point (x, y) in
   * the cell hierarchy starting at the given parent. This will also return
   * swimlanes if the given location intersects the content area of the
   * swimlane. If this is not desired, then the <hitsSwimlaneContent> may be
   * used if the returned cell is a swimlane to determine if the location
   * is inside the content area or on the actual title of the swimlane.
   *
   * @param x - X-coordinate of the location to be checked.
   * @param y - Y-coordinate of the location to be checked.
   * @param parent - <mxCell> that should be used as the root of the recursion.
   * Default is current root of the view or the root of the model.
   * @param vertices - Optional boolean indicating if vertices should be returned.
   * Default is true.
   * @param edges - Optional boolean indicating if edges should be returned. Default
   * is true.
   * @param ignoreFn - Optional function that returns true if cell should be ignored.
   * The function is passed the cell state and the x and y parameter.
   */
  getCellAt(x: number, y: number, parent?: mxCell, vertices?: boolean, edges?: boolean, ignoreFn?: (cell: mxCellState, x: number, y: number) => boolean): any;
  /**
   * Returns the bottom-most cell that intersects the given point (x, y) in
   * the cell hierarchy that starts at the given parent.
   *
   * state - <mxCellState> that represents the cell state.
   * x - X-coordinate of the location to be checked.
   * y - Y-coordinate of the location to be checked.
   */
  intersects(state: any, x: any, y: any): boolean;
  /**
   * Returns true if the given coordinate pair is inside the content
   * are of the given swimlane.
   *
   * swimlane - <mxCell> that specifies the swimlane.
   * x - X-coordinate of the mouse event.
   * y - Y-coordinate of the mouse event.
   */
  hitsSwimlaneContent(swimlane: any, x: any, y: any): boolean;
  /**
   * Returns the visible child vertices of the given parent.
   *
   * parent - <mxCell> whose children should be returned.
   */
  getChildVertices(parent: any): mxCell[];
  /**
   * Returns the visible child edges of the given parent.
   *
   * @param parent - <mxCell> whose child vertices should be returned.
   */
  getChildEdges(parent: mxCell): mxCell[];
  /**
   * Returns the visible child vertices or edges in the given parent. If
   * vertices and edges is false, then all children are returned.
   *
   * @param parent - <mxCell> whose children should be returned.
   * @param vertices - Optional boolean that specifies if child vertices should
   * be returned. Default is false.
   * @param edges - Optional boolean that specifies if child edges should
   * be returned. Default is false.
   */
  getChildCells(parent: mxCell, vertices?: boolean, edges?: boolean): mxCell[];
  /**
   * Returns all visible edges connected to the given cell without loops.
   *
   * @param cell - <mxCell> whose connections should be returned.
   * @param parent - Optional parent of the opposite end for a connection to be
   * returned.
   */
  getConnections(cell: mxCell, parent?: mxCell): any[];
  /**
   * Returns the visible incoming edges for the given cell. If the optional
   * parent argument is specified, then only child edges of the given parent
   * are returned.
   *
   * @param cell - <mxCell> whose incoming edges should be returned.
   * @param parent - Optional parent of the opposite end for an edge to be
   * returned.
   */
  getIncomingEdges(cell: mxCell, parent?: mxCell): any[];
  /**
   * Returns the visible outgoing edges for the given cell. If the optional
   * parent argument is specified, then only child edges of the given parent
   * are returned.
   *
   * @param cell - <mxCell> whose outgoing edges should be returned.
   * @param parent - Optional parent of the opposite end for an edge to be
   * returned.
   */
  getOutgoingEdges(cell: mxCell, parent?: mxCell): any[];
  /**
   * Returns the incoming and/or outgoing edges for the given cell.
   * If the optional parent argument is specified, then only edges are returned
   * where the opposite is in the given parent cell. If at least one of incoming
   * or outgoing is true, then loops are ignored, if both are false, then all
   * edges connected to the given cell are returned including loops.
   *
   * @param cell - <mxCell> whose edges should be returned.
   * @param parent - Optional parent of the opposite end for an edge to be
   * returned.
   * @param incoming - Optional boolean that specifies if incoming edges should
   * be included in the result. Default is true.
   * @param outgoing - Optional boolean that specifies if outgoing edges should
   * be included in the result. Default is true.
   * @param includeLoops - Optional boolean that specifies if loops should be
   * included in the result. Default is true.
   * @param recurse - Optional boolean the specifies if the parent specified only
   * need be an ancestral parent, true, or the direct parent, false.
   * Default is false
   */
  getEdges(cell: mxCell, parent?: mxCell, incoming?: boolean, outgoing?: boolean, includeLoops?: boolean, recurse?: boolean): any[];
  /**
   * Returns whether or not the specified parent is a valid
   * ancestor of the specified cell, either direct or indirectly
   * based on whether ancestor recursion is enabled.
   *
   * cell - <mxCell> the possible child cell
   * parent - <mxCell> the possible parent cell
   * recurse - boolean whether or not to recurse the child ancestors
   */
  isValidAncestor(cell: any, parent: any, recurse: any): boolean;
  /**
   * Returns all distinct visible opposite cells for the specified terminal
   * on the given edges.
   *
   * edges - Array of <mxCells> that contains the edges whose opposite
   * terminals should be returned.
   * terminal - Terminal that specifies the end whose opposite should be
   * returned.
   * source - Optional boolean that specifies if source terminals should be
   * included in the result. Default is true.
   * targets - Optional boolean that specifies if targer terminals should be
   * included in the result. Default is true.
   */
  getOpposites(edges: any, terminal: any, sources: any, targets: any): any[];
  /**
   * Returns the edges between the given source and target. This takes into
   * account collapsed and invisible cells and returns the connected edges
   * as displayed on the screen.
   *
   * source -
   * target -
   * directed -
   */
  getEdgesBetween(source: any, target: any, directed: any): any[];
  /**
   * Returns an <mxPoint> representing the given event in the unscaled,
   * non-translated coordinate space of <container> and applies the grid.
   *
   * @param evt - Mousevent that contains the mouse pointer location.
   * @param addOffset - Optional boolean that specifies if the position should be
   * offset by half of the <gridSize>. Default is true.
   */
  getPointForEvent(evt: MouseEvent, addOffset?: boolean): any;
  /**
   * Returns the child vertices and edges of the given parent that are contained
   * in the given rectangle. The result is added to the optional result array,
   * which is returned. If no result array is specified then a new array is
   * created and returned.
   *
   * @param x - X-coordinate of the rectangle.
   * @param y - Y-coordinate of the rectangle.
   * @param width - Width of the rectangle.
   * @param height - Height of the rectangle.
   * @param parent - <mxCell> that should be used as the root of the recursion.
   * Default is current root of the view or the root of the model.
   * @param result - Optional array to store the result in.
   */
  getCells(x: number, y: number, width: number, height: number, parent?: mxCell, result?: mxCell[]): mxCell[];
  /**
   * Returns the children of the given parent that are contained in the
   * halfpane from the given point (x0, y0) rightwards or downwards
   * depending on rightHalfpane and bottomHalfpane.
   *
   * x0 - X-coordinate of the origin.
   * y0 - Y-coordinate of the origin.
   * parent - Optional <mxCell> whose children should be checked. Default is
   * <defaultParent>.
   * rightHalfpane - Boolean indicating if the cells in the right halfpane
   * from the origin should be returned.
   * bottomHalfpane - Boolean indicating if the cells in the bottom halfpane
   * from the origin should be returned.
   */
  getCellsBeyond(x0: any, y0: any, parent: any, rightHalfpane: any, bottomHalfpane: any): any[];
  /**
   * Returns all children in the given parent which do not have incoming
   * edges. If the result is empty then the with the greatest difference
   * between incoming and outgoing edges is returned.
   *
   * parent - <mxCell> whose children should be checked.
   * isolate - Optional boolean that specifies if edges should be ignored if
   * the opposite end is not a child of the given parent cell. Default is
   * false.
   * invert - Optional boolean that specifies if outgoing or incoming edges
   * should be counted for a tree root. If false then outgoing edges will be
   * counted. Default is false.
   */
  findTreeRoots(parent: any, isolate: any, invert: any): any[];
  /**
   * Traverses the (directed) graph invoking the given function for each
   * visited vertex and edge. The function is invoked with the current vertex
   * and the incoming edge as a parameter. This implementation makes sure
   * each vertex is only visited once. The function may return false if the
   * traversal should stop at the given vertex.
   *
   * Example:
   *
   * (code)
   * mxLog.show();
   * var cell = graph.getSelectionCell();
   * graph.traverse(cell, false, function(vertex, edge)
   * {
   *   mxLog.debug(graph.getLabel(vertex));
   * });
   * (end)
   *
   * vertex - <mxCell> that represents the vertex where the traversal starts.
   * directed - Optional boolean indicating if edges should only be traversed
   * from source to target. Default is true.
   * func - Visitor function that takes the current vertex and the incoming
   * edge as arguments. The traversal stops if the function returns false.
   * edge - Optional <mxCell> that represents the incoming edge. This is
   * null for the first step of the traversal.
   * visited - Optional <mxDictionary> from cells to true for the visited cells.
   * inverse - Optional boolean to traverse in inverse direction. Default is false.
   * This is ignored if directed is false.
   */
  traverse(vertex: any, directed: any, func: any, edge: any, visited: any, inverse: any): void;
  /**
   * Returns true if the given cell is selected.
   *
   * cell - <mxCell> for which the selection state should be returned.
   */
  isCellSelected(cell: any): boolean;
  /**
   * Returns true if the selection is empty.
   */
  isSelectionEmpty(): boolean;
  /**
   * Clears the selection using <mxGraphSelectionModel.clear>.
   */
  clearSelection(): void;
  /**
   * Returns the number of selected cells.
   */
  getSelectionCount(): number;
  /**
   * Returns the first cell from the array of selected <mxCells>.
   */
  getSelectionCell(): mxCell;
  /**
   * Returns the array of selected <mxCells>.
   */
  getSelectionCells(): mxCell[];
  /**
   * Sets the selection cell.
   *
   * cell - <mxCell> to be selected.
   */
  setSelectionCell(cell: any): void;
  /**
   * Sets the selection cell.
   *
   * cells - Array of <mxCells> to be selected.
   */
  setSelectionCells(cells: any): void;
  /**
   * Adds the given cell to the selection.
   *
   * cell - <mxCell> to be add to the selection.
   */
  addSelectionCell(cell: any): void;
  /**
   * Adds the given cells to the selection.
   *
   * cells - Array of <mxCells> to be added to the selection.
   */
  addSelectionCells(cells: any): void;
  /**
   * Removes the given cell from the selection.
   *
   * cell - <mxCell> to be removed from the selection.
   */
  removeSelectionCell(cell: any): void;
  /**
   * Removes the given cells from the selection.
   *
   * cells - Array of <mxCells> to be removed from the selection.
   */
  removeSelectionCells(cells: any): void;
  /**
   * Selects and returns the cells inside the given rectangle for the
   * specified event.
   *
   * @param rect - <mxRectangle> that represents the region to be selected.
   * @param evt - Mouseevent that triggered the selection.
   */
  selectRegion(rect: mxRectangle, evt: MouseEvent): mxCell[];
  /**
   * Selects the next cell.
   */
  selectNextCell(): void;
  /**
   * Selects the previous cell.
   */
  selectPreviousCell(): void;
  /**
   * Selects the parent cell.
   */
  selectParentCell(): void;
  /**
   * Selects the first child cell.
   */
  selectChildCell(): void;
  /**
   * Selects the next, parent, first child or previous cell, if all arguments
   * are false.
   *
   * @param isNext - Boolean indicating if the next cell should be selected.
   * @param isParent - Boolean indicating if the parent cell should be selected.
   * @param isChild - Boolean indicating if the first child cell should be selected.
   */
  selectCell(isNext?: boolean, isParent?: boolean, isChild?: boolean): void;
  /**
   * Selects all children of the given parent cell or the children of the
   * default parent if no parent is specified. To select leaf vertices and/or
   * edges use <selectCells>.
   *
   * parent - Optional <mxCell> whose children should be selected.
   * Default is <defaultParent>.
   * descendants - Optional boolean specifying whether all descendants should be
   * selected. Default is false.
   */
  selectAll(parent: any, descendants: any): void;
  /**
   * Select all vertices inside the given parent or the default parent.
   */
  selectVertices(parent: any): void;
  /**
   * Select all vertices inside the given parent or the default parent.
   */
  selectEdges(parent: any): void;
  /**
   * Selects all vertices and/or edges depending on the given boolean
   * arguments recursively, starting at the given parent or the default
   * parent if no parent is specified. Use <selectAll> to select all cells.
   * For vertices, only cells with no children are selected.
   *
   * vertices - Boolean indicating if vertices should be selected.
   * edges - Boolean indicating if edges should be selected.
   * parent - Optional <mxCell> that acts as the root of the recursion.
   * Default is <defaultParent>.
   */
  selectCells(vertices: any, edges: any, parent: any): void;
  /**
   * Selects the given cell by either adding it to the selection or
   * replacing the selection depending on whether the given mouse event is a
   * toggle event.
   *
   * cell - <mxCell> to be selected.
   * evt - Optional mouseevent that triggered the selection.
   */
  selectCellForEvent(cell: any, evt: any): void;
  /**
   * Selects the given cells by either adding them to the selection or
   * replacing the selection depending on whether the given mouse event is a
   * toggle event.
   *
   * cells - Array of <mxCells> to be selected.
   * evt - Optional mouseevent that triggered the selection.
   */
  selectCellsForEvent(cells: any, evt: any): void;
  /**
   * Creates a new handler for the given cell state. This implementation
   * returns a new <mxEdgeHandler> of the corresponding cell is an edge,
   * otherwise it returns an <mxVertexHandler>.
   *
   * state - <mxCellState> whose handler should be created.
   */
  createHandler(state: any): any;
  /**
   * Hooks to create a new <mxVertexHandler> for the given <mxCellState>.
   *
   * state - <mxCellState> to create the handler for.
   */
  createVertexHandler(state: any): mxVertexHandler;
  /**
   * Hooks to create a new <mxEdgeHandler> for the given <mxCellState>.
   *
   * state - <mxCellState> to create the handler for.
   */
  createEdgeHandler(state: any, edgeStyle: any): any;
  /**
   * Hooks to create a new <mxEdgeSegmentHandler> for the given <mxCellState>.
   *
   * state - <mxCellState> to create the handler for.
   */
  createEdgeSegmentHandler(state: any): mxEdgeSegmentHandler;
  /**
   * Hooks to create a new <mxElbowEdgeHandler> for the given <mxCellState>.
   *
   * state - <mxCellState> to create the handler for.
   */
  createElbowEdgeHandler(state: any): mxElbowEdgeHandler;
  /**
   * Adds a listener to the graph event dispatch loop. The listener
   * must implement the mouseDown, mouseMove and mouseUp methods
   * as shown in the <mxMouseEvent> class.
   *
   * listener - Listener to be added to the graph event listeners.
   */
  addMouseListener(listener: any): void;
  /**
   * Removes the specified graph listener.
   *
   * listener - Listener to be removed from the graph event listeners.
   */
  removeMouseListener(listener: any): void;
  /**
   * Sets the graphX and graphY properties if the given <mxMouseEvent> if
   * required and returned the event.
   *
   * me - <mxMouseEvent> to be updated.
   * evtName - Name of the mouse event.
   */
  updateMouseEvent(me: any, evtName: any): any;
  /**
   * Returns the state for the given touch event.
   */
  getStateForTouchEvent(evt: any): mxCellState;
  /**
   * Returns true if the event should be ignored in <fireMouseEvent>.
   */
  isEventIgnored(evtName: any, me: any, sender: any): boolean;
  /**
   * Hook for ignoring synthetic mouse events after touchend in Firefox.
   */
  isSyntheticEventIgnored(evtName: any, me: any, sender: any): boolean;
  /**
   * Returns true if the event should be ignored in <fireMouseEvent>. This
   * implementation returns true for select, option and input (if not of type
   * checkbox, radio, button, submit or file) event sources if the event is not
   * a mouse event or a left mouse button press event.
   *
   * evtName - The name of the event.
   * me - <mxMouseEvent> that should be ignored.
   */
  isEventSourceIgnored(evtName: any, me: any): boolean;
  /**
   * Returns the <mxCellState> to be used when firing the mouse event for the
   * given state. This implementation returns the given state.
   *
   * <mxCellState> - State whose event source should be returned.
   */
  getEventState(state: any): any;
  /**
   * Dispatches the given event in the graph event dispatch loop. Possible
   * event names are <mxEvent.MOUSE_DOWN>, <mxEvent.MOUSE_MOVE> and
   * <mxEvent.MOUSE_UP>. All listeners are invoked for all events regardless
   * of the consumed state of the event.
   *
   * evtName - String that specifies the type of event to be dispatched.
   * me - <mxMouseEvent> to be fired.
   * sender - Optional sender argument. Default is this.
   */
  fireMouseEvent(evtName: any, me: any, sender: any): void;
  /**
   * Consumes the given <mxMouseEvent> if it's a touchStart event.
   */
  consumeMouseEvent(evtName: any, me: any, sender: any): void;
  /**
   * Dispatches a <mxEvent.GESTURE> event. The following example will resize the
   * cell under the mouse based on the scale property of the native touch event.
   *
   * (code)
   * graph.addListener(mxEvent.GESTURE, function(sender, eo)
   * {
   *   var evt = eo.getProperty('event');
   *   var state = graph.view.getState(eo.getProperty('cell'));
   *
   *   if (graph.isEnabled() && graph.isCellResizable(state.cell) && Math.abs(1 - evt.scale) > 0.2)
   *   {
   *     var scale = graph.view.scale;
   *     var tr = graph.view.translate;
   *
   *     var w = state.width * evt.scale;
   *     var h = state.height * evt.scale;
   *     var x = state.x - (w - state.width) / 2;
   *     var y = state.y - (h - state.height) / 2;
   *
   *     var bounds = new mxRectangle(graph.snap(x / scale) - tr.x,
   *     		graph.snap(y / scale) - tr.y, graph.snap(w / scale), graph.snap(h / scale));
   *     graph.resizeCell(state.cell, bounds);
   *     eo.consume();
   *   }
   * });
   * (end)
   *
   * evt - Gestureend event that represents the gesture.
   * cell - Optional <mxCell> associated with the gesture.
   */
  fireGestureEvent(evt: any, cell: any): void;
  /**
   * Destroys the graph and all its resources.
   */
  destroy(): void;
}
