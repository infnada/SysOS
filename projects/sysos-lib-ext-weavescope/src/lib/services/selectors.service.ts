import {Injectable, OnDestroy} from '@angular/core';
import {escapeRegExp, without, includes, pick} from 'lodash-es';
import {fromJS, List as makeList, Map as makeMap, Set as makeSet} from 'immutable';
import {scaleThreshold} from 'd3-scale';
import {createSelector, createStructuredSelector, createSelectorCreator, defaultMemoize} from 'reselect';
import stableStringify from 'json-stable-stringify';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {initEdgesFromNodes} from 'weavescope/client/app/scripts/utils/layouter-utils';
import {timer} from 'weavescope/client/app/scripts/utils/time-utils';
import {CANVAS_MARGINS} from 'weavescope/client/app/scripts/constants/styles';

import {StateService} from './state.service';
import {LayoutService} from './layout.service';

// ------- reselect-map
import {memoizeMap} from 'reselect-map/src/memoize';

const mapMemoize = (fn, equalityCheck) =>
  memoizeMap(fn, {
    equalityCheck,
    mapper(mapable, callback) {
      return mapable.map((v, k) => callback(k, v));
    }
  });
const createMapSelector = createMappedSelectorCreator(mapMemoize);

function createMappedSelectorCreator(memoize) {
  return createSelectorCreator((fn, mapmem) => {
    if (mapmem === true) {
      return memoize(fn);
    } else {
      return defaultMemoize(fn);
    }
  }, true);
}

// --------------

@Injectable({
  providedIn: 'root'
})
export class SelectorsService implements OnDestroy {
  private destroySubject$: Subject<void> = new Subject();
  private state;

  constructor(private State: StateService,
              private Layout: LayoutService) {
    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => this.state = state);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  graphExceedsComplexityThreshSelector = createSelector(
    [
      () => this.state.getIn(['currentTopology', 'stats', 'node_count']) || 0,
      () => this.state.getIn(['currentTopology', 'stats', 'edge_count']) || 0,
    ],
    (nodeCount: number, edgeCount: number) => (nodeCount + (2 * edgeCount)) > 500
  );

  /**
   * Returns the float of a metric value string, e.g. 2 KB -> 2048
   */
  parseValue(value) {
    let parsed = parseFloat(value);
    if ((/k/i).test(value)) {
      parsed *= 1024;
    } else if ((/m/i).test(value)) {
      parsed *= 1024 * 1024;
    } else if ((/g/i).test(value)) {
      parsed *= 1024 * 1024 * 1024;
    } else if ((/t/i).test(value)) {
      parsed *= 1024 * 1024 * 1024 * 1024;
    }
    return parsed;
  }

  /**
   * Returns an object with fields depending on the query:
   * parseQuery('text') -> {query: 'text'}
   * parseQuery('p:text') -> {query: 'text', prefix: 'p'}
   * parseQuery('cpu > 1') -> {metric: 'cpu', value: '1', comp: 'gt'}
   */
  parseQuery(query) {
    const COMPARISONS = makeMap({
      '<': 'lt',
      '=': 'eq',
      '>': 'gt'
    });
    const COMPARISONS_REGEX = new RegExp(`[${COMPARISONS.keySeq().toJS().join('')}]`);

    if (query) {
      const prefixQuery = query.split(':');
      const isPrefixQuery = prefixQuery && prefixQuery.length === 2;

      if (isPrefixQuery) {
        const prefix = prefixQuery[0].trim();
        query = prefixQuery[1].trim();
        if (prefix && query) {
          return {
            prefix,
            query
          };
        }
      } else if (COMPARISONS_REGEX.test(query)) {
        // check for comparisons
        let comparison;
        COMPARISONS.forEach((comp, delim) => {
          const comparisonQuery = query.split(delim);
          if (comparisonQuery && comparisonQuery.length === 2) {
            const value = this.parseValue(comparisonQuery[1]);
            const metric = comparisonQuery[0].trim();
            if (!(window as any).isNaN(value) && metric) {
              comparison = {
                comp,
                metric,
                value
              };
              return false; // dont look further
            }
          }
          return true;
        });
        if (comparison) {
          return comparison;
        }
      } else {
        return {query};
      }
    }
    return null;
  }

