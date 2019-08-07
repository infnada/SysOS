/**
 * Extends <mxEventSource> to implement a graph model. The graph model acts as
 * a wrapper around the cells which are in charge of storing the actual graph
 * datastructure. The model acts as a transactional wrapper with event
 * notification for all changes, whereas the cells contain the atomic
 * operations for updating the actual datastructure.
 *
 * Layers:
 *
 * The cell hierarchy in the model must have a top-level root cell which
 * contains the layers (typically one default layer), which in turn contain the
 * top-level cells of the layers. This means each cell is contained in a layer.
 * If no layers are required, then all new cells should be added to the default
 * layer.
 *
 * Layers are useful for hiding and showing groups of cells, or for placing
 * groups of cells on top of other cells in the display. To identify a layer,
 * the <isLayer> function is used. It returns true if the parent of the given
 * cell is the root of the model.
 *
 * Events:
 *
 * See events section for more details. There is a new set of events for
 * tracking transactional changes as they happen. The events are called
 * startEdit for the initial beginUpdate, executed for each executed change
 * and endEdit for the terminal endUpdate. The executed event contains a
 * property called change which represents the change after execution.
 *
 * Encoding the model:
 *
 * To encode a graph model, use the following code:
 *
 * (code)
 * var enc = new mxCodec();
 * var node = enc.encode(graph.getModel());
 * (end)
 *
 * This will create an XML node that contains all the model information.
 *
 * Encoding and decoding changes:
 *
 * For the encoding of changes, a graph model listener is required that encodes
 * each change from the given array of changes.
 *
 * (code)
 * model.addListener(mxEvent.CHANGE, function(sender, evt)
 * {
 *   var changes = evt.getProperty('edit').changes;
 *   var nodes = [];
 *   var codec = new mxCodec();
 *
 *   for (var i = 0; i < changes.length; i++)
 *   {
 *     nodes.push(codec.encode(changes[i]));
 *   }
 *   // do something with the nodes
 * });
 * (end)
 *
 * For the decoding and execution of changes, the codec needs a lookup function
 * that allows it to resolve cell IDs as follows:
 *
 * (code)
 * var codec = new mxCodec();
 * codec.lookup = function(id)
 * {
 *   return model.getCell(id);
 * }
 * (end)
 *
 * For each encoded change (represented by a node), the following code can be
 * used to carry out the decoding and create a change object.
 *
 * (code)
 * var changes = [];
 * var change = codec.decode(node);
 * change.model = model;
 * change.execute();
 * changes.push(change);
 * (end)
 *
 * The changes can then be dispatched using the model as follows.
 *
 * (code)
 * var edit = new mxUndoableEdit(model, false);
 * edit.changes = changes;
 *
 * edit.notify = function()
 * {
 *   edit.source.fireEvent(new mxEventObject(mxEvent.CHANGE,
 *   	'edit', edit, 'changes', edit.changes));
 *   edit.source.fireEvent(new mxEventObject(mxEvent.NOTIFY,
 *   	'edit', edit, 'changes', edit.changes));
 * }
 *
 * model.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', edit));
 * model.fireEvent(new mxEventObject(mxEvent.CHANGE,
 * 		'edit', edit, 'changes', changes));
 * (end)
 *
 * Event: mxEvent.CHANGE
 *
 * Fires when an undoable edit is dispatched. The <code>edit</code> property
 * contains the <mxUndoableEdit>. The <code>changes</code> property contains
 * the array of atomic changes inside the undoable edit. The changes property
 * is <strong>deprecated</strong>, please use edit.changes instead.
 *
 * Example:
 *
 * For finding newly inserted cells, the following code can be used:
 *
 * (code)
 * graph.model.addListener(mxEvent.CHANGE, function(sender, evt)
 * {
 *   var changes = evt.getProperty('edit').changes;
 *
 *   for (var i = 0; i < changes.length; i++)
 *   {
 *     var change = changes[i];
 *
 *     if (change instanceof mxChildChange &&
 *       change.change.previous == null)
 *     {
 *       graph.startEditingAtCell(change.child);
 *       break;
 *     }
 *   }
 * });
 * (end)
 *
 *
 * Event: mxEvent.NOTIFY
 *
 * Same as <mxEvent.CHANGE>, this event can be used for classes that need to
 * implement a sync mechanism between this model and, say, a remote model. In
 * such a setup, only local changes should trigger a notify event and all
 * changes should trigger a change event.
 *
 * Event: mxEvent.EXECUTE
 *
 * Fires between begin- and endUpdate and after an atomic change was executed
 * in the model. The <code>change</code> property contains the atomic change
 * that was executed.
 *
 * Event: mxEvent.EXECUTED
 *
 * Fires between START_EDIT and END_EDIT after an atomic change was executed.
 * The <code>change</code> property contains the change that was executed.
 *
 * Event: mxEvent.BEGIN_UPDATE
 *
 * Fires after the <updateLevel> was incremented in <beginUpdate>. This event
 * contains no properties.
 *
 * Event: mxEvent.START_EDIT
 *
 * Fires after the <updateLevel> was changed from 0 to 1. This event
 * contains no properties.
 *
 * Event: mxEvent.END_UPDATE
 *
 * Fires after the <updateLevel> was decreased in <endUpdate> but before any
 * notification or change dispatching. The <code>edit</code> property contains
 * the <currentEdit>.
 *
 * Event: mxEvent.END_EDIT
 *
 * Fires after the <updateLevel> was changed from 1 to 0. This event
 * contains no properties.
 *
 * Event: mxEvent.BEFORE_UNDO
 *
 * Fires before the change is dispatched after the update level has reached 0
 * in <endUpdate>. The <code>edit</code> property contains the <curreneEdit>.
 *
 * Event: mxEvent.UNDO
 *
 * Fires after the change was dispatched in <endUpdate>. The <code>edit</code>
 * property contains the <currentEdit>.
 *
 * Constructor: mxGraphModel
 *
 * Constructs a new graph model. If no root is specified then a new root
 * <mxCell> with a default layer is created.
 *
 * Parameters:
 *
 * root - <mxCell> that represents the root cell.
 */
