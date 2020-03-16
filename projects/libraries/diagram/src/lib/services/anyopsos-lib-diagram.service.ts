import {Injectable} from '@angular/core';

import {escapeRegExp} from 'lodash-es';
import {scaleThreshold} from 'd3-scale';

import {AnyOpsOSLibDiagramStateService} from './anyopsos-lib-diagram-state.service';
import {AnyOpsOSLibDiagramLayoutService} from './anyopsos-lib-diagram-layout.service';
import {EDGE_ID_SEPARATOR} from '../anyopsos-lib-diagram.constants';

import {Node} from '../types/node';
import {Layout} from '../types/layout';
import {LayoutNode} from '../types/layout-node';
import {LayoutLimits} from '../types/layout-limits';
import {LayoutOptions} from '../types/layout-options';
import {SvgDomRect} from '../types/svg-dom-rect';
import {SvgDomPos} from '../types/svg-dom-pos';
import {TopologyOption} from '../types/topology-option';
import {Topology} from '../types/topology';
import {LayoutEdge} from '../types/layout-edge';
import {Metric} from '../types/metric';
import {Network} from '../types/network';
import {ParsedSearchQuery} from '../types/parsed-search-query';
import {ZoomState} from '../types/zoom-state';
import {NodeMatch} from '../types/node-match';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibDiagramService {

  constructEdgeId(source: string, target: string): string {
    return [source, target].join(EDGE_ID_SEPARATOR);
  }

  // Constructs the edges for the layout engine from the nodes' adjacency table.
  // We don't collapse edge pairs (A->B, B->A) here as we want to let the layout
  // engine decide how to handle bidirectional edges.
  initEdgesFromNodes(nodes: Node[]): LayoutEdge[] {
    let edges = [];

    nodes.forEach((node) => {
      (node.adjacency || []).forEach((adjacentId) => {
        const source: string = node.id;
        const target: string = adjacentId;

        if (nodes.some(n => n.id ===target)) {
          // The direction source->target is important since dagre takes
          // directionality into account when calculating the layout.
          const edgeId: string = this.constructEdgeId(source, target);
          const edge = {
            id: edgeId,
            source,
            target,
            value: 1
          };
          edges.push(edge);
        }
      });
    });

    return edges;
  }

  /**
   * Returns the float of a metric value string, e.g. 2 KB -> 2048
   */
  parseValue(value: string): number {
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
  parseQuery(query: string): ParsedSearchQuery | null {
    const COMPARISONS = {
      '<': 'lt',
      '=': 'eq',
      '>': 'gt'
    };
    const COMPARISONS_REGEX = new RegExp(`[${Object.keys(COMPARISONS).join('')}]`);

    if (query) {
      const prefixQuery: string[] = query.split(':');
      const isPrefixQuery: boolean = prefixQuery && prefixQuery.length === 2;

      if (isPrefixQuery) {
        const prefix: string = prefixQuery[0].trim();
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
        Object.keys(COMPARISONS).forEach((comp) => {
          const comparisonQuery: string[] = query.split(comp);

          if (comparisonQuery && comparisonQuery.length === 2) {
            const value: number = this.parseValue(comparisonQuery[1]);
            const metric: string = comparisonQuery[0].trim();
            if (!Number.isNaN(value) && metric) {
              comparison = {
                comp: COMPARISONS[comp],
                metric,
                value
              };
              return false; // dont look further
            }
          }
          return true;
        });

        if (comparison) return comparison;
      } else {

        return { query };
      }
    }

    return null;
  }

  /**
   * Returns a RegExp from a given string. If the string is not a valid regexp,
   * it is escaped. Returned regexp is case-insensitive.
   */
  makeRegExp(expression: string, options: string = 'i'): RegExp {
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
  matchPrefix(label: string, prefix: string): boolean {
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
  findNodeMatch(nodeMatches: NodeMatch[],
                keyPath: string[],
                text: string,
                query: string,
                prefix?: string,
                label?: string,
                truncate?: boolean): NodeMatch[] {

    if (!prefix || this.matchPrefix(label, prefix)) {
      const queryRe: RegExp = this.makeRegExp(query);
      const matches: RegExpMatchArray = text.match(queryRe);

      if (matches) {
        const firstMatch: string = matches[0];
        const index: number = text.search(queryRe);

        nodeMatches.push({
          label,
          length: firstMatch.length,
          start: index,
          text,
          truncate,
          keyPath: keyPath
        });

      }
    }

    return nodeMatches;
  }

  slugify(label) {
    const CLEAN_LABEL_REGEX = /[^A-Za-z0-9]/g;
    return label.replace(CLEAN_LABEL_REGEX, '').toLowerCase();
  }

  /**
   * If the metric matches the field's label and the value compares positively
   * with the comp operator, a nodeMatch is added
   */
  findNodeMatchMetric(nodeMatches: NodeMatch[],
                      keyPath: string[],
                      fieldValue: string | number,
                      fieldLabel: string,
                      metric: string,
                      comp: ParsedSearchQuery['comp'],
                      value: string) {

    if (this.slugify(metric) === this.slugify(fieldLabel)) {
      let matched: boolean = false;

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

        nodeMatches.push({
          label: fieldLabel,
          metric: true,
          keyPath: keyPath
        });

      }
    }

    return nodeMatches;
  }

  searchNode(node: Node, {prefix, query, metric, comp, value}: ParsedSearchQuery): NodeMatch[] {
    const SEARCH_FIELDS = [
      'label',
      'labelMinor'
    ];

    const nodeMatches: NodeMatch[] = [];

    if (query) {
      // top level fields
      SEARCH_FIELDS.forEach((label) => {
        const keyPath: [string] = [label];
        if (node[label]) {
          nodeMatches.push(...this.findNodeMatch(nodeMatches, keyPath, node[label], query, prefix, label));
        }
      });

      // metadata
      if (node.metadata) {
        node.metadata.forEach((field) => {
          const keyPath: [string, string] = ['metadata', field.id];
          nodeMatches.push(...this.findNodeMatch(nodeMatches, keyPath, field.value, query, prefix, field.label, field.truncate));
        });
      }

      // parents and relatives
      if (node.parents) {
        node.parents.forEach((parent) => {
          const keyPath: [string, string] = ['parents', parent.id];
          nodeMatches.push(...this.findNodeMatch(nodeMatches, keyPath, parent.label, query, prefix, parent.topologyId));
        });
      }

    } else if (metric) {
      const metrics = node.metrics;

      if (metrics) {
        metrics.forEach((field) => {
          const keyPath: [string, string] = ['metrics', field.id];
          nodeMatches.push(...this.findNodeMatchMetric(nodeMatches, keyPath, field.value, field.label, metric, comp, value));
        });
      }
    }

    return nodeMatches;
  }

  getNodesFromEdgeId(edgeId): string[] {
    return edgeId.split('---');
  }

  searchTopology(nodes, parsedQuery): { id: string, matches: NodeMatch[] }[] {
    const nodesMatches: { id: string, matches: NodeMatch[]; }[] = [];

    nodes.forEach((node) => {
      const nodeMatches: NodeMatch[] = this.searchNode(node, parsedQuery);

      if (nodeMatches.length !== 0) {
        nodesMatches.push({ id: node.id, matches: nodeMatches });
      }

    });

    return nodesMatches;
  }

  constructor(private readonly LibDiagramState: AnyOpsOSLibDiagramStateService,
              private readonly LibDiagramLayoutService: AnyOpsOSLibDiagramLayoutService) {
  }

  adjacentToHoveredNodeIds(): string[] {
    const mouseOverNodeId: string = this.LibDiagramState.$mouseOverNodeId.getValue();
    const nodes: Node[] = this.LibDiagramState.$nodes.getValue();

    const nodeIds = [];

    if (mouseOverNodeId) {
      nodeIds.push(...nodes.find(node => node.id === mouseOverNodeId).adjacency);

      // fill up set with reverse edges
      nodes.forEach((node: Node) => {
        if (node.adjacency && node.adjacency.includes(mouseOverNodeId)) nodeIds.push(node.id);
      });
    }

    return nodeIds;
  }

  highlightedEdgeIds(): string[] {
    const adjacentToHoveredNodeIds: string[] = this.adjacentToHoveredNodeIds();
    const mouseOverNodeId: string = this.LibDiagramState.$mouseOverNodeId.getValue();
    const mouseOverEdgeId: string = this.LibDiagramState.$mouseOverEdgeId.getValue();

    const highlightedEdgeIds = [];

    if (mouseOverEdgeId) {
      const [sourceNode, targetNode] = this.getNodesFromEdgeId(mouseOverEdgeId);
      highlightedEdgeIds.push(this.constructEdgeId(sourceNode, targetNode));
      highlightedEdgeIds.push(this.constructEdgeId(targetNode, sourceNode));
    }

    if (mouseOverNodeId) {

      // all neighbour combinations because we dont know which direction exists
      adjacentToHoveredNodeIds.forEach((adjacentId: string) => {
        highlightedEdgeIds.push(this.constructEdgeId(adjacentId, mouseOverNodeId));
        highlightedEdgeIds.push(this.constructEdgeId(mouseOverNodeId, adjacentId));
      });
    }

    return highlightedEdgeIds;
  }

  highlightedNodeIds(): string[] {
    const adjacentToHoveredNodeIds: string[] = this.adjacentToHoveredNodeIds();
    const mouseOverNodeId: string = this.LibDiagramState.$mouseOverNodeId.getValue();
    const mouseOverEdgeId: string = this.LibDiagramState.$mouseOverEdgeId.getValue();

    const highlightedNodeIds: string[] = [];

    if (mouseOverEdgeId) {
      highlightedNodeIds.push(...this.getNodesFromEdgeId(mouseOverEdgeId));
    }

    if (mouseOverNodeId) {
      highlightedNodeIds.push(mouseOverNodeId);
      highlightedNodeIds.push(...adjacentToHoveredNodeIds);
    }

    return highlightedNodeIds;
  }

  focusedNodesIds(): string[] {
    const selectedNodeUuid: string = this.selectedNodeUuid();
    const nodes: Node[] = this.LibDiagramState.$nodes.getValue();

    if (!selectedNodeUuid || nodes.length === 0) return [];

    // The selected node always goes in focus.
    // Add all the nodes the selected node is connected to...
    const focusedNodes: string[] = [selectedNodeUuid, ...nodes.find(n => n.id === selectedNodeUuid).adjacency];

    // ... and also all the nodes that connect to the selected one.
    nodes.forEach((node: Node) => {
      const adjacency: string[] = node.adjacency ?? [];
      if (adjacency.includes(selectedNodeUuid)) {
        focusedNodes.push(node.id);
      }
    });

    // Return unique values
    return [...new Set(focusedNodes)];
  }

  selectedNodeUuid(): string {
    const graphNodes: LayoutNode[] = this.graphNodes();
    const selectedNodeUuid: string = this.LibDiagramState.$selectedNodeUuid.getValue();

    return graphNodes.some(n => n.id === selectedNodeUuid) ? selectedNodeUuid : null;
  }

  parsedSearchQuery(): ParsedSearchQuery {
    const searchQuery: string = this.LibDiagramState.$searchQuery.getValue();

    return this.parseQuery(searchQuery);
  }

  searchNodeMatches(): { id: string, matches: NodeMatch[] }[] {
    const nodes: Node[] = this.LibDiagramState.$nodes.getValue();
    const parsed: ParsedSearchQuery | null = this.parsedSearchQuery();

    if (parsed) return this.searchTopology(nodes, parsed);

    return [];
  }

  selectedScale(): number {
    const layoutScalars: { circularInnerAngle: number; circularRadius: number; selectedScale: number; } = this.circularLayoutScalars();

    return layoutScalars.selectedScale;
  }

  selectedMetricId(): string {
    const availableMetrics: {id: string; label: string;}[] = this.availableMetrics();
    const metricType: string = this.selectedMetricType();

    return (availableMetrics.find(m => m.label === metricType) || {}).id;
  }

  selectedMetricType(): string {
    const pinnedMetricType: string = this.LibDiagramState.$pinnedMetricType.getValue();
    const hoveredMetricType: string = this.LibDiagramState.$hoveredMetricType.getValue();

    return hoveredMetricType ?? pinnedMetricType;
  }

  selectedNetworkNodesIds(): string[] {
    const nodeNetworks: Network[] = this.nodeNetworks();
    const selectedNetworkId: string = this.LibDiagramState.$selectedNetworkId.getValue();

    return nodeNetworks.filter(n => n.id === selectedNetworkId).map(n => n.nodeId);
  }

  activeTopologyOptions(): TopologyOption[] {
    const currentTopology: Topology = this.LibDiagramState.$currentTopology.getValue();
    const topologyOptions: TopologyOption[] = this.LibDiagramState.$topologyOptions.getValue();
    const currentTopologyId: string = this.LibDiagramState.$currentTopologyId.getValue();

    const parentTopologyId: string = currentTopology.parentId;

    return topologyOptions[parentTopologyId || currentTopologyId] ?? {};
  }

  translationToViewportCenter(): { x: number; y: number; } {
    const centerX: number = this.canvasDetailsHorizontalCenter();
    const centerY: number = this.canvasDetailsVerticalCenter();
    const zoomState: ZoomState = this.graphZoomState();

    const {
      scaleX, scaleY, translateX, translateY
    } = zoomState;

    return {
      x: (-translateX + centerX) / scaleX,
      y: (-translateY + centerY) / scaleY,
    };
  }

  canvasMargins(): SvgDomRect {
    return {
      bottom: 150, left: 80, right: 80, top: 220
    };
  }

  canvasWithDetailsWidth(): number {
    const canvasWidth: number = this.canvasWidth();

    return canvasWidth - 420 - 36;
  }

  canvasDetailsHorizontalCenter(): number {
    const width: number = this.canvasWithDetailsWidth();
    const canvasMargins: SvgDomRect = this.canvasMargins();

    return (width / 2) + canvasMargins.left;
  }

  canvasDetailsVerticalCenter(): number {
    const canvasHeight: number = this.canvasHeight();
    const canvasMargins: SvgDomRect = this.canvasMargins();

    return (canvasHeight / 2) + canvasMargins.top
  }

  canvasCircularExpanse(): number {
    const width: number = this.canvasWithDetailsWidth();
    const canvasHeight: number = this.canvasHeight();

    return Math.min(width, canvasHeight);
  }

  canvasWidth(): number {
    const viewport: SvgDomPos = this.LibDiagramState.$viewport.getValue();
    const margins: SvgDomRect = {bottom: 150, left: 80, right: 80, top: 220};

    return viewport.width - margins.top - margins.bottom
  }

  canvasHeight(): number {
    const viewport: SvgDomPos = this.LibDiagramState.$viewport.getValue();
    const margins: SvgDomRect = {bottom: 150, left: 80, right: 80, top: 220};

    return viewport.height - margins.top - margins.bottom
  }

  graphNodes(): LayoutNode[] {
    const layout: Layout = this.graphLayout();

    return layout.nodes;
  }

  graphEdges(): LayoutEdge[] {
    const layout: Layout = this.graphLayout();

    return layout.edges;
  }

  graphDefaultZoom(): { scaleX: number; scaleY: number; translateX: number; translateY: number; } {
    const boundingRectangle: { xMax: number; xMin: number; yMax: number; yMin: number; } = this.graphBoundingRectangle();
    const canvasMargins: SvgDomRect = this.canvasMargins();
    const canvasHeight: number = this.canvasHeight();
    const canvasWidth: number = this.canvasWidth();

    if (!boundingRectangle) return null;

    const {
      xMin, xMax, yMin, yMax
    } = boundingRectangle;
    const xFactor = canvasWidth / (xMax - xMin);
    const yFactor = canvasHeight / (yMax - yMin);

    // Initial zoom is such that the graph covers 90% of either the viewport,
    // or one half of maximal zoom constraint, whichever is smaller.
    const scale = Math.min(xFactor, yFactor, 200 / 100 / 2) * 0.9;

    // This translation puts the graph in the center of the viewport, respecting the margins.
    const translateX = ((canvasWidth - ((xMax + xMin) * scale)) / 2) + canvasMargins.left;
    const translateY = ((canvasHeight - ((yMax + yMin) * scale)) / 2) + canvasMargins.top;

    return {
      scaleX: scale,
      scaleY: scale,
      translateX,
      translateY,
    };
  }

  graphZoomState(): ZoomState {
    const graphDefaultZoom: { scaleX: number; scaleY: number; translateX: number; translateY: number; } = this.graphDefaultZoom();
    const cachedZoomState: ZoomState = this.LibDiagramState.$zoomState.getValue();

    return {...graphDefaultZoom, ...cachedZoomState};
  }

  graphBoundingRectangle(): { xMax: number; xMin: number; yMax: number; yMin: number; } {
    const graphNodes: LayoutNode[] = this.graphNodes();

    if (!graphNodes) return null;

    const xMin: number = Math.min(...graphNodes.map(n => n.x - 100), 0);
    const yMin: number = Math.min(...graphNodes.map(n => n.y - 100), 0);
    const xMax: number = Math.max(...graphNodes.map(n => n.x - 100), 0);
    const yMax: number = Math.max(...graphNodes.map(n => n.y - 100), 0);

    return {
      xMax, xMin, yMax, yMin
    };
  }

  graphLayout(): Layout {
    const layoutOptions: LayoutOptions = this.layoutOptions();

    const nodes: Node[] = this.LibDiagramState.$nodes.getValue();
    const visibleNodes: Node[] = nodes.filter(node => !node.filtered);

    if (visibleNodes.length === 0) return {
      edges: [],
      nodes: []
    };

    const edges: LayoutEdge[] = this.initEdgesFromNodes(nodes);

    // @ts-ignore nodes type
    return this.LibDiagramLayoutService.doLayout(nodes, edges, layoutOptions);
  }

  circularLayoutScalars(): { circularInnerAngle: number; circularRadius: number; selectedScale: number; } {
    const zoomState: ZoomState = this.graphZoomState();
    const focusedNodesIds: string[] = this.focusedNodesIds();
    const scale: number = zoomState.scaleX;
    const circularNodesCount: number = focusedNodesIds.length -1;
    const viewportExpanse: number = this.canvasCircularExpanse();

    // Here we calculate the zoom factor of the nodes that get selected into focus.
    // The factor is a somewhat arbitrary function (based on what looks good) of the
    // viewport dimensions and the number of nodes in the circular layout. The idea
    // is that the node should never be zoomed more than to cover 1/2 of the viewport
    // (`maxScale`) and then the factor gets decresed asymptotically to the inverse
    // square of the number of circular nodes, with a little constant push to make
    // the layout more stable for a small number of nodes. Finally, the zoom factor is
    // divided by the zoom factor applied to the whole topology layout to cancel it out.
    const maxScale: number = viewportExpanse / 100 / 2;
    const shrinkFactor: number = Math.sqrt(circularNodesCount + 10);
    const selectedScale: number = maxScale / shrinkFactor / scale;

    const radiusDensity = scaleThreshold()
      .domain([3, 6])
      .range([2.5, 3, 2.5]);

    // Following a similar logic as above, we set the radius of the circular
    // layout based on the viewport dimensions and the number of circular nodes.
    const circularRadius: number = viewportExpanse / radiusDensity(circularNodesCount) / scale;
    const circularInnerAngle: number = (2 * Math.PI) / circularNodesCount;

    return {circularInnerAngle, circularRadius, selectedScale};
  }

  layoutOptions(): LayoutOptions {
    const forceRelayout: boolean = this.LibDiagramState.$forceRelayout.getValue();
    const currentTopologyId: string = this.LibDiagramState.$currentTopologyId.getValue();
    const topologyOptions: TopologyOption[] = this.activeTopologyOptions();
    const canvasHeight: number = this.canvasHeight();
    const canvasWidth: number = this.canvasWidth();

    return {
      forceRelayout: forceRelayout,
      topologyId: currentTopologyId,
      topologyOptions: topologyOptions,
      height: canvasHeight,
      width: canvasWidth,
    }
  }

  layoutLimits(): LayoutLimits {
    const boundingRectangle: { xMax: number; xMin: number; yMax: number; yMin: number; } = this.graphBoundingRectangle();

    if (!boundingRectangle) return null;

    const {
      xMin, xMax, yMin, yMax
    } = boundingRectangle;

    return {
      contentMaxX: xMax,
      contentMaxY: yMax,
      contentMinX: xMin,
      contentMinY: yMin,
      maxScale: 200 / 100,
      minScale: 3 / 100,
    };
  }

  layoutNodes(): LayoutNode[] {
    const selectedNodeUuid: string = this.selectedNodeUuid();
    const focusedNodesIds: string[] = this.focusedNodesIds();
    const graphNodes: LayoutNode[] = this.graphNodes();
    const translationToCenter: { x: number; y: number; } = this.translationToViewportCenter();
    const layoutScalars: { circularInnerAngle: number; circularRadius: number; selectedScale: number; } = this.circularLayoutScalars();

    const {circularRadius, circularInnerAngle} = layoutScalars;
    const circularOffsetAngle = Math.PI / 4;

    // Do nothing if the layout doesn't contain the selected node anymore.
    if (!selectedNodeUuid) return graphNodes;

    // Fix the selected node in the viewport center.
    Object.assign(graphNodes[graphNodes.findIndex(n => n.id === selectedNodeUuid)], translationToCenter);

    let layoutNodes: LayoutNode[] = graphNodes;

    // Put the nodes that are adjacent to the selected one in a circular layout around it.
    const circularNodesIds: string[] = focusedNodesIds.filter(id => id !== selectedNodeUuid);
    layoutNodes = layoutNodes.map((node: LayoutNode) => {
      const index = circularNodesIds.findIndex(id => id === node.id);
      if (index > -1) {
        const angle: number = circularOffsetAngle + (index * circularInnerAngle);
        return node = {
          ...node,
          x: translationToCenter.x + (circularRadius * Math.sin(angle)),
          y: translationToCenter.y + (circularRadius * Math.cos(angle))
        };
      }
      return node;
    });

    return layoutNodes;
  }

  layoutEdges(): LayoutEdge[] {
    const graphEdges: LayoutEdge[] = this.graphEdges();
    const layoutNodes: LayoutNode[] = this.layoutNodes();
    const focusedNodesIds: string[] = this.focusedNodesIds();

    // Update the edges in the circular layout to link the nodes in a straight line.
    return graphEdges.map((edge: LayoutEdge) => {
      const source: string = edge.source;
      const target: string = edge.target;

      if (focusedNodesIds.includes(source) || focusedNodesIds.includes(target)) {

        const sourcePoints: {x, y} = layoutNodes.find(n => n.id === source);
        const targetPoints: {x, y} = layoutNodes.find(n => n.id === target);

        edge.points = [sourcePoints, targetPoints];
      }

      return edge;
    });
  }

  nodeMetric(): Metric[] {
    const nodes: Node[] = this.LibDiagramState.$nodes.getValue();
    const selectedMetricId: string = this.selectedMetricId();

    return nodes.map((node: Node): Metric => {

      return node.metrics && node.metrics
        .find(m => m.id === selectedMetricId);

    }).flat().filter(m => m);
  }

  availableMetrics(): {id: string; label: string;}[] {
    const nodes: Node[] = this.LibDiagramState.$nodes.getValue();

    return nodes
      .flatMap(n => n.metrics)
      .filter(m => m)
      .map(m => ({id: m.id, label: m.label}))
      .sort((a, b) => a.label.localeCompare(b.label));

  }

  nodeNetworks(): Network[] {
    const nodes: Node[] = this.LibDiagramState.$nodes.getValue();

    return nodes.map((node: Node): Network[] => {
      const metadata: Node['metadata'] = node.metadata ?? [];
      const networks: { id?: string; value?: string; } = metadata.find(f => f.id === 'docker_container_networks') ?? {};
      const networkValues: string[] = networks.value ? networks.value.split(', ') : [];

      return networkValues.map((network: string) => ({
        colorKey: network, id: network, label: network, nodeId: node.id
      }));
    }).flat();
  }

}