  parsedSearchQuerySelector = createSelector(
    [
      () => this.state.get('searchQuery')
    ],
    searchQuery => this.parseQuery(searchQuery)
  );

  /**
   * Returns a RegExp from a given string. If the string is not a valid regexp,
   * it is escaped. Returned regexp is case-insensitive.
   */
  makeRegExp(expression, options = 'i') {
    try {
      return new RegExp(expression, options);
    } catch (e) {
      return new RegExp(escapeRegExp(expression), options);
    }
  }

  /**
   * True if a prefix matches a field label
   * Slugifies the label (removes all non-alphanumerical chars).
   */
  matchPrefix(label, prefix) {
    if (label && prefix) {
      return (this.makeRegExp(prefix)).test(this.slugify(label));
    }
    return false;
  }

  /**
   * Adds a match to nodeMatches under the keyPath. The text is matched against
   * the query. If a prefix is given, it is matched against the label (skip on
   * no match).
   * Returns a new instance of nodeMatches.
   */
  findNodeMatch(nodeMatches, keyPath, text, query, prefix?, label?, truncate?) {
    if (!prefix || this.matchPrefix(label, prefix)) {
      const queryRe = this.makeRegExp(query);
      const matches = text.match(queryRe);
      if (matches) {
        const firstMatch = matches[0];
        const index = text.search(queryRe);
        nodeMatches = nodeMatches.setIn(
          keyPath,
          {
            label, length: firstMatch.length, start: index, text, truncate
          }
        );
      }
    }
    return nodeMatches;
  }

  isPropertyList(table) {
    return (table.type || (table.get && table.get('type'))) === 'property-list';
  }

  isGenericTable(table) {
    return (table.type || (table.get && table.get('type'))) === 'multicolumn-table';
  }

  genericTableEntryKey(row, column) {
    const columnId = column.id || column.get('id');
    const rowId = row.id || row.get('id');
    return `${rowId}_${columnId}`;
  }

  slugify(label) {
    const CLEAN_LABEL_REGEX = /[^A-Za-z0-9]/g;
    return label.replace(CLEAN_LABEL_REGEX, '').toLowerCase();
  }

  /**
   * If the metric matches the field's label and the value compares positively
   * with the comp operator, a nodeMatch is added
   */
  findNodeMatchMetric(nodeMatches, keyPath, fieldValue, fieldLabel, metric, comp, value) {
    if (this.slugify(metric) === this.slugify(fieldLabel)) {
      let matched = false;
      switch (comp) {
        case 'gt': {
          if (fieldValue > value) {
            matched = true;
          }
          break;
        }
        case 'lt': {
          if (fieldValue < value) {
            matched = true;
          }
          break;
        }
        case 'eq': {
          if (fieldValue === value) {
            matched = true;
          }
          break;
        }
        default: {
          break;
        }
      }
      if (matched) {
        nodeMatches = nodeMatches.setIn(
          keyPath,
          {fieldLabel, metric: true}
        );
      }
    }
    return nodeMatches;
  }