import {mxEventSource} from "./mx-event-source";
import {mxCell} from "./mx-cell";
import {mxPoint} from "./mx-point";
import {Value} from "./value";
import {mxGeometry} from "./mx-geometry";
import {mxUndoableEdit} from "./mx-undoable-edit";

export interface mxGraphModel extends mxEventSource {
  /**
   * Holds the root cell, which in turn contains the cells that represent the
   * layers of the diagram as child cells. That is, the actual elements of the
   * diagram are supposed to live in the third generation of cells and below.
   */
  root: any;
  /**
   * Maps from Ids to cells.
   */
  cells: any;
  /**
   * Specifies if edges should automatically be moved into the nearest common
   * ancestor of their terminals. Default is true.
   */
  maintainEdgeParent: boolean;
  /**
   * Specifies if relative edge parents should be ignored for finding the nearest
   * common ancestors of an edge's terminals. Default is true.
   */
  ignoreRelativeEdgeParent: boolean;
  /**
   * Specifies if the model should automatically create Ids for new cells.
   * Default is true.
   */
  createIds: boolean;
  /**
   * Defines the prefix of new Ids. Default is an empty string.
   */
  prefix: string;
  /**
   * Defines the postfix of new Ids. Default is an empty string.
   */
  postfix: string;
  /**
   * Specifies the next Id to be created. Initial value is 0.
   */
  nextId: number;
  /**
   * Holds the changes for the current transaction. If the transaction is
   * closed then a new object is created for this variable using
   * <createUndoableEdit>.
   */
  currentEdit: any;
  /**
   * Counter for the depth of nested transactions. Each call to <beginUpdate>
   * will increment this number and each call to <endUpdate> will decrement
   * it. When the counter reaches 0, the transaction is closed and the
   * respective events are fired. Initial value is 0.
   */
  updateLevel: number;
  /**
   * True if the program flow is currently inside endUpdate.
   */
  endingUpdate: boolean;
  constructor(root?: any);
  /**
   * Sets a new root using <createRoot>.
   */
  clear(): void;
  /**
   * Returns <createIds>.
   */
  isCreateIds(): boolean;
  /**
   * Sets <createIds>.
   */
  setCreateIds(value: any): void;
  /**
   * Creates a new root cell with a default layer (child 0).
   */
  createRoot(): mxCell;
  /**
   * Returns the <mxCell> for the specified Id or null if no cell can be
   * found for the given Id.
   *
   * @param id - A string representing the Id of the cell.
   */
  getCell(id: string): mxCell;
  /**
   * Returns the cells from the given array where the given filter function
   * returns true.
   */
  filterCells(cells: mxCell[], filter: (cell: mxCell) => boolean): mxCell[];
  /**
   * Returns all descendants of the given cell and the cell itself in an array.
   *
   * @param parent - <mxCell> whose descendants should be returned.
   */
  getDescendants(parent: mxCell): mxCell[];
  /**
   * Visits all cells recursively and applies the specified filter function
   * to each cell. If the function returns true then the cell is added
   * to the resulting array. The parent and result paramters are optional.
   * If parent is not specified then the recursion starts at <root>.
   *
   * The following example extracts all vertices from a given model:
   * @example
   * var filter = function(cell)
   * {
   * 	return model.isVertex(cell);
   * }
   * var vertices = model.filterDescendants(filter);
   *
   * @param filter - JavaScript function that takes an <mxCell> as an argument
   * and returns a boolean.
   * @param parent - Optional <mxCell> that is used as the root of the recursion.
   */
  filterDescendants(filter: (cell: mxCell) => boolean, parent?: mxCell): mxCell[];
  /**
   * Returns the root of the model or the topmost parent of the given cell.
   *
   * @param cell - Optional <mxCell> that specifies the child.
   */
  getRoot(cell?: mxCell): mxCell;
  /**
   * Sets the <root> of the model using <mxRootChange> and adds the change to
   * the current transaction. This resets all datastructures in the model and
   * is the preferred way of clearing an existing model. Returns the new
   * root.
   *
   * @example
   * var root = new mxCell();
   * root.insert(new mxCell());
   * model.setRoot(root);
   *
   * @param root - <mxCell> that specifies the new root.
   */
  setRoot(root: mxCell): mxCell;
  /**
   * Inner callback to change the root of the model and update the internal
   * datastructures, such as <cells> and <nextId>. Returns the previous root.
   *
   * @param root - <mxCell> that specifies the new root.
   */
  rootChanged(root: mxCell): mxCell;
  /**
   * Returns true if the given cell is the root of the model and a non-null
   * value.
   *
   * @param cell - <mxCell> that represents the possible root.
   */
  isRoot(cell: mxCell): boolean;
  /**
   * Returns true if <isRoot> returns true for the parent of the given cell.
   *
   * @param cell - <mxCell> that represents the possible layer.
   */
  isLayer(cell: mxCell): boolean;
  /**
   * Returns true if the given parent is an ancestor of the given child.
   *
   * @param parent - <mxCell> that specifies the parent.
   * @param child - <mxCell> that specifies the child.
   */
  isAncestor(parent: mxCell, child: mxCell): boolean;
  /**
   * Returns true if the model contains the given <mxCell>.
   *
   * @param cell - <mxCell> that specifies the cell.
   */
  contains(cell: mxCell): boolean;
  /**
   * Returns the parent of the given cell.
   *
   * @param cell - <mxCell> whose parent should be returned.
   */
  getParent(cell: mxCell): mxCell;
  /**
   * Adds the specified child to the parent at the given index using
   * <mxChildChange> and adds the change to the current transaction. If no
   * index is specified then the child is appended to the parent's array of
   * children. Returns the inserted child.
   *
   * @param parent - <mxCell> that specifies the parent to contain the child.
   * @param child - <mxCell> that specifies the child to be inserted.
   * @param index - Optional integer that specifies the index of the child.
   */
  add(parent: mxCell, child: mxCell, index?: number): mxCell;
  /**
   * Inner callback to update <cells> when a cell has been added. This
   * implementation resolves collisions by creating new Ids. To change the
   * ID of a cell after it was inserted into the model, use the following
   * code:
   *
   * (code
   * delete model.cells[cell.getId()];
   * cell.setId(newId);
   * model.cells[cell.getId()] = cell;
   * (end)
   *
   * If the change of the ID should be part of the command history, then the
   * cell should be removed from the model and a clone with the new ID should
   * be reinserted into the model instead.
   *
   * @param cell - <mxCell> that specifies the cell that has been added.
   */
  cellAdded(cell: mxCell): void;
  /**
   * Hook method to create an Id for the specified cell. This implementation
   * concatenates <prefix>, id and <postfix> to create the Id and increments
   * <nextId>. The cell is ignored by this implementation, but can be used in
   * overridden methods to prefix the Ids with eg. the cell type.
   *
   * @param cell - <mxCell> to create the Id for.
   */
  createId(cell: mxCell): string;
  /**
   * Updates the parent for all edges that are connected to cell or one of
   * its descendants using <updateEdgeParent>.
   */
  updateEdgeParents(cell: mxCell, root?: mxCell): void;
  /**
   * Returns the absolute, accumulated origin for the children inside the
   * given parent as an <mxPoint>.
   */
  getOrigin(cell: mxCell): mxPoint;
  /**
   * Returns the nearest common ancestor for the specified cells.
   *
   * @param cell1 - <mxCell> that specifies the first cell in the tree.
   * @param cell2 - <mxCell> that specifies the second cell in the tree.
   */
  getNearestCommonAncestor(cell1: mxCell, cell2: mxCell): mxCell;
  /**
   * Removes the specified cell from the model using <mxChildChange> and adds
   * the change to the current transaction. This operation will remove the
   * cell and all of its children from the model. Returns the removed cell.
   *
   * @param cell - <mxCell> that should be removed.
   */
  remove(cell: mxCell): mxCell;
  /**
   * Inner callback to update <cells> when a cell has been removed.
   *
   * @param cell - <mxCell> that specifies the cell that has been removed.
   */
  cellRemoved(cell: mxCell): void;
  /**
   * Inner callback to update the parent of a cell using <mxCell.insert>
   * on the parent and return the previous parent.
   *
   * @param cell - <mxCell> to update the parent for.
   * @param parent - <mxCell> that specifies the new parent of the cell.
   * @param index - Optional integer that defines the index of the child
   * in the parent's child array.
   */
  parentForCellChanged(cell: mxCell, parent: mxCell, index?: number): mxCell;
  /**
   * Returns the number of children in the given cell.
   *
   * @param cell - <mxCell> whose number of children should be returned.
   */
  getChildCount(cell: mxCell): number;
  /**
   * Returns the child of the given <mxCell> at the given index.
   *
   * @param cell - <mxCell> that represents the parent.
   * @param index - Integer that specifies the index of the child to be returned.
   */
  getChildAt(cell: mxCell, index: number): mxCell;
  /**
   * Returns all children of the given <mxCell> as an array of <mxCells>. The
   * return value should be only be read.
   *
   * @param cell - <mxCell> the represents the parent.
   */
  getChildren(cell: mxCell): mxCell[];
  /**
   * Returns the child vertices of the given parent.
   *
   * @param parent - <mxCell> whose child vertices should be returned.
   */
  getChildVertices(parent: mxCell): mxCell[];
  /**
   * Returns the child edges of the given parent.
   *
   * @param parent - <mxCell> whose child edges should be returned.
   */
  getChildEdges(parent: mxCell): mxCell[];
  /**
   * Returns the children of the given cell that are vertices and/or edges
   * depending on the arguments.
   *
   * @param parent - <mxCell> the represents the parent.
   * @param vertices - Boolean indicating if child vertices should be returned.
   * Default is false.
   * @param edges - Boolean indicating if child edges should be returned.
   * Default is false.
   */
  getChildCells(parent: mxCell, vertices?: boolean, edges?: boolean): mxCell[];
  /**
   * Returns the source or target <mxCell> of the given edge depending on the
   * value of the boolean parameter.
   *
   * @param edge - <mxCell> that specifies the edge.
   * @param isSource - Boolean indicating which end of the edge should be returned.
   */
  getTerminal(edge: mxCell, isSource: boolean): mxCell;
  /**
   * Sets the source or target terminal of the given <mxCell> using
   * <mxTerminalChange> and adds the change to the current transaction.
   * This implementation updates the parent of the edge using <updateEdgeParent>
   * if required.
   *
   * @param edge - <mxCell> that specifies the edge.
   * @param terminal - <mxCell> that specifies the new terminal.
   * @param isSource - Boolean indicating if the terminal is the new source or
   * target terminal of the edge.
   */
  setTerminal(edge: mxCell, terminal: mxCell, isSource: boolean): mxCell;
  /**
   * Sets the source and target <mxCell> of the given <mxCell> in a single
   * transaction using <setTerminal> for each end of the edge.
   *
   * @param edge - <mxCell> that specifies the edge.
   * @param source - <mxCell> that specifies the new source terminal.
   * @param target - <mxCell> that specifies the new target terminal.
   */
  setTerminals(edge: mxCell, source: mxCell, target: mxCell): void;
  /**
   * Inner helper function to update the terminal of the edge using
   * <mxCell.insertEdge> and return the previous terminal.
   *
   * @param edge - <mxCell> that specifies the edge to be updated.
   * @param terminal - <mxCell> that specifies the new terminal.
   * @param isSource - Boolean indicating if the terminal is the new source or
   * target terminal of the edge.
   */
  terminalForCellChanged(edge: mxCell, terminal: mxCell, isSource: boolean): mxCell;
  /**
   * Returns the number of distinct edges connected to the given cell.
   *
   * @param cell - <mxCell> that represents the vertex.
   */
  getEdgeCount(cell: mxCell): number;
  /**
   * Returns the edge of cell at the given index.
   *
   * @param cell - <mxCell> that specifies the vertex.
   * @param index - Integer that specifies the index of the edge
   * to return.
   */
  getEdgeAt(cell: mxCell, index: number): mxCell;
  /**
   * Returns the number of incoming or outgoing edges, ignoring the given
   * edge.
   *
   * @param cell - <mxCell> whose edge count should be returned.
   * @param outgoing - Boolean that specifies if the number of outgoing or
   * incoming edges should be returned.
   * @param ignoredEdge - <mxCell> that represents an edge to be ignored.
   */
  getDirectedEdgeCount(cell: mxCell, outgoing: boolean, ignoredEdge?: mxCell): number;
  /**
   * Returns all edges of the given cell without loops.
   *
   * @param cell - <mxCell> whose edges should be returned.
   */
  getConnections(cell: mxCell): mxCell[];
  /**
   * Returns the incoming edges of the given cell without loops.
   *
   * @param cell - <mxCell> whose incoming edges should be returned.
   */
  getIncomingEdges(cell: mxCell): mxCell[];
  /**
   * Returns the outgoing edges of the given cell without loops.
   *
   * @param cell - <mxCell> whose outgoing edges should be returned.
   */
  getOutgoingEdges(cell: mxCell): mxCell[];
  /**
   * Returns all distinct edges connected to this cell as a new array of
   * <mxCells>. If at least one of incoming or outgoing is true, then loops
   * are ignored, otherwise if both are false, then all edges connected to
   * the given cell are returned including loops.
   *
   * @param cell - <mxCell> that specifies the cell.
   * @param incoming - Optional boolean that specifies if incoming edges should be
   * returned. Default is true.
   * @param outgoing - Optional boolean that specifies if outgoing edges should be
   * returned. Default is true.
   * @param includeLoops - Optional boolean that specifies if loops should be returned.
   * Default is true.
   */
  getEdges(cell: mxCell, incoming?: boolean, outgoing?: boolean, includeLoops?: boolean): mxCell[];
  /**
   * Returns all edges between the given source and target pair. If directed
   * is true, then only edges from the source to the target are returned,
   * otherwise, all edges between the two cells are returned.
   *
   * @param source - <mxCell> that defines the source terminal of the edge to be
   * returned.
   * @param target - <mxCell> that defines the target terminal of the edge to be
   * returned.
   * @param directed - Optional boolean that specifies if the direction of the
   * edge should be taken into account. Default is false.
   */
  getEdgesBetween(source: mxCell, target: mxCell, directed?: boolean): mxCell[];
  /**
   * Returns all opposite vertices wrt terminal for the given edges, only
   * returning sources and/or targets as specified. The result is returned
   * as an array of <mxCells>.
   *
   * @param edges - Array of <mxCells> that contain the edges to be examined.
   * @param terminal - <mxCell> that specifies the known end of the edges.
   * @param sources - Boolean that specifies if source terminals should be contained
   * in the result. Default is true.
   * @param targets - Boolean that specifies if target terminals should be contained
   * in the result. Default is true.
   */
  getOpposites(edges: mxCell[], terminal: mxCell, sources?: boolean, targets?: boolean): mxCell[];
  /**
   * Returns the topmost cells of the hierarchy in an array that contains no
   * descendants for each <mxCell> that it contains. Duplicates should be
   * removed in the cells array to improve performance.
   *
   * @param cells - Array of <mxCells> whose topmost ancestors should be returned.
   */
  getTopmostCells(cells: mxCell[]): mxCell[];
  /**
   * Returns true if the given cell is a vertex.
   *
   * @param cell - <mxCell> that represents the possible vertex.
   */
  isVertex(cell: mxCell): boolean;
  /**
   * Returns true if the given cell is an edge.
   *
   * @param cell - <mxCell> that represents the possible edge.
   */
  isEdge(cell: mxCell): boolean;
  /**
   * Returns true if the given <mxCell> is connectable. If <edgesConnectable>
   * is false, then this function returns false for all edges else it returns
   * the return value of <mxCell.isConnectable>.
   *
   * @param cell - <mxCell> whose connectable state should be returned.
   */
  isConnectable(cell: mxCell): boolean;
  /**
   * Returns the user object of the given <mxCell> using <mxCell.getValue>.
   *
   * @param cell - <mxCell> whose user object should be returned.
   */
  getValue(cell: mxCell): Value;
  /**
   * Sets the user object of then given <mxCell> using <mxValueChange>
   * and adds the change to the current transaction.
   *
   * @param cell - <mxCell> whose user object should be changed.
   * @param value - Object that defines the new user object.
   */
  setValue(cell: mxCell, value: object): object;
  /**
   * Returns the <mxGeometry> of the given <mxCell>.
   *
   * @param cell - <mxCell> whose geometry should be returned.
   */
  getGeometry(cell: mxCell): mxGeometry;
  /**
   * Sets the <mxGeometry> of the given <mxCell>. The actual update
   * of the cell is carried out in <geometryForCellChanged>. The
   * <mxGeometryChange> action is used to encapsulate the change.
   *
   * @param cell - <mxCell> whose geometry should be changed.
   * @param geometry - <mxGeometry> that defines the new geometry.
   */
  setGeometry(cell: mxCell, geometry: mxGeometry): mxGeometry;
  /**
   * Returns the style of the given <mxCell>.
   *
   * @param cell - <mxCell> whose style should be returned.
   */
  getStyle(cell: mxCell): string;
  /**
   * Sets the style of the given <mxCell> using <mxStyleChange> and
   * adds the change to the current transaction.
   *
   * @param cell - <mxCell> whose style should be changed.
   * @param style - String of the form [stylename;|key=value;] to specify
   * the new cell style.
   */
  setStyle(cell: mxCell, style: string): string;
  /**
   * Inner callback to update the style of the given <mxCell>
   * using <mxCell.setStyle> and return the previous style.
   *
   * @param cell - <mxCell> that specifies the cell to be updated.
   * @param style - String of the form [stylename;|key=value;] to specify
   * the new cell style.
   */
  styleForCellChanged(cell: mxCell, style: string): string;
  /**
   * Returns true if the given <mxCell> is collapsed.
   *
   * @param cell - <mxCell> whose collapsed state should be returned.
   */
  isCollapsed(cell: mxCell): boolean;
  /**
   * Sets the collapsed state of the given <mxCell> using <mxCollapseChange>
   * and adds the change to the current transaction.
   *
   * @param cell - <mxCell> whose collapsed state should be changed.
   * @param collapsed - Boolean that specifies the new collpased state.
   */
  setCollapsed(cell: mxCell, collapsed: boolean): boolean;
  /**
   * Inner callback to update the collapsed state of the
   * given <mxCell> using <mxCell.setCollapsed> and return
   * the previous collapsed state.
   *
   * @param cell - <mxCell> that specifies the cell to be updated.
   * @param collapsed - Boolean that specifies the new collpased state.
   */
  collapsedStateForCellChanged(cell: mxCell, collapsed: boolean): boolean;
  /**
   * Returns true if the given <mxCell> is visible.
   *
   * @param cell - <mxCell> whose visible state should be returned.
   */
  isVisible(cell: mxCell): boolean;
  /**
   * Sets the visible state of the given <mxCell> using <mxVisibleChange> and
   * adds the change to the current transaction.
   *
   * @param cell - <mxCell> whose visible state should be changed.
   * @param visible - Boolean that specifies the new visible state.
   */
  setVisible(cell: mxCell, visible: boolean): boolean;
  /**
   * Inner callback to update the visible state of the
   * given <mxCell> using <mxCell.setCollapsed> and return
   * the previous visible state.
   *
   * @param cell - <mxCell> that specifies the cell to be updated.
   * @param visible - Boolean that specifies the new visible state.
   */
  visibleStateForCellChanged(cell: mxCell, visible: boolean): boolean;
  /**
   * Executes the given edit and fires events if required. The edit object
   * requires an execute function which is invoked. The edit is added to the
   * <currentEdit> between <beginUpdate> and <endUpdate> calls, so that
   * events will be fired if this execute is an individual transaction, that
   * is, if no previous <beginUpdate> calls have been made without calling
   * <endUpdate>. This implementation fires an <execute> event before
   * executing the given change.
   *
   * Parameters:
   *
   * change - Object that described the change.
   */
  execute(change: any): void;
  /**
   * Increments the <updateLevel> by one. The event notification
   * is queued until <updateLevel> reaches 0 by use of
   * <endUpdate>.
   *
   * All changes on <mxGraphModel> are transactional,
   * that is, they are executed in a single undoable change
   * on the model (without transaction isolation).
   * Therefore, if you want to combine any
   * number of changes into a single undoable change,
   * you should group any two or more API calls that
   * modify the graph model between <beginUpdate>
   * and <endUpdate> calls as shown here:
   *
   * (code)
   * var model = graph.getModel();
   * var parent = graph.getDefaultParent();
   * var index = model.getChildCount(parent);
   * model.beginUpdate();
   * try
   * {
   *   model.add(parent, v1, index);
   *   model.add(parent, v2, index+1);
   * }
   * finally
   * {
   *   model.endUpdate();
   * }
   * (end)
   *
   * Of course there is a shortcut for appending a
   * sequence of cells into the default parent:
   *
   * (code)
   * graph.addCells([v1, v2]).
   * (end)
   */
  beginUpdate(): void;
  /**
   * Decrements the <updateLevel> by one and fires an <undo>
   * event if the <updateLevel> reaches 0. This function
   * indirectly fires a <change> event by invoking the notify
   * function on the <currentEdit> und then creates a new
   * <currentEdit> using <createUndoableEdit>.
   *
   * The <undo> event is fired only once per edit, whereas
   * the <change> event is fired whenever the notify
   * function is invoked, that is, on undo and redo of
   * the edit.
   */
  endUpdate(): void;
  /**
   * Creates a new <mxUndoableEdit> that implements the
   * notify function to fire a <change> and <notify> event
   * through the <mxUndoableEdit>'s source.
   */
  createUndoableEdit(): mxUndoableEdit;
  /**
   * Merges the children of the given cell into the given target cell inside
   * this model. All cells are cloned unless there is a corresponding cell in
   * the model with the same id, in which case the source cell is ignored and
   * all edges are connected to the corresponding cell in this model. Edges
   * are considered to have no identity and are always cloned unless the
   * cloneAllEdges flag is set to false, in which case edges with the same
   * id in the target model are reconnected to reflect the terminals of the
   * source edges.
   */
  mergeChildren(from: any, to: any, cloneAllEdges: any): void;
  /**
   * Clones the children of the source cell into the given target cell in
   * this model and adds an entry to the mapping that maps from the source
   * cell to the target cell with the same id or the clone of the source cell
   * that was inserted into this model.
   */
  mergeChildrenImpl(from: any, to: any, cloneAllEdges: any, mapping: any): void;
  /**
   * Returns an array that represents the set (no duplicates) of all parents
   * for the given array of cells.
   *
   * Parameters:
   *
   * cells - Array of cells whose parents should be returned.
   */
  getParents(cells: any): any[];
  /**
   * Returns a deep clone of the given <mxCell> (including
   * the children) which is created using <cloneCells>.
   *
   * Parameters:
   *
   * cell - <mxCell> to be cloned.
   */
  cloneCell(cell: any): any;
  /**
   * Returns an array of clones for the given array of <mxCells>.
   * Depending on the value of includeChildren, a deep clone is created for
   * each cell. Connections are restored based if the corresponding
   * cell is contained in the passed in array.
   *
   * Parameters:
   *
   * cells - Array of <mxCell> to be cloned.
   * includeChildren - Boolean indicating if the cells should be cloned
   * with all descendants.
   * mapping - Optional mapping for existing clones.
   */
  cloneCells(cells: mxCell[], includeChildren: boolean, mapping?: any): any[];
  /**
   * Inner helper method for cloning cells recursively.
   */
  cloneCellImpl(cell: any, mapping: any, includeChildren: any): any;
  /**
   * Hook for cloning the cell. This returns cell.clone() or
   * any possible exceptions.
   */
  cellCloned(cell: any): any;
  /**
   * Inner helper method for restoring the connections in
   * a network of cloned cells.
   */
  restoreClone(clone: any, cell: any, mapping: any): void;
}
