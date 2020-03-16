import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';

import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {debounce} from 'lodash-es';

import {AnyOpsOSLibDiagramStateService} from '../../../services/anyopsos-lib-diagram-state.service';
import {AnyOpsOSLibDiagramService} from '../../../services/anyopsos-lib-diagram.service';
import {
  BLURRED_EDGES_LAYER,
  BLURRED_NODES_LAYER,
  HIGHLIGHTED_EDGES_LAYER,
  HIGHLIGHTED_NODES_LAYER,
  HOVERED_EDGES_LAYER, HOVERED_NODES_LAYER,
  NORMAL_EDGES_LAYER,
  NORMAL_NODES_LAYER
} from '../../../anyopsos-lib-diagram.constants';

import {Node} from '../../../types/node';
import {LayoutNode} from '../../../types/layout-node';
import {LayoutEdge} from '../../../types/layout-edge';
import {Network} from '../../../types/network';
import {Metric} from '../../../types/metric';
import {NodeMatch} from '../../../types/node-match';

@Component({
  selector: '[aldiagram-nodes-chart-elements]',
  templateUrl: './nodes-chart-elements.component.html',
  styleUrls: ['./nodes-chart-elements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodesChartElementsComponent implements OnInit, OnDestroy {
  private readonly destroySubject$: Subject<void> = new Subject();

  private hasSelectedNode: boolean;
  private highlightedEdgeIds: string[] = [];
  private highlightedNodeIds: string[] = [];
  private layoutEdges: LayoutEdge[] = [];
  private layoutNodes: LayoutNode[] = [];
  private mouseOverEdgeId: string = null;
  private mouseOverNodeId: string = null;
  private neighborsOfSelectedNode: string[];
  private nodeMetric: Metric[];
  private nodeNetworks: Network[];
  private nodes: Node[];
  private searchNodeMatches: { id: string, matches: NodeMatch[] }[];
  private searchQuery: string;
  private selectedNetworkId: string;
  private selectedNetworkNodesIds: string[];
  private selectedNodeUuid: string;
  private selectedScale: number;

  isAnimated: boolean;

  readonly orderedElements$: Subject<any[]> = new Subject();

  private readonly debouncedRecalculateElements: debounce = debounce(this.recalculateElements.bind(this), 500);

  constructor(private readonly LibDiagram: AnyOpsOSLibDiagramService,
              private readonly LibDiagramState: AnyOpsOSLibDiagramStateService) {
  }

  ngOnInit(): void {

    // Listen for state changes. Update nodes if needed
    combineLatest(
      this.LibDiagramState.mouseOverEdgeId,
      this.LibDiagramState.mouseOverNodeId
    ).pipe(takeUntil(this.destroySubject$)).subscribe(([mouseOverEdgeId, mouseOverNodeId]) => {

      this.mouseOverEdgeId = mouseOverEdgeId;
      this.mouseOverNodeId = mouseOverNodeId;

      this.highlightedEdgeIds = this.LibDiagram.highlightedEdgeIds();
      this.highlightedNodeIds = this.LibDiagram.highlightedNodeIds();

      this.debouncedRecalculateElements();
    });

    // Listen for state changes. Update nodes if needed
    combineLatest(
      this.LibDiagramState.nodes,
      this.LibDiagramState.searchQuery
    ).pipe(takeUntil(this.destroySubject$)).subscribe(([nodes, searchQuery]) => {

      this.searchQuery = searchQuery;

      this.searchNodeMatches = this.LibDiagram.searchNodeMatches();

      this.debouncedRecalculateElements();
    });

    // Listen for state changes. Update nodes if needed
    combineLatest(
      this.LibDiagramState.selectedNodeUuid,
      this.LibDiagramState.nodes,
      this.LibDiagramState.selectedNetworkId
    ).pipe(takeUntil(this.destroySubject$)).subscribe(([selectedNodeUuid, nodes, selectedNetworkId]) => {

      this.selectedNodeUuid = selectedNodeUuid;
      this.nodes = nodes;
      this.selectedNetworkId = selectedNetworkId;

      this.hasSelectedNode = this.hasSelectedNodeFn();
      this.isAnimated = false; // !this.Selectors.graphExceedsComplexityThreshSelector(state);
      this.neighborsOfSelectedNode = this.getAdjacentNodes();
      this.nodeMetric = this.LibDiagram.nodeMetric();
      this.nodeNetworks = this.LibDiagram.nodeNetworks();
      this.selectedNetworkNodesIds = this.LibDiagram.selectedNetworkNodesIds();
      this.selectedScale = this.LibDiagram.selectedScale();
      this.layoutEdges = this.LibDiagram.layoutEdges();
      this.layoutNodes = this.LibDiagram.layoutNodes();

      this.debouncedRecalculateElements();
    });
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  private recalculateElements() {

    console.log('recalculate');
    this.layoutNodes
      .map(n => this.nodeHighlightedDecorator(n))
      .map(n => this.nodeFocusedDecorator(n))
      .map(n => this.nodeBlurredDecorator(n))
      .map(n => this.nodeMatchesDecorator(n))
      .map(n => this.nodeNetworksDecorator(n))
      .map(n => this.nodeMetricDecorator(n))
      .map(n => this.nodeScaleDecorator(n));

    const dnodes = this.layoutNodes.reduce((r, v, i, a, layer = this.nodeDisplayLayer(v)) => {
      (r[layer] || (r[layer] = [])).push(v);
      return r;
    }, {});

    this.layoutEdges
      .map(e => this.edgeHighlightedDecorator(e))
      .map(e => this.edgeFocusedDecorator(e))
      .map(e => this.edgeBlurredDecorator(e))
      .map(e => this.edgeScaleDecorator(e));

    const dedges = this.layoutEdges.reduce((r, v, i, a, layer = this.edgeDisplayLayer(v)) => {
      (r[layer] || (r[layer] = [])).push(v);
      return r;
    }, {});

    // NOTE: The elements need to be arranged into a single array outside
    // of DOM structure for React rendering engine to do smart rearrangements
    // without unnecessary re-rendering of the elements themselves. So e.g.
    // rendering the element layers individually below would be significantly slower.
    this.orderedElements$.next([
      ...(dedges[BLURRED_EDGES_LAYER] ?? []),
      ...(dnodes[BLURRED_NODES_LAYER] ?? []),
      ...[{isActive: !!dnodes[BLURRED_NODES_LAYER], isOverlay: true, id: 'overlay'}],
      ...(dedges[NORMAL_EDGES_LAYER] ?? []),
      ...(dnodes[NORMAL_NODES_LAYER] ?? []),
      ...(dedges[HIGHLIGHTED_EDGES_LAYER] ?? []),
      ...(dnodes[HIGHLIGHTED_NODES_LAYER] ?? []),
      ...(dedges[HOVERED_EDGES_LAYER] ?? []),
      ...(dnodes[HOVERED_NODES_LAYER] ?? []),
    ]);
  }

  getScale() {
    return `scale(${(this.selectedScale || 1) * 100000})`;
  }

  trackElementBy(index: number, element: LayoutNode): string {
    return `${element.id}-${element.focused}-${element.highlighted}`;
  }

  private getAdjacentNodes(originNodeId?: string): string[] {
    let adjacentNodes: string[] = [];
    const nodeId: string = originNodeId ?? this.selectedNodeUuid;

    if (nodeId) {
      const currentNode: Node = this.nodes.find(n => n.id === nodeId);

      if (currentNode) {
        adjacentNodes.push(...currentNode.adjacency);

        // fill up set with reverse edges
        this.nodes.forEach((node: Node) => {
          if (node.adjacency && node.adjacency.includes(nodeId)) {
            adjacentNodes.push(node.id);
          }
        });
      }
    }

    return adjacentNodes;
  }

  private hasSelectedNodeFn(): boolean {
    return this.nodes.some(n => n.id === this.selectedNodeUuid);
  }

  private nodeDisplayLayer(node: LayoutNode) {
    if (node.id === this.mouseOverNodeId) return HOVERED_NODES_LAYER;
    if (node.blurred && !node.focused) return BLURRED_NODES_LAYER;
    if (node.highlighted) return HIGHLIGHTED_NODES_LAYER;
    return NORMAL_NODES_LAYER;
  }

  private edgeDisplayLayer(edge: LayoutEdge) {
    if (edge.id === this.mouseOverEdgeId) return HOVERED_EDGES_LAYER;
    if (edge.blurred && !edge.focused) return BLURRED_EDGES_LAYER;
    if (edge.highlighted) return HIGHLIGHTED_EDGES_LAYER;
    return NORMAL_EDGES_LAYER;
  }

  private nodeHighlightedDecorator(node: LayoutNode): LayoutNode {
    const nodeSelected: boolean = this.selectedNodeUuid === node.id;
    const nodeHighlighted: boolean = this.highlightedNodeIds.includes(node.id);
    node.highlighted = nodeHighlighted || nodeSelected;

    return node;
  }

  private nodeFocusedDecorator(node: LayoutNode): LayoutNode {
    const nodeSelected: boolean = this.selectedNodeUuid === node.id;
    const isNeighborOfSelected: boolean = this.neighborsOfSelectedNode.includes(node.id);
    node.focused = nodeSelected || isNeighborOfSelected;

    return node;
  }

  private nodeBlurredDecorator(node: LayoutNode): LayoutNode {
    const belongsToNetwork = this.selectedNetworkNodesIds.includes(node.id);
    const noMatches: boolean = !this.searchNodeMatches.some(n => n.id === node.id);
    const notMatched: boolean = this.searchQuery && !node.highlighted && noMatches;
    const notFocused: boolean = this.selectedNodeUuid && !node.focused;
    const notInNetwork: boolean = this.selectedNetworkId && !belongsToNetwork;
    node.blurred = notMatched || notFocused || notInNetwork;

    return node;
  }

  private nodeMatchesDecorator(node: LayoutNode): LayoutNode {
    node.matches = (this.searchNodeMatches.find(n => n.id === node.id) || {}).matches;

    return node;
  }

  private nodeNetworksDecorator(node: LayoutNode): LayoutNode {
    node.networks = this.nodeNetworks.filter((network: Network) => network.nodeId === node.id);

    return node;
  }

  private nodeMetricDecorator(node: LayoutNode): LayoutNode {
    node.metric = this.nodeMetric.find((metric: Metric) => metric.id === node.id);

    return node;
  }

  private nodeScaleDecorator(node: LayoutNode): LayoutNode {
    node.scale = node.focused ? this.selectedScale : 1;

    return node;
  }

  private edgeHighlightedDecorator(edge: LayoutEdge): LayoutEdge {
    edge.highlighted = this.highlightedEdgeIds.includes(edge.id);

    return edge;
  }

  private edgeFocusedDecorator(edge: LayoutEdge): LayoutEdge {
    const sourceSelected: boolean = this.selectedNodeUuid === edge.source;
    const targetSelected: boolean = this.selectedNodeUuid === edge.target;
    edge.focused = this.hasSelectedNode && (sourceSelected || targetSelected);

    return edge;
  }

  private edgeBlurredDecorator(edge: LayoutEdge): LayoutEdge {
    const sourceSelected: boolean = this.selectedNodeUuid === edge.source;
    const targetSelected: boolean = this.selectedNodeUuid === edge.target;
    const otherNodesSelected: boolean = this.hasSelectedNode && !sourceSelected && !targetSelected;
    const sourceNoMatches: boolean = !this.searchNodeMatches.some(n => n.id === edge.source);
    const targetNoMatches: boolean = !this.searchNodeMatches.some(n => n.id === edge.target);
    const notMatched: boolean = this.searchQuery && (sourceNoMatches || targetNoMatches);
    const sourceInNetwork: boolean = this.selectedNetworkNodesIds.includes(edge.source);
    const targetInNetwork: boolean = this.selectedNetworkNodesIds.includes(edge.target);
    const notInNetwork: boolean = this.selectedNetworkId && (!sourceInNetwork || !targetInNetwork);
    edge.blurred = !edge.highlighted && !edge.focused && (otherNodesSelected || notMatched || notInNetwork);

    return edge;
  }

  private edgeScaleDecorator(edge: LayoutEdge): LayoutEdge {
    edge.scale = edge.focused ? this.selectedScale : 1;

    return edge;
  }

}