  searchNode(node, {prefix, query, metric, comp, value}) {
    const SEARCH_FIELDS = makeMap({
      label: 'label',
      labelMinor: 'labelMinor'
    });

    let nodeMatches = makeMap();

    if (query) {
      // top level fields
      SEARCH_FIELDS.forEach((field, label) => {
        const keyPath = [label];
        if (node.has(field)) {
          nodeMatches = this.findNodeMatch(
            nodeMatches, keyPath, node.get(field),
            query, prefix, label
          );
        }
      });

      // metadata
      if (node.get('metadata')) {
        node.get('metadata').forEach((field) => {
          const keyPath = ['metadata', field.get('id')];
          nodeMatches = this.findNodeMatch(
            nodeMatches, keyPath, field.get('value'),
            query, prefix, field.get('label'), field.get('truncate')
          );
        });
      }

      // parents and relatives
      if (node.get('parents')) {
        node.get('parents').forEach((parent) => {
          const keyPath = ['parents', parent.get('id')];
          nodeMatches = this.findNodeMatch(
            nodeMatches, keyPath, parent.get('label'),
            query, prefix, parent.get('topologyId')
          );
        });
      }

      // property lists
      (node.get('tables') || []).filter(this.isPropertyList).forEach((propertyList) => {
        (propertyList.get('rows') || []).forEach((row) => {
          const entries = row.get('entries');
          const keyPath = ['property-lists', row.get('id')];
          nodeMatches = this.findNodeMatch(
            nodeMatches, keyPath, entries.get('value'),
            query, prefix, entries.get('label')
          );
        });
      });

      // generic tables
      (node.get('tables') || []).filter(this.isGenericTable).forEach((table) => {
        (table.get('rows') || []).forEach((row) => {
          table.get('columns').forEach((column) => {
            const val = row.get('entries').get(column.get('id'));
            const keyPath = ['tables', this.genericTableEntryKey(row, column)];
            nodeMatches = this.findNodeMatch(nodeMatches, keyPath, val, query);
          });
        });
      });
    } else if (metric) {
      const metrics = node.get('metrics');
      if (metrics) {
        metrics.forEach((field) => {
          const keyPath = ['metrics', field.get('id')];
          nodeMatches = this.findNodeMatchMetric(
            nodeMatches, keyPath, field.get('value'),
            field.get('label'), metric, comp, value
          );
        });
      }
    }

    return nodeMatches;
  }

  searchNodeMatchesSelector = createMapSelector(
    [
      () => this.state.get('nodes'),
      this.parsedSearchQuerySelector,
    ],
    (node, parsed) => (parsed ? this.searchNode(node, parsed) : makeMap())
  );

  availableMetricsSelector = createSelector(
    [
      () => this.state.get('nodes'),
    ],
    (nodes) => {
      return nodes
        .valueSeq()
        .flatMap(n => n.get('metrics', makeList()))
        .filter(m => !m.get('valueEmpty'))
        .map(m => makeMap({id: m.get('id'), label: m.get('label')}))
        .toSet()
        .toList()
        .sortBy(m => m.get('label'));
    }
  );

  selectedMetricTypeSelector = createSelector(
    [
      () => this.state.get('pinnedMetricType'),
      () => this.state.get('hoveredMetricType'),
    ],
    (pinnedMetricType, hoveredMetricType) => hoveredMetricType || pinnedMetricType
  );

  selectedMetricIdSelector = createSelector(
    [
      this.availableMetricsSelector,
      this.selectedMetricTypeSelector,
    ],
    (availableMetrics, metricType) => (availableMetrics.find(m => m.get('label') === metricType) || makeMap()).get('id')
  );

  nodeMetricSelector = createMapSelector(
    [
      () => this.state.get('nodes'),
      this.selectedMetricIdSelector,
      () => this.state.get('nodeDetails').last(),
    ],
    (node, selectedMetricId, topCardNode) => {
      const isHighlighted = topCardNode && topCardNode.details && topCardNode.id === node.get('id');
      const sourceNode = isHighlighted ? fromJS(topCardNode.details) : node;
      return sourceNode.get('metrics') && sourceNode.get('metrics')
        .filter(m => m.get('id') === selectedMetricId)
        .first();
    }
  );

  activeTopologyOptionsSelector = createSelector(
    [
      () => this.state.getIn(['currentTopology', 'parentId']),
      () => this.state.get('currentTopologyId'),
      () => this.state.get('topologyOptions'),
    ],
    (parentTopologyId, currentTopologyId, topologyOptions) => (
      topologyOptions.get(parentTopologyId || currentTopologyId, makeMap())
    )
  );

