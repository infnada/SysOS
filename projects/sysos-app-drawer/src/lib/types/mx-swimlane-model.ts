/**
 * Internal model of a hierarchical graph. This model stores nodes and edges
 * equivalent to the real graph nodes and edges, but also stores the rank of the
 * cells, the order within the ranks and the new candidate locations of cells.
 * The internal model also reverses edge direction were appropriate , ignores
 * self-loop and groups parallels together under one edge object.
 *
 * Constructor: mxSwimlaneModel
 *
 * Creates an internal ordered graph model using the vertices passed in. If
 * there are any, leftward edge need to be inverted in the internal model
 *
 * Arguments:
 *
 * graph - the facade describing the graph to be operated on
 * vertices - the vertices for this hierarchy
 * ordered - whether or not the vertices are already ordered
 * deterministic - whether or not this layout should be deterministic on each
 * tightenToSource - whether or not to tighten vertices towards the sources
 * scanRanksFromSinks - Whether rank assignment is from the sinks or sources.
 * usage
 */
export interface mxSwimlaneModel {
  (layout: any, vertices: any, roots: any, parent: any, tightenToSource: any): void;
  /**
   * Creates all edges in the internal model
   *
   * Parameters:
   *
   * layout - Reference to the <mxHierarchicalLayout> algorithm.
   * vertices - Array of <mxCells> that represent the vertices whom are to
   * have an internal representation created.
   * internalVertices - The array of <mxGraphHierarchyNodes> to have their
   * information filled in using the real vertices.
   */
  createInternalCells(layout: any, vertices: any, internalVertices: any): void;
  /**
   * Basic determination of minimum layer ranking by working from from sources
   * or sinks and working through each node in the relevant edge direction.
   * Starting at the sinks is basically a longest path layering algorithm.
   */
  initialRank(): void;
  /**
   * Performs a depth first search on the internal hierarchy model. This dfs
   * extends the default version by keeping track of chains within groups.
   * Any cycles should be removed prior to running, but previously seen cells
   * are ignored.
   *
   * Parameters:
   *
   * parent - the parent internal node of the current internal node
   * root - the current internal node
   * connectingEdge - the internal edge connecting the internal node and the parent
   * internal node, if any
   * seen - a set of all nodes seen by this dfs
   * chainCount - the number of edges in the chain of vertices going through
   * the current swimlane
   */
  maxChainDfs(parent: any, root: any, connectingEdge: any, seen: any, chainCount: any): void;
  /**
   * Fixes the layer assignments to the values stored in the nodes. Also needs
   * to create dummy nodes for edges that cross layers.
   */
  fixRanks(): void;
  /**
   * A depth first search through the internal heirarchy model.
   *
   * Parameters:
   *
   * visitor - The visitor function pattern to be called for each node.
   * trackAncestors - Whether or not the search is to keep track all nodes
   * directly above this one in the search path.
   */
  visit(visitor: any, dfsRoots: any, trackAncestors: any, seenNodes: any): void;
  /**
   * Performs a depth first search on the internal hierarchy model
   *
   * Parameters:
   *
   * parent - the parent internal node of the current internal node
   * root - the current internal node
   * connectingEdge - the internal edge connecting the internal node and the parent
   * internal node, if any
   * visitor - the visitor pattern to be called for each node
   * seen - a set of all nodes seen by this dfs a set of all of the
   * ancestor node of the current node
   * layer - the layer on the dfs tree ( not the same as the model ranks )
   */
  dfs(parent: any, root: any, connectingEdge: any, visitor: any, seen: any, layer: any): void;
  /**
   * Performs a depth first search on the internal hierarchy model. This dfs
   * extends the default version by keeping track of cells ancestors, but it
   * should be only used when necessary because of it can be computationally
   * intensive for deep searches.
   *
   * Parameters:
   *
   * parent - the parent internal node of the current internal node
   * root - the current internal node
   * connectingEdge - the internal edge connecting the internal node and the parent
   * internal node, if any
   * visitor - the visitor pattern to be called for each node
   * seen - a set of all nodes seen by this dfs
   * ancestors - the parent hash code
   * childHash - the new hash code for this node
   * layer - the layer on the dfs tree ( not the same as the model ranks )
   */
  extendedDfs(parent: any, root: any, connectingEdge: any, visitor: any, seen: any, ancestors: any, childHash: any, layer: any): void;
}
