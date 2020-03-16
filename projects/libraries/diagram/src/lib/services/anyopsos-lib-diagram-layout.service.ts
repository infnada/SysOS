import {Injectable} from '@angular/core';

import stringify from 'json-stable-stringify';
import {graphlib, layout as dagreLayout} from 'dagre';

import {
  DEFAULT_MARGINS,
  EDGE_ID_SEPARATOR,
  EDGE_WAYPOINTS_CAP,
  NODE_CENTERS_SEPARATION_FACTOR,
  NODE_SEPARATION_FACTOR,
  NODE_SIZE_FACTOR,
  RANK_SEPARATION_FACTOR
} from '../anyopsos-lib-diagram.constants';

import {LayoutOptions} from '../types/layout-options';
import {LayoutEdge} from '../types/layout-edge';
import {LayoutNode} from '../types/layout-node';
import {Layout} from '../types/layout';
import {TopologyOption} from '../types/topology-option';
import {TopologyCache} from '../types/topology-cache';
import {NodeCache} from '../types/node-cache';


const topologyCaches: TopologyCache[] = [];

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibDiagramLayoutService {

  constructor() {
    this.doLayout = this.doLayout.bind(this);
  }

  private static buildTopologyCacheId(topologyId: string, topologyOptions: TopologyOption[]): string {
    let id: string = '';

    if (topologyId) {
      id = topologyId;
      if (topologyOptions) {
        id += stringify(topologyOptions);
      }
    }

    return id;
  }

  private updateNodeDegrees(nodes: LayoutNode[], edges: LayoutEdge[]): LayoutNode[] {
    return nodes.map((node) => {

      const nodeId: string = node.id;
      node.degree = edges.reduce((acc, edge) => edge.source === nodeId || edge.target === nodeId ? ++acc : acc, 0);

      return node;
    });
  }

  private uniformSelect(array: any[], size: number): any[] {
    if (size > array.length) return array;

    return [...Array(size).keys()].map(index => array[parseInt(String(index * (array.length / (size - (1 - 1e-9)))), 10)]);
  }

  private static euclideanDistance(pointA: LayoutNode, pointB: LayoutNode): number {
    const dx = pointA.x - pointB.x;
    const dy = pointA.y - pointB.y;

    return Math.sqrt((dx * dx) + (dy * dy));
  }

  private minEuclideanDistanceBetweenPoints(points: LayoutNode[]): number {
    let minDistance = Infinity;
    points.forEach((pointA) => {
      points.forEach((pointB) => {

        const distance: number = AnyOpsOSLibDiagramLayoutService.euclideanDistance(pointA, pointB);
        if (pointA.id !== pointB.id && distance < minDistance) minDistance = distance;

      });
    });

    return minDistance;
  }

  private static graphNodeId(id: string): string {
    return id.replace('.', '<DOT>');
  }

  private static fromGraphNodeId(encodedId: string): string {
    return encodedId.replace('<DOT>', '.');
  }

  // Adds some additional waypoints to the edge to make sure the it connects the node
  // centers and that the edge enters the target node relatively straight so that the
  // arrow is drawn correctly. The total number of waypoints is capped to EDGE_WAYPOINTS_CAP.
  private correctedEdgePath(waypoints: { x: number; y: number; }[], source: LayoutNode, target: LayoutNode): { x: number; y: number; }[] {
    // Get the relevant waypoints that will be added/replicated.
    const sourcePoint: { x: number; y: number; } = {x: source.x, y: source.y};
    const targetPoint: { x: number; y: number; } = {x: target.x, y: target.y};
    const entrancePoint: { x: number; y: number; } = waypoints.slice(-1).pop();

    if (target !== source) {
      // The strategy for the non-loop edges is the following:
      //   * Uniformly select at most CAP - 4 of the central waypoints ignoring the target node
      //     entrance point. Such a selection will ensure that both the source node exit point and
      //     the point before the target node entrance point are taken as boundaries of the interval.
      //   * Now manually add those 4 points that we always want to have included in the edge path -
      //     centers of source/target nodes and twice the target node entrance point to ensure the
      //     edge path actually goes through it and thus doesn't miss the arrow element.
      //   * In the end, what matters for the arrow is that the last 4 points of the array are always
      //     fixed regardless of the total number of waypoints. That way we ensure the arrow is drawn
      //     correctly, but also that the edge path enters the target node smoothly.
      waypoints = this.uniformSelect(waypoints.slice(1, -1), EDGE_WAYPOINTS_CAP - 4);
      waypoints.unshift(sourcePoint);
      waypoints.push(entrancePoint);
      waypoints.push(entrancePoint);
      waypoints.push(targetPoint);
    } else {
      // For loops we simply set the endpoints at the center of source/target node to
      // make them smoother and, of course, we cap the total number of waypoints.
      waypoints = this.uniformSelect(waypoints, EDGE_WAYPOINTS_CAP);
      waypoints[0] = sourcePoint;
      waypoints[waypoints.length - 1] =targetPoint;
    }

    return waypoints;
  }

  /**
   * Add coordinates to 0-degree nodes using a square layout
   * Depending on the previous layout run's graph aspect ratio, the square will be
   * placed on the right side or below the graph.
   * @param layout Layout with nodes and edges
   * @param options   Options with node distances
   * @return modified layout
   */
  private layoutSingleNodes(layout: Layout, options: LayoutOptions): Layout {
    const result: Layout = Object.assign({}, layout);

    const margins: { left: number; top: number; } = options.margins || DEFAULT_MARGINS;
    const rankSep: number = RANK_SEPARATION_FACTOR / 2; // dagre splits it in half
    const nodeSep: number = NODE_SEPARATION_FACTOR;
    const nodeWidth: number = NODE_SIZE_FACTOR;
    const nodeHeight: number = NODE_SIZE_FACTOR;
    const graphHeight: number = layout.graphHeight || layout.height;
    const graphWidth: number = layout.graphWidth || layout.width;
    const aspectRatio: number = graphHeight ? graphWidth / graphHeight : 1;

    let {nodes} = layout;

    // 0-degree nodes
    const singleNodes: LayoutNode[] = nodes.filter(node => node.degree === 0);

    if (singleNodes.length) {
      let offsetX;
      let offsetY;
      const nonSingleNodes = nodes.filter(node => node.degree !== 0);

      if (nonSingleNodes.length > 0) {
        if (aspectRatio < 1) {
          offsetX = Math.max(...nonSingleNodes.map(n => n.x), 0);
          offsetY = Math.min(...nonSingleNodes.map(n => n.y), 0);

          if (offsetX) offsetX += nodeWidth + nodeSep;
        } else {
          offsetX = Math.min(...nonSingleNodes.map(n => n.x), 0);
          offsetY = Math.max(...nonSingleNodes.map(n => n.y), 0);

          if (offsetY) offsetY += nodeHeight + rankSep;
        }
      }

      // default margins
      offsetX = offsetX || (margins.left + nodeWidth) / 2;
      offsetY = offsetY || (margins.top + nodeHeight) / 2;

      const columns = Math.ceil(Math.sqrt(singleNodes.length));
      let row = 0;
      let col = 0;
      let singleX;
      let singleY;

      nodes = nodes.sort((a, b) => {
        if (a.rank < b.rank) return -1;
        if (a.rank > b.rank) return 1;
        return 0;
      }).map((node) => {
        if (singleNodes.some(n => n.id === node.id)) {
          if (col === columns) {
            col = 0;
            row += 1;
          }

          singleX = (col * (nodeSep + nodeWidth)) + offsetX;
          singleY = (row * (rankSep + nodeHeight)) + offsetY;
          col += 1;

          return {...node, x: singleX, y: singleY};
        }
        return node;
      });

      // adjust layout dimensions if graph is now bigger
      result.width = Math.max(layout.width, singleX + (nodeWidth / 2) + nodeSep);
      result.height = Math.max(layout.height, singleY + (nodeHeight / 2) + rankSep);
      result.nodes = nodes;
    }

    return result;
  }

  /**
   * Layout engine runner
   * After the layout engine run nodes and edges have x-y-coordinates. Engine is
   * not run if the number of nodes is bigger than `MAX_NODES`.
   * @param graph dagre graph instance
   * @param imNodes new node set
   * @param imEdges new edge set
   * @param opts Options with nodes layout
   * @return Layout with nodes, edges, dimensions
   */
  private runLayoutEngine(graph: graphlib.Graph, imNodes: LayoutNode[], imEdges: LayoutEdge[], opts: LayoutOptions): Layout {
    let nodes: LayoutNode[] = imNodes;
    let edges: LayoutEdge[] = imEdges;

    const rankSep: number = RANK_SEPARATION_FACTOR;
    const nodeSep: number = NODE_SEPARATION_FACTOR;
    const nodeWidth: number = NODE_SIZE_FACTOR;
    const nodeHeight: number = NODE_SIZE_FACTOR;

    // configure node margins
    graph.setGraph({
      nodesep: nodeSep,
      ranksep: rankSep
    });

    // add nodes to the graph if not already there
    nodes.forEach((node) => {
      const gNodeId: string = AnyOpsOSLibDiagramLayoutService.graphNodeId(node.id);

      if (!graph.hasNode(gNodeId)) {
        graph.setNode(gNodeId, {
          height: nodeHeight,
          width: nodeWidth
        });
      }
    });

    // remove nodes that are no longer there or are 0-degree nodes
    graph.nodes().forEach((gNodeId) => {
      const nodeId: string = AnyOpsOSLibDiagramLayoutService.fromGraphNodeId(gNodeId);
      if (!nodes.some(n => n.id === nodeId) || nodes.find(n => n.id === nodeId).degree === 0) {
        graph.removeNode(gNodeId);
      }
    });

    // add edges to the graph if not already there
    edges.forEach((edge) => {
      const s: string = AnyOpsOSLibDiagramLayoutService.graphNodeId(edge.source);
      const t: string = AnyOpsOSLibDiagramLayoutService.graphNodeId(edge.target);

      if (!graph.hasEdge(s, t)) {
        const virtualNodes: 1 | 0 = s === t ? 1 : 0;
        graph.setEdge(s, t, {id: edge.id, minlen: virtualNodes});
      }
    });

    // remove edges that are no longer there
    graph.edges().forEach((edgeObj) => {
      const edge = [AnyOpsOSLibDiagramLayoutService.fromGraphNodeId(edgeObj.v), AnyOpsOSLibDiagramLayoutService.fromGraphNodeId(edgeObj.w)];
      const edgeId = edge.join(EDGE_ID_SEPARATOR);

      if (!edges.some(e => e.id === edgeId)) {
        graph.removeEdge(edgeObj.v, edgeObj.w);
      }
    });

    // @ts-ignore
    dagreLayout(graph, {debugTiming: false});

    // apply coordinates to nodes and edges
    graph.nodes().forEach((gNodeId) => {
      const graphNode = graph.node(gNodeId);
      const nodeId: string = AnyOpsOSLibDiagramLayoutService.fromGraphNodeId(gNodeId);

      nodes.find(n => n.id === nodeId).x = graphNode.x;
      nodes.find(n => n.id === nodeId).y = graphNode.y;
    });

    graph.edges().forEach((graphEdge) => {
      const graphEdgeMeta = graph.edge(graphEdge);
      const edge: LayoutEdge = edges.find(e => e.id === graphEdgeMeta.id);

      const source: LayoutNode = nodes.find(n => n.id === AnyOpsOSLibDiagramLayoutService.fromGraphNodeId(edge.source));
      const target: LayoutNode = nodes.find(n => n.id === AnyOpsOSLibDiagramLayoutService.fromGraphNodeId(edge.target));
      edges.find(e => e.id === graphEdgeMeta.id).points = this.correctedEdgePath(graphEdgeMeta.points, source, target);
    });

    const {width, height} = graph.graph();

    let layout: Layout = {
      nodes,
      edges,
      graphHeight: height,
      graphWidth: width,
      height,
      width
    };

    // layout the single nodes
    layout = this.layoutSingleNodes(layout, opts);

    // return object with the width and height of layout
    return layout;
  }

  /**
   * Adds `points` array to edge based on location of source and target
   * @param edge           new edge
   * @param nodeCache      all nodes
   * @returns modified edge
   */
  private setSimpleEdgePoints(edge: LayoutEdge, nodeCache: NodeCache[]): LayoutEdge {
    const source: NodeCache = nodeCache.find(n => n.id === edge.source);
    const target: NodeCache = nodeCache.find(n => n.id === edge.target);

    edge.points = [
      {x: source.x, y: source.y},
      {x: target.x, y: target.y}
    ];

    return edge;
  }

  /**
   * Layout nodes that have rank that already exists.
   * Relies on only nodes being added that have a connection to an existing node
   * while having a rank of an existing node. They will be laid out in the same
   * line as the latter, with a direct connection between the existing and the new node.
   * @param layout    Layout with nodes and edges
   * @param nodeCache    previous nodes
   * @return new layout object
   */
  private doLayoutNewNodesOfExistingRank(layout: Layout, nodeCache: NodeCache[]): Layout {
    const result: Layout = Object.assign({}, layout);
    const nodeSep: number = NODE_SEPARATION_FACTOR;
    const nodeWidth: number = NODE_SIZE_FACTOR;

    // determine new nodes
    const oldNodes: string[] = nodeCache.map(n => n.id);
    const newNodes: string[] = layout.nodes.filter(n => n.degree > 0).filter(n => !oldNodes.includes(n.id)).map(n => n.id);

    result.nodes = layout.nodes.map((n) => {

      if (newNodes.includes(n.id)) {
        const nodesSameRank: NodeCache[] = nodeCache.filter(nn => nn.rank === n.rank);

        if (nodesSameRank.length > 0) {
          const y: number = nodesSameRank[0].y;
          const x: number = Math.max(...nodesSameRank.map(nn => nn.x), 0) + nodeSep + nodeWidth;
          return {...n, x, y}
        }

        return n;
      }

      return n;
    });

    result.edges = layout.edges.map((edge) => {
      if (!edge.points) return this.setSimpleEdgePoints(edge, layout.nodes);

      return edge;
    });

    return result;
  }

  /**
   * Determine if nodes were added between node sets
   * @param nodes     new Map of nodes
   * @param cache     old Map of nodes
   * @return True if nodes had node ids that are not in cache
   */
  private static hasUnseenNodes(nodes: LayoutNode[], cache: NodeCache[]): boolean {
    const cacheIds: string[] = cache.map(n => n.id);
    return nodes.length > cache.length || !nodes.map(n => n.id).every(id => cacheIds.includes(id));
  }

  /**
   * Determine if all new nodes are 0-degree nodes
   * Requires cached nodes (implies a previous layout run).
   * @param nodes     new Map of nodes
   * @param cache     old Map of nodes
   * @return True if all new nodes are 0-nodes
   */
  private hasNewSingleNode(nodes: LayoutNode[], cache: NodeCache[]) {
    const oldNodes: string[] = cache.map(n => n.id);
    const newNodes: string[] = nodes.filter(n => !oldNodes.includes(n.id)).map(n => n.id);

    const hasNewSingleNodes: boolean = newNodes.every(id => nodes.find(n => n.id === id).degree === 0);

    return oldNodes.length > 0 && hasNewSingleNodes;
  }

  /**
   * Determine if all new nodes are of existing ranks
   * Requires cached nodes (implies a previous layout run).
   * @param nodes     new Map of nodes
   * @param edges     new Map of edges
   * @param cache     old Map of nodes
   * @return True if all new nodes have a rank that already exists
   */
  private hasNewNodesOfExistingRank(nodes: LayoutNode[], edges: LayoutEdge[], cache: NodeCache[]): boolean {
    const oldNodes: string[] = cache.map(n => n.id);
    const newNodes: string[] = nodes.filter(n => !oldNodes.includes(n.id)).map(n => n.id);

    // if new there are edges that connect 2 new nodes, need a full layout
    const bothNodesNew: boolean = edges.some(edge => newNodes.includes(edge.source) && newNodes.includes(edge.target));

    if (bothNodesNew) return false;

    const oldRanks: string[] = cache.filter(n => n.rank).map(n => n.rank);

    const hasNewNodesOfExistingRankOrSingle: boolean = newNodes.every(id => nodes.find(n => n.id === id).degree === 0 || oldRanks.includes(nodes.find(n => n.id === id).rank));

    return oldNodes.length > 0 && hasNewNodesOfExistingRankOrSingle;
  }

  /**
   * Determine if edge has same endpoints in new nodes as well as in the nodeCache
   * @param cachedEdge      Edge with source and target
   * @param nodes     new node set
   * @return True if old and new endpoints have same coordinates
   */
  private hasSameEndpoints(cachedEdge: LayoutEdge, nodes: LayoutNode[]): boolean {
    const oldPoints: { x: number; y:number; }[] = cachedEdge.points;
    const oldSourcePoint: { x: number; y:number; } = oldPoints[0];
    const oldTargetPoint: { x: number; y:number; } = oldPoints.slice(-1).pop();
    const newSource: LayoutNode = nodes.find(n => n.id === cachedEdge.source);
    const newTarget: LayoutNode = nodes.find(n => n.id === cachedEdge.target);

    return (oldSourcePoint && oldTargetPoint && newSource && newTarget
      && oldSourcePoint.x === newSource.x
      && oldSourcePoint.y === newSource.y
      && oldTargetPoint.x === newTarget.x
      && oldTargetPoint.y === newTarget.y);
  }

  /**
   * Clones a previous layout
   * @param layout Layout object
   * @param nodes  new nodes
   * @param edges  new edges
   * @return layout clone
   */
  private static cloneLayout(layout: Layout, nodes: LayoutNode[], edges: LayoutEdge[]): Layout {
    return Object.assign({}, layout, {edges, nodes});
  }

  /**
   * Copies node properties from previous layout runs to new nodes.
   * This assumes the cache has data for all new nodes.
   * @param layout Layout
   * @param nodeCache  cache of all old nodes
   * @param edgeCache  cache of all old edges
   * @return modified layout
   */
  private copyLayoutProperties(layout: Layout, nodeCache: NodeCache[], edgeCache: LayoutEdge[]): Layout {
    const result: Layout = Object.assign({}, layout);

    result.nodes = layout.nodes.map(node => (nodeCache.some(n => n.id === node.id) ? {...node, ...nodeCache.find(n => n.id === node.id)} : node));
    result.edges = layout.edges.map((edge) => {

      if (edgeCache.some(e => e.id === edge.id) && this.hasSameEndpoints(edgeCache.find(e => e.id === edge.id), result.nodes)) {
        return {...edge, ...edgeCache.find(e => e.id === edge.id)};
      }

      if (nodeCache.some(n => n.id === edge.source) && nodeCache.some(n => n.id === edge.target)) {
        return this.setSimpleEdgePoints(edge, nodeCache);
      }

      return edge;
    });

    return result;
  }

  /**
   * Layout of nodes and edges
   * If a previous layout was given and not too much changed, the previous layout
   * is changed and returned. Otherwise does a new layout engine run.
   * @param immNodes All nodes
   * @param immEdges All edges
   * @param options  width, height, margins, etc...
   * @return graph object with nodes, edges, dimensions
   */
  doLayout(immNodes: LayoutNode[], immEdges: LayoutEdge[], options?: LayoutOptions) {

    console.log('doLayout');
    const cacheId: string = AnyOpsOSLibDiagramLayoutService.buildTopologyCacheId(options?.topologyId, options?.topologyOptions);

    // one engine and node and edge caches per topology, to keep renderings similar
    if (options?.noCache || !topologyCaches.find(c => c.cacheId === cacheId)) {
      topologyCaches.push({
        cacheId,
        edgeCache: [],
        graph: new graphlib.Graph({}),
        nodeCache: []
      });
    }

    const cache: TopologyCache = topologyCaches.find(c => c.cacheId === cacheId);
    const cachedLayout: Layout = options.cachedLayout || cache.cachedLayout;
    const nodeCache: NodeCache[] = options.nodeCache || cache.nodeCache;
    const edgeCache = options.edgeCache || cache.edgeCache;
    const useCache: boolean = !options.forceRelayout && cachedLayout && nodeCache.length > 0 && edgeCache.length > 0;
    const nodesWithDegrees: LayoutNode[] = this.updateNodeDegrees(immNodes, immEdges);

    let layout: Layout;

    if (useCache && !AnyOpsOSLibDiagramLayoutService.hasUnseenNodes(immNodes, nodeCache)) {
      // trivial case: no new nodes have been added
      layout = AnyOpsOSLibDiagramLayoutService.cloneLayout(cachedLayout, immNodes, immEdges);
      layout = this.copyLayoutProperties(layout, nodeCache, edgeCache);

    } else if (
      useCache
      // && this.featureIsEnabledAny('layout-dance', 'layout-dance-single')
      && this.hasNewSingleNode(nodesWithDegrees, nodeCache)
    ) {
      // special case: new nodes are 0-degree nodes, no need for layout run,
      // they will be laid out further below
      layout = AnyOpsOSLibDiagramLayoutService.cloneLayout(cachedLayout, nodesWithDegrees, immEdges);
      layout = this.copyLayoutProperties(layout, nodeCache, edgeCache);
      layout = this.layoutSingleNodes(layout, options);

    } else if (
      useCache
      // && this.featureIsEnabledAny('layout-dance', 'layout-dance-rank')
      && this.hasNewNodesOfExistingRank(nodesWithDegrees, immEdges, nodeCache)
    ) {
      // special case: few new nodes were added, no need for layout run,
      // they will inserted according to ranks
      layout = AnyOpsOSLibDiagramLayoutService.cloneLayout(cachedLayout, nodesWithDegrees, immEdges);
      layout = this.copyLayoutProperties(layout, nodeCache, edgeCache);
      layout = this.doLayoutNewNodesOfExistingRank(layout, nodeCache);
      layout = this.layoutSingleNodes(layout, options);

    } else {
      // default case: the new layout is too different and refreshing is required
      layout = this.runLayoutEngine(cache.graph, nodesWithDegrees, immEdges, options);
    }

    if (layout) {
      // Last line of defense - re-render everything if two nodes are too close to one another.
      if (this.minEuclideanDistanceBetweenPoints(layout.nodes) < NODE_CENTERS_SEPARATION_FACTOR) {
        layout = this.runLayoutEngine(cache.graph, nodesWithDegrees, immEdges, options);
      }

      // cache results
      cache.cachedLayout = layout;
      // only cache layout-related properties
      // NB: These properties must be immutable wrt a given node because properties of updated nodes
      // will be overwritten with the cached values, see copyLayoutProperties()
      cache.nodeCache = [...cache.nodeCache, ...layout.nodes.map(({id, x, y, rank}) => ({id, x, y, rank}))];
      cache.edgeCache = [...cache.edgeCache, ...layout.edges];
    }

    return layout;
  }

}