  activeTopologyZoomCacheKeyPathSelector = createSelector(
    [
      () => this.state.get('topologyViewMode'),
      () => this.state.get('currentTopologyId'),
      () => this.state.get('pinnedMetricType'),
      () => stableStringify(this.activeTopologyOptionsSelector(this.state)),
    ],
    (viewMode, topologyId, pinnedMetricType, topologyOptions) => (
      ['zoomCache', viewMode, topologyId, topologyOptions]
    )
  );

  activeLayoutCachedZoomSelector = createSelector(
    [
      () => this.state.get('zoomCache'),
      this.activeTopologyZoomCacheKeyPathSelector,
    ],
    (zoomCache, keyPath) => zoomCache.getIn(keyPath.slice(1), makeMap())
  );

  canvasWidthSelector = createSelector(
    [
      () => this.state.getIn(['viewport', 'width']),
      () => ({bottom: 150, left: 80, right: 80, top: 220})
    ],
    (width: number, margins) => width - margins.left - margins.right
  );

  canvasWithDetailsWidthSelector = createSelector(
    [
      this.canvasWidthSelector,
    ],
    width => width - 420 - 36
  );

  canvasHeightSelector = createSelector(
    [
      () => this.state.getIn(['viewport', 'height']),
      () => ({bottom: 150, left: 80, right: 80, top: 220})
    ],
    (height, margins) => height - margins.top - margins.bottom
  );

  canvasCircularExpanseSelector = createSelector(
    [
      this.canvasWithDetailsWidthSelector,
      this.canvasHeightSelector,
    ],
    (width, height) => Math.min(width, height)
  );

  canvasMarginsSelector = createSelector(
    [
      () => this.state.get('topologyViewMode'),
    ],
    viewMode => CANVAS_MARGINS[viewMode] || {
      bottom: 0, left: 0, right: 0, top: 0
    }
  );

  layoutOptionsSelector = createStructuredSelector({
    forceRelayout: () => this.state.get('forceRelayout'),
    height: this.canvasHeightSelector,
    topologyId: () => this.state.get('currentTopologyId'),
    topologyOptions: this.activeTopologyOptionsSelector,
    width: this.canvasWidthSelector,
  });

  graphLayoutSelector = createSelector(
    [
      () => this.state.get('nodes').filter(node => !node.get('filtered')),
      this.layoutOptionsSelector,
    ],
    (nodes, options) => {
      // If the graph is empty, skip computing the layout.
      if (nodes.size === 0) {
        return {
          edges: makeMap(),
          nodes: makeMap(),
        };
      }

      const edges = initEdgesFromNodes(nodes);
      const timedLayouter = timer(this.Layout.doLayout);

      return timedLayouter(nodes, edges, options);
    }
  );

  graphNodesSelector = createSelector(
    [
      this.graphLayoutSelector,
    ],
    // NOTE: This might be a good place to add (some of) nodes/edges decorators.
    graph => graph.nodes
  );

  graphBoundingRectangleSelector = createSelector(
    [
      this.graphNodesSelector,
    ],
    (graphNodes) => {
      if (graphNodes.size === 0) return null;

      const xMin = graphNodes.map(n => n.get('x') - 100).min();
      const yMin = graphNodes.map(n => n.get('y') - 100).min();
      const xMax = graphNodes.map(n => n.get('x') + 100).max();
      const yMax = graphNodes.map(n => n.get('y') + 100).max();

      return makeMap({
        xMax, xMin, yMax, yMin
      });
    }
  );

  graphDefaultZoomSelector = createSelector(
    [
      this.graphBoundingRectangleSelector,
      this.canvasMarginsSelector,
      this.canvasWidthSelector,
      this.canvasHeightSelector,
    ],
    (boundingRectangle: any, canvasMargins, width, height) => {
      if (!boundingRectangle) return makeMap();

      const {
        xMin, xMax, yMin, yMax
      } = boundingRectangle.toJS();
      const xFactor = width / (xMax - xMin);
      const yFactor = height / (yMax - yMin);

      // Initial zoom is such that the graph covers 90% of either the viewport,
      // or one half of maximal zoom constraint, whichever is smaller.
      const scale = Math.min(xFactor, yFactor, 200 / 100 / 2) * 0.9;

      // This translation puts the graph in the center of the viewport, respecting the margins.
      const translateX = ((width - ((xMax + xMin) * scale)) / 2) + canvasMargins.left;
      const translateY = ((height - ((yMax + yMin) * scale)) / 2) + canvasMargins.top;

      return makeMap({
        scaleX: scale,
        scaleY: scale,
        translateX,
        translateY,
      });
    }
  );

