import {Injectable} from '@angular/core';
import {pick, range} from 'lodash-es';
import {fromJS, Map as makeMap, Set as ImmSet} from 'immutable';
import stableStringify from 'json-stable-stringify';
import dagre from 'dagre';

const topologyCaches = {};

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() {
    this.doLayout = this.doLayout.bind(this);
  }

  private buildTopologyCacheId(topologyId, topologyOptions) {
    let id = '';
    if (topologyId) {
      id = topologyId;
      if (topologyOptions) {
        id += stableStringify(topologyOptions);
      }
    }
    return id;
  }

  private updateNodeDegrees(nodes, edges) {
    return nodes.map((node) => {
      const nodeId = node.get('id');
      const degree = edges.count(edge => edge.get('source') === nodeId
        || edge.get('target') === nodeId);
      return node.set('degree', degree);
    });
  }

  private hasUnseenNodes(nodes, cache) {
    return nodes.size > cache.size || !ImmSet.fromKeys(nodes).isSubset(ImmSet.fromKeys(cache));
  }

  private cloneLayout(layout, nodes, edges) {
    return Object.assign({}, layout, {edges, nodes});
  }

  private hasSameEndpoints(cachedEdge, nodes) {
    const oldPoints = cachedEdge.get('points');
    const oldSourcePoint = oldPoints.first();
    const oldTargetPoint = oldPoints.last();
    const newSource = nodes.get(cachedEdge.get('source'));
    const newTarget = nodes.get(cachedEdge.get('target'));
    return (oldSourcePoint && oldTargetPoint && newSource && newTarget
      && oldSourcePoint.get('x') === newSource.get('x')
      && oldSourcePoint.get('y') === newSource.get('y')
      && oldTargetPoint.get('x') === newTarget.get('x')
      && oldTargetPoint.get('y') === newTarget.get('y'));
  }

  private setSimpleEdgePoints(edge, nodeCache) {
    const source = nodeCache.get(edge.get('source'));
    const target = nodeCache.get(edge.get('target'));
    return edge.set('points', fromJS([
      {x: source.get('x'), y: source.get('y')},
      {x: target.get('x'), y: target.get('y')}
    ]));
  }

  private copyLayoutProperties(layout, nodeCache, edgeCache) {
    const result = Object.assign({}, layout);
    result.nodes = layout.nodes.map(node => (nodeCache.has(node.get('id'))
      ? node.merge(nodeCache.get(node.get('id'))) : node));
    result.edges = layout.edges.map((edge) => {
      if (edgeCache.has(edge.get('id'))
        && this.hasSameEndpoints(edgeCache.get(edge.get('id')), result.nodes)) {
        return edge.merge(edgeCache.get(edge.get('id')));
      }
      if (nodeCache.get(edge.get('source')) && nodeCache.get(edge.get('target'))) {
        return this.setSimpleEdgePoints(edge, nodeCache);
      }
      return edge;
    });
    return result;
  }

  private localSessionStorage = {
    clear() {
      window.sessionStorage.clear();
      window.localStorage.clear();
    },
    getItem(k) {
      return window.sessionStorage.getItem(k) || window.localStorage.getItem(k);
    },
    setItem(k, v) {
      window.sessionStorage.setItem(k, v);
      window.localStorage.setItem(k, v);
    }
  };

  private storageGet(key, defaultValue?, storage = this.localSessionStorage) {
    if (!storage) {
      return defaultValue;
    }

    const value = storage.getItem(key);
    if (value == null) {
      return defaultValue;
    }

    return value;
  }

  private getKey = key => `scope-experimental:${key}`;

  private featureIsEnabled(feature) {
    let enabled = this.storageGet(this.getKey(feature));
    if (typeof enabled === 'string') {
      // Convert back to boolean if stored as a string.
      enabled = JSON.parse(enabled);
    }
    return enabled;
  }

  private featureIsEnabledAny(...args) {
    return Array.prototype.some.call(args, feature => this.featureIsEnabled(feature));
  }

  private hasNewSingleNode(nodes, cache) {
    const oldNodes = ImmSet.fromKeys(cache);
    const newNodes = ImmSet.fromKeys(nodes).subtract(oldNodes);
    const hasNewSingleNodes = newNodes.every(key => nodes.getIn([key, 'degree']) === 0);
    return oldNodes.size > 0 && hasNewSingleNodes;
  }

  private layoutSingleNodes(layout, opts) {
    const result = Object.assign({}, layout);
    const options = opts || {};
    const margins = options.margins || {left: 0, top: 0};
    const ranksep = 2 * 100 / 2; // dagre splits it in half
    const nodesep = 100;
    const nodeWidth = 1.5 * 100;
    const nodeHeight = 1.5 * 100;
    const graphHeight = layout.graphHeight || layout.height;
    const graphWidth = layout.graphWidth || layout.width;
    const aspectRatio = graphHeight ? graphWidth / graphHeight : 1;

    let {nodes} = layout;

    // 0-degree nodes
    const singleNodes = nodes.filter(node => node.get('degree') === 0);

    if (singleNodes.size) {
      let offsetX;
      let offsetY;
      const nonSingleNodes = nodes.filter(node => node.get('degree') !== 0);
      if (nonSingleNodes.size > 0) {
        if (aspectRatio < 1) {
          offsetX = nonSingleNodes.maxBy(node => node.get('x')).get('x');
          offsetY = nonSingleNodes.minBy(node => node.get('y')).get('y');
          if (offsetX) {
            offsetX += nodeWidth + nodesep;
          }
        } else {
          offsetX = nonSingleNodes.minBy(node => node.get('x')).get('x');
          offsetY = nonSingleNodes.maxBy(node => node.get('y')).get('y');
          if (offsetY) {
            offsetY += nodeHeight + ranksep;
          }
        }
      }

      // default margins
      offsetX = offsetX || (margins.left + nodeWidth) / 2;
      offsetY = offsetY || (margins.top + nodeHeight) / 2;

      const columns = Math.ceil(Math.sqrt(singleNodes.size));
      let row = 0;
      let col = 0;
      let singleX;
      let singleY;
      nodes = nodes.sortBy(node => node.get('rank')).map((node) => {
        if (singleNodes.has(node.get('id'))) {
          if (col === columns) {
            col = 0;
            row += 1;
          }
          singleX = (col * (nodesep + nodeWidth)) + offsetX;
          singleY = (row * (ranksep + nodeHeight)) + offsetY;
          col += 1;
          return node.merge({
            x: singleX,
            y: singleY
          });
        }
        return node;
      });

      // adjust layout dimensions if graph is now bigger
      result.width = Math.max(layout.width, singleX + (nodeWidth / 2) + nodesep);
      result.height = Math.max(layout.height, singleY + (nodeHeight / 2) + ranksep);
      result.nodes = nodes;
    }

    return result;
  }

  private hasNewNodesOfExistingRank(nodes, edges, cache) {
    const oldNodes = ImmSet.fromKeys(cache);
    const newNodes = ImmSet.fromKeys(nodes).subtract(oldNodes);

    // if new there are edges that connect 2 new nodes, need a full layout
    const bothNodesNew = edges.find(edge => newNodes.contains(edge.get('source'))
      && newNodes.contains(edge.get('target')));
    if (bothNodesNew) {
      return false;
    }

    const oldRanks = cache.filter(n => n.get('rank')).map(n => n.get('rank')).toSet();
    const hasNewNodesOfExistingRankOrSingle = newNodes.every(key => nodes.getIn([key, 'degree']) === 0
      || oldRanks.contains(nodes.getIn([key, 'rank'])));
    return oldNodes.size > 0 && hasNewNodesOfExistingRankOrSingle;
  }

  private doLayoutNewNodesOfExistingRank(layout, nodeCache) {
    const result = Object.assign({}, layout);
    const nodesep = 100;
    const nodeWidth = 1.5 * 100;

    // determine new nodes
    const oldNodes = ImmSet.fromKeys(nodeCache);
    const newNodes = ImmSet.fromKeys(layout.nodes.filter(n => n.get('degree') > 0))
      .subtract(oldNodes);
    result.nodes = layout.nodes.map((n) => {
      if (newNodes.contains(n.get('id'))) {
        const nodesSameRank = nodeCache.filter(nn => nn.get('rank') === n.get('rank'));
        if (nodesSameRank.size > 0) {
          const y = nodesSameRank.first().get('y');
          const x = nodesSameRank.maxBy(nn => nn.get('x')).get('x') + nodesep + nodeWidth;
          return n.merge({x, y});
        }
        return n;
      }
      return n;
    });

    result.edges = layout.edges.map((edge) => {
      if (!edge.has('points')) {
        return this.setSimpleEdgePoints(edge, layout.nodes);
      }
      return edge;
    });

    return result;
  }

  private graphNodeId(id) {
    return id.replace('.', '<DOT>');
  }

  private fromGraphNodeId(encodedId) {
    return encodedId.replace('<DOT>', '.');
  }

  private uniformSelect(array, size) {
    if (size > array.length) {
      return array;
    }

    return range(size)
      .map(index => array[parseInt(String(index * (array.length / (size - (1 - 1e-9)))), 10)]);
  }

  private correctedEdgePath(waypoints, source, target) {
    // Get the relevant waypoints that will be added/replicated.
    const sourcePoint = fromJS({x: source.get('x'), y: source.get('y')});
    const targetPoint = fromJS({x: target.get('x'), y: target.get('y')});
    const entrancePoint = waypoints.last();

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
      waypoints = fromJS(this.uniformSelect(waypoints.butLast().toJS(), 10 - 4));
      waypoints = waypoints.unshift(sourcePoint);
      waypoints = waypoints.push(entrancePoint);
      waypoints = waypoints.push(entrancePoint);
      waypoints = waypoints.push(targetPoint);
    } else {
      // For loops we simply set the endpoints at the center of source/target node to
      // make them smoother and, of course, we cap the total number of waypoints.
      waypoints = fromJS(this.uniformSelect(waypoints.toJS(), 10));
      waypoints = waypoints.set(0, sourcePoint);
      waypoints = waypoints.set(waypoints.size - 1, targetPoint);
    }

    return waypoints;
  }

  private runLayoutEngine(graph, imNodes, imEdges, opts) {
    let nodes = imNodes;
    let edges = imEdges;

    const ranksep = 2 * 200;
    const nodesep = 200;
    const nodeWidth = 1.5 * 100;
    const nodeHeight = 1.5 * 100;

    // configure node margins
    graph.setGraph({
      nodesep,
      ranksep
    });

    // add nodes to the graph if not already there
    nodes.forEach((node) => {
      const gNodeId = this.graphNodeId(node.get('id'));
      if (!graph.hasNode(gNodeId)) {
        graph.setNode(gNodeId, {
          height: nodeHeight,
          width: nodeWidth
        });
      }
    });

    // remove nodes that are no longer there or are 0-degree nodes
    graph.nodes().forEach((gNodeId) => {
      const nodeId = this.fromGraphNodeId(gNodeId);
      if (!nodes.has(nodeId) || nodes.get(nodeId).get('degree') === 0) {
        graph.removeNode(gNodeId);
      }
    });

    // add edges to the graph if not already there
    edges.forEach((edge) => {
      const s = this.graphNodeId(edge.get('source'));
      const t = this.graphNodeId(edge.get('target'));
      if (!graph.hasEdge(s, t)) {
        const virtualNodes = s === t ? 1 : 0;
        graph.setEdge(s, t, {id: edge.get('id'), minlen: virtualNodes});
      }
    });

    // remove edges that are no longer there
    graph.edges().forEach((edgeObj) => {
      const edge = [this.fromGraphNodeId(edgeObj.v), this.fromGraphNodeId(edgeObj.w)];
      const edgeId = edge.join('---');
      if (!edges.has(edgeId)) {
        graph.removeEdge(edgeObj.v, edgeObj.w);
      }
    });

    dagre.layout(graph, {debugTiming: false});

    // apply coordinates to nodes and edges
    graph.nodes().forEach((gNodeId) => {
      const graphNode = graph.node(gNodeId);
      const nodeId = this.fromGraphNodeId(gNodeId);
      nodes = nodes.setIn([nodeId, 'x'], graphNode.x);
      nodes = nodes.setIn([nodeId, 'y'], graphNode.y);
    });
    graph.edges().forEach((graphEdge) => {
      const graphEdgeMeta = graph.edge(graphEdge);
      const edge = edges.get(graphEdgeMeta.id);

      const source = nodes.get(this.fromGraphNodeId(edge.get('source')));
      const target = nodes.get(this.fromGraphNodeId(edge.get('target')));
      const waypoints = this.correctedEdgePath(fromJS(graphEdgeMeta.points), source, target);

      edges = edges.setIn([graphEdgeMeta.id, 'points'], waypoints);
    });

    const {width, height} = graph.graph();
    let layout = {
      edges,
      graphHeight: height,
      graphWidth: width,
      height,
      nodes,
      width
    };

    // layout the single nodes
    layout = this.layoutSingleNodes(layout, opts);

    // return object with the width and height of layout
    return layout;
  }

  private euclideanDistance(pointA, pointB) {
    const dx = pointA.get('x') - pointB.get('x');
    const dy = pointA.get('y') - pointB.get('y');
    return Math.sqrt((dx * dx) + (dy * dy));
  }

  private minEuclideanDistanceBetweenPoints(points) {
    let minDistance = Infinity;
    points.forEach((pointA, idA) => {
      points.forEach((pointB, idB) => {
        const distance = this.euclideanDistance(pointA, pointB);
        if (idA !== idB && distance < minDistance) {
          minDistance = distance;
        }
      });
    });
    return minDistance;
  }

  doLayout(immNodes, immEdges, opts) {
    const options = opts || {};
    const cacheId = this.buildTopologyCacheId(options.topologyId, options.topologyOptions);

    // one engine and node and edge caches per topology, to keep renderings similar
    if (options.noCache || !topologyCaches[cacheId]) {
      topologyCaches[cacheId] = {
        edgeCache: makeMap(),
        graph: new dagre.graphlib.Graph({}),
        nodeCache: makeMap()
      };
    }

    const cache = topologyCaches[cacheId];
    const cachedLayout = options.cachedLayout || cache.cachedLayout;
    const nodeCache = options.nodeCache || cache.nodeCache;
    const edgeCache = options.edgeCache || cache.edgeCache;
    const useCache = !options.forceRelayout && cachedLayout && nodeCache && edgeCache;
    const nodesWithDegrees = this.updateNodeDegrees(immNodes, immEdges);
    let layout;

    if (useCache && !this.hasUnseenNodes(immNodes, nodeCache)) {
      // trivial case: no new nodes have been added
      layout = this.cloneLayout(cachedLayout, immNodes, immEdges);
      layout = this.copyLayoutProperties(layout, nodeCache, edgeCache);
    } else if (useCache
      && this.featureIsEnabledAny('layout-dance', 'layout-dance-single')
      && this.hasNewSingleNode(nodesWithDegrees, nodeCache)) {
      // special case: new nodes are 0-degree nodes, no need for layout run,
      // they will be laid out further below
      layout = this.cloneLayout(cachedLayout, nodesWithDegrees, immEdges);
      layout = this.copyLayoutProperties(layout, nodeCache, edgeCache);
      layout = this.layoutSingleNodes(layout, opts);
    } else if (useCache
      && this.featureIsEnabledAny('layout-dance', 'layout-dance-rank')
      && this.hasNewNodesOfExistingRank(nodesWithDegrees, immEdges, nodeCache)) {
      // special case: few new nodes were added, no need for layout run,
      // they will inserted according to ranks
      layout = this.cloneLayout(cachedLayout, nodesWithDegrees, immEdges);
      layout = this.copyLayoutProperties(layout, nodeCache, edgeCache);
      layout = this.doLayoutNewNodesOfExistingRank(layout, nodeCache);
      layout = this.layoutSingleNodes(layout, opts);
    } else {
      // default case: the new layout is too different and refreshing is required
      layout = this.runLayoutEngine(cache.graph, nodesWithDegrees, immEdges, opts);
    }


    if (layout) {
      // Last line of defense - re-render everything if two nodes are too close to one another.
      if (this.minEuclideanDistanceBetweenPoints(layout.nodes) < (1.5 * 100) + 200) {
        layout = this.runLayoutEngine(cache.graph, nodesWithDegrees, immEdges, opts);
      }

      // cache results
      cache.cachedLayout = layout;
      // only cache layout-related properties
      // NB: These properties must be immutable wrt a given node because properties of updated nodes
      // will be overwritten with the cached values, see copyLayoutProperties()
      cache.nodeCache = cache.nodeCache.merge(layout.nodes.map(n => fromJS(pick(n.toJS(), ['x', 'y', 'rank']))));
      cache.edgeCache = cache.edgeCache.merge(layout.edges);
    }

    return layout;
  }
}