  graphZoomStateSelector = createSelector(
    [
      this.graphDefaultZoomSelector,
      this.activeLayoutCachedZoomSelector,
    ],
    // All the cached fields override the calculated default ones.
    (graphDefaultZoom, cachedZoomState) => graphDefaultZoom.merge(cachedZoomState)
  );

  selectedNodeIdSelector = createSelector(
    [
      this.graphNodesSelector,
      () => this.state.get('selectedNodeId'),
    ],
    (graphNodes, selectedNodeId) => (graphNodes.has(selectedNodeId) ? selectedNodeId : null)
  );

  focusedNodesIdsSelector = createSelector(
    [
      this.selectedNodeIdSelector,
      () => this.state.get('nodes'),
    ],
    (selectedNodeId, nodes) => {
      if (!selectedNodeId || nodes.isEmpty()) {
        return [];
      }

      // The selected node always goes in focus.
      let focusedNodes = makeSet([selectedNodeId]);

      // Add all the nodes the selected node is connected to...
      focusedNodes = focusedNodes.merge(nodes.getIn([selectedNodeId, 'adjacency']) || makeList());

      // ... and also all the nodes that connect to the selected one.
      nodes.forEach((node, nodeId) => {
        const adjacency = node.get('adjacency') || makeList();
        if (adjacency.includes(selectedNodeId)) {
          focusedNodes = focusedNodes.add(nodeId);
        }
      });

      return focusedNodes.toArray();
    }
  );

  circularLayoutScalarsSelector = createSelector(
    [
      () => this.graphZoomStateSelector(this.state).get('scaleX'),
      () => this.focusedNodesIdsSelector(this.state).length - 1,
      this.canvasCircularExpanseSelector,
    ],
    (scale, circularNodesCount, viewportExpanse: number) => {
      // Here we calculate the zoom factor of the nodes that get selected into focus.
      // The factor is a somewhat arbitrary function (based on what looks good) of the
      // viewport dimensions and the number of nodes in the circular layout. The idea
      // is that the node should never be zoomed more than to cover 1/2 of the viewport
      // (`maxScale`) and then the factor gets decresed asymptotically to the inverse
      // square of the number of circular nodes, with a little constant push to make
      // the layout more stable for a small number of nodes. Finally, the zoom factor is
      // divided by the zoom factor applied to the whole topology layout to cancel it out.
      const maxScale = viewportExpanse / 100 / 2;
      const shrinkFactor = Math.sqrt(circularNodesCount + 10);
      const selectedScale = maxScale / shrinkFactor / scale;

      const radiusDensity = scaleThreshold()
        .domain([3, 6])
        .range([2.5, 3, 2.5]);

      // Following a similar logic as above, we set the radius of the circular
      // layout based on the viewport dimensions and the number of circular nodes.
      const circularRadius = viewportExpanse / radiusDensity(circularNodesCount) / scale;
      const circularInnerAngle = (2 * Math.PI) / circularNodesCount;

      return {circularInnerAngle, circularRadius, selectedScale};
    }
  );

  selectedScaleSelector = createSelector(
    [
      this.circularLayoutScalarsSelector,
    ],
    layout => layout.selectedScale
  );

  canvasDetailsHorizontalCenterSelector = createSelector(
    [
      this.canvasWithDetailsWidthSelector,
      this.canvasMarginsSelector,
    ],
    (width, margins) => (width / 2) + margins.left
  );

  canvasDetailsVerticalCenterSelector = createSelector(
    [
      this.canvasHeightSelector,
      this.canvasMarginsSelector,
    ],
    (height, margins) => (height / 2) + margins.top
  );

  translationToViewportCenterSelector = createSelector(
    [
      this.canvasDetailsHorizontalCenterSelector,
      this.canvasDetailsVerticalCenterSelector,
      this.graphZoomStateSelector,
    ],
    (centerX, centerY, zoomState: any) => {
      const {
        scaleX, scaleY, translateX, translateY
      } = zoomState.toJS();
      return {
        x: (-translateX + centerX) / scaleX,
        y: (-translateY + centerY) / scaleY,
      };
    }
  );

  layoutNodesSelector = createSelector(
    [
      this.selectedNodeIdSelector,
      this.focusedNodesIdsSelector,
      this.graphNodesSelector,
      this.translationToViewportCenterSelector,
      this.circularLayoutScalarsSelector,
    ],
    (selectedNodeId, focusedNodesIds, graphNodes, translationToCenter, layoutScalars) => {
      const {circularRadius, circularInnerAngle} = layoutScalars;
      const circularOffsetAngle = Math.PI / 4;

      // Do nothing if the layout doesn't contain the selected node anymore.
      if (!selectedNodeId) {
        return graphNodes;
      }

      // Fix the selected node in the viewport center.
      let layoutNodes = graphNodes.mergeIn([selectedNodeId], translationToCenter);

      // Put the nodes that are adjacent to the selected one in a circular layout around it.
      const circularNodesIds = without(focusedNodesIds, selectedNodeId);
      layoutNodes = layoutNodes.map((node, nodeId) => {
        const index = circularNodesIds.indexOf(nodeId);
        if (index > -1) {
          const angle = circularOffsetAngle + (index * circularInnerAngle);
          return node.merge({
            x: translationToCenter.x + (circularRadius * Math.sin(angle)),
            y: translationToCenter.y + (circularRadius * Math.cos(angle))
          });
        }
        return node;
      });

      return layoutNodes;
    }
  );

  graphEdgesSelector = createSelector(
    [
      this.graphLayoutSelector,
    ],
    graph => graph.edges
  );

  layoutEdgesSelector = createSelector(
    [
      this.graphEdgesSelector,
      this.layoutNodesSelector,
      this.focusedNodesIdsSelector,
    ],
    (graphEdges, layoutNodes, focusedNodesIds) => (
      // Update the edges in the circular layout to link the nodes in a straight line.
      graphEdges.map((edge) => {
        const source = edge.get('source');
        const target = edge.get('target');
        if (includes(focusedNodesIds, source) || includes(focusedNodesIds, target)) {
          return edge.set('points', fromJS([
            pick(layoutNodes.get(source).toJS(), ['x', 'y']),
            pick(layoutNodes.get(target).toJS(), ['x', 'y']),
          ]));
        }
        return edge;
      })
    )
  );

  graphLimitsSelector = createSelector(
    [
      this.graphBoundingRectangleSelector,
    ],
    (boundingRectangle: any) => {
      if (!boundingRectangle) return makeMap();

      const {
        xMin, xMax, yMin, yMax
      } = boundingRectangle.toJS();

      return makeMap({
        contentMaxX: xMax,
        contentMaxY: yMax,
        contentMinX: xMin,
        contentMinY: yMin,
        maxScale: 200 / 100,
        minScale: 3 / 100,
      });
    }
  );

  adjacentToHoveredNodeIdsSelector = createSelector(
    [
      () => this.state.get('mouseOverNodeId'),
      () => this.state.get('nodes'),
    ],
    (mouseOverNodeId, nodes) => {
      let nodeIds = makeSet();

      if (mouseOverNodeId) {
        nodeIds = makeSet(nodes.getIn([mouseOverNodeId, 'adjacency']));
        // fill up set with reverse edges
        nodes.forEach((node, id) => {
          if (node.get('adjacency') && node.get('adjacency').includes(mouseOverNodeId)) {
            nodeIds = nodeIds.add(id);
          }
        });
      }

      return nodeIds;
    }
  );

  getNodesFromEdgeId(edgeId) {
    return edgeId.split('---');
  }

  constructEdgeId(source, target) {
    return [source, target].join('---');
  }

  highlightedEdgeIdsSelector = createSelector(
    [
      this.adjacentToHoveredNodeIdsSelector,
      () => this.state.get('mouseOverNodeId'),
      () => this.state.get('mouseOverEdgeId'),
    ],
    (adjacentToHoveredNodeIds, mouseOverNodeId, mouseOverEdgeId) => {
      let highlightedEdgeIds = makeSet();

      if (mouseOverEdgeId) {
        const [sourceNode, targetNode] = this.getNodesFromEdgeId(mouseOverEdgeId);
        highlightedEdgeIds = highlightedEdgeIds.add(this.constructEdgeId(sourceNode, targetNode));
        highlightedEdgeIds = highlightedEdgeIds.add(this.constructEdgeId(targetNode, sourceNode));
      }

      if (mouseOverNodeId) {
        // all neighbour combinations because we dont know which direction exists
        highlightedEdgeIds = highlightedEdgeIds.union(adjacentToHoveredNodeIds.flatMap(adjacentId => [
          this.constructEdgeId(adjacentId, mouseOverNodeId),
          this.constructEdgeId(mouseOverNodeId, adjacentId),
        ]));
      }

      return highlightedEdgeIds;
    }
  );

  highlightedNodeIdsSelector = createSelector(
    [
      this.adjacentToHoveredNodeIdsSelector,
      () => this.state.get('mouseOverNodeId'),
      () => this.state.get('mouseOverEdgeId'),
    ],
    (adjacentToHoveredNodeIds, mouseOverNodeId, mouseOverEdgeId) => {
      let highlightedNodeIds = makeSet();

      if (mouseOverEdgeId) {
        highlightedNodeIds = highlightedNodeIds.union(this.getNodesFromEdgeId(mouseOverEdgeId));
      }

      if (mouseOverNodeId) {
        highlightedNodeIds = highlightedNodeIds.add(mouseOverNodeId);
        highlightedNodeIds = highlightedNodeIds.union(adjacentToHoveredNodeIds);
      }

      return highlightedNodeIds;
    }
  );

  nodeNetworksSelector = createMapSelector(
    [
      () => this.state.get('nodes'),
    ],
    (node) => {
      const metadata = node.get('metadata', makeList());
      const networks = metadata.find(f => f.get('id') === 'docker_container_networks') || makeMap();
      const networkValues = networks.has('value') ? networks.get('value').split(', ') : [];

      return fromJS(networkValues.map(network => ({
        colorKey: network, id: network, label: network
      })));
    }
  );

  selectedNetworkNodesIdsSelector = createSelector(
    [
      this.nodeNetworksSelector,
      () => this.state.get('selectedNetwork'),
    ],
    (nodeNetworks, selectedNetworkId) => {
      const nodeIds = [];
      nodeNetworks.forEach((networks, nodeId) => {
        const networksIds = networks.map(n => n.get('id'));
        if (networksIds.contains(selectedNetworkId)) {
          nodeIds.push(nodeId);
        }
      });
      return fromJS(nodeIds);
    }
  );

  searchTopology(nodes, parsedQuery) {
    let nodesMatches = makeMap();
    nodes.forEach((node, nodeId) => {
      const nodeMatches = this.searchNode(node, parsedQuery);
      if (!nodeMatches.isEmpty()) {
        nodesMatches = nodesMatches.set(nodeId, nodeMatches);
      }
    });
    return nodesMatches;
  }

  searchMatchCountByTopologySelector = createMapSelector(
    [
      () => this.state.get('nodesByTopology'),
      this.parsedSearchQuerySelector,
    ],
    (nodes, parsed) => (parsed ? this.searchTopology(nodes, parsed).size : 0)
  );
}
