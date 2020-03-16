import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

import {Topology} from '../types/topology';
import {TopologyOption} from '../types/topology-option';
import {Node} from '../types/node';
import {ZoomState} from '../types/zoom-state';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibDiagramStateService {
  readonly $viewport: BehaviorSubject<{ height: number; width: number; }>;
  readonly $zoomState: BehaviorSubject<ZoomState>;
  readonly $forceRelayout: BehaviorSubject<boolean>;
  readonly $showingNetworks: BehaviorSubject<boolean>;
  readonly $contrastMode: BehaviorSubject<boolean>;
  readonly $exportingGraph: BehaviorSubject<boolean>;
  readonly $currentTopology: BehaviorSubject<Topology>;
  readonly $topologies: BehaviorSubject<Topology[]>;
  readonly $topologiesLoaded: BehaviorSubject<boolean>;
  readonly $topologyOptions: BehaviorSubject<TopologyOption[]>;
  readonly $currentTopologyId: BehaviorSubject<string>;
  readonly $selectedNodeUuid: BehaviorSubject<string>;
  readonly $mouseOverEdgeId: BehaviorSubject<string>;
  readonly $mouseOverNodeId: BehaviorSubject<string>;
  readonly $searchQuery: BehaviorSubject<string>;
  readonly $pinnedSearches: BehaviorSubject<string[]>;
  readonly $selectedNetworkId: BehaviorSubject<string>;
  readonly $pinnedMetricType: BehaviorSubject<string>;
  readonly $hoveredMetricType: BehaviorSubject<string>;
  readonly $nodes: BehaviorSubject<Node[]>;
  readonly $nodesLoaded: BehaviorSubject<boolean>;
  private dataStore: {
    viewport: { height: number; width: number; };
    zoomState: ZoomState;
    forceRelayout: boolean;
    showingNetworks: boolean;
    contrastMode: boolean;
    exportingGraph: boolean;
    currentTopology: Topology;
    topologies: Topology[];
    topologiesLoaded: boolean;
    topologyOptions: TopologyOption[];
    currentTopologyId: string;
    selectedNodeUuid: string;
    mouseOverEdgeId: string;
    mouseOverNodeId: string;
    searchQuery: string;
    pinnedSearches: string[];
    selectedNetworkId: string;
    pinnedMetricType: string;
    hoveredMetricType: string;
    nodes: Node[];
    nodesLoaded: boolean;
  };
  readonly viewport: Observable<{ height: number; width: number; }>;
  readonly zoomState: Observable<ZoomState>;
  readonly forceRelayout: Observable<boolean>;
  readonly showingNetworks: Observable<boolean>;
  readonly contrastMode: Observable<boolean>;
  readonly exportingGraph: Observable<boolean>;
  readonly currentTopology: Observable<Topology>;
  readonly topologies: Observable<Topology[]>;
  readonly topologiesLoaded: Observable<boolean>;
  readonly topologyOptions: Observable<TopologyOption[]>;
  readonly currentTopologyId: Observable<string>;
  readonly selectedNodeUuid: Observable<string>;
  readonly mouseOverEdgeId: Observable<string>;
  readonly mouseOverNodeId: Observable<string>;
  readonly searchQuery: Observable<string>;
  readonly pinnedSearches: Observable<string[]>;
  readonly selectedNetworkId: Observable<string>;
  readonly pinnedMetricType: Observable<string>;
  readonly hoveredMetricType: Observable<string>;
  readonly nodes: Observable<Node[]>;
  readonly nodesLoaded: Observable<boolean>;

  constructor() {

    this.dataStore = {
      viewport: {
        height: 0,
        width: 0
      },
      // @ts-ignore
      zoomState: {},
      forceRelayout: false,
      showingNetworks: false,
      contrastMode: false,
      exportingGraph: false,
      currentTopology: null,
      topologies: [],
      topologiesLoaded: false,
      topologyOptions: null,
      currentTopologyId: null,
      selectedNodeUuid: null,
      mouseOverEdgeId: null,
      mouseOverNodeId: null,
      searchQuery: '',
      pinnedSearches: [],
      selectedNetworkId: null,
      pinnedMetricType: null,
      hoveredMetricType: null,
      nodes: [],
      nodesLoaded: false
    };
    this.$viewport = new BehaviorSubject(this.dataStore.viewport);
    this.$zoomState = new BehaviorSubject(this.dataStore.zoomState);
    this.$forceRelayout = new BehaviorSubject(this.dataStore.forceRelayout);
    this.$showingNetworks = new BehaviorSubject(this.dataStore.showingNetworks);
    this.$contrastMode = new BehaviorSubject(this.dataStore.contrastMode);
    this.$exportingGraph = new BehaviorSubject(this.dataStore.exportingGraph);
    this.$currentTopology = new BehaviorSubject(this.dataStore.currentTopology);
    this.$topologies = new BehaviorSubject(this.dataStore.topologies);
    this.$topologiesLoaded = new BehaviorSubject(this.dataStore.topologiesLoaded);
    this.$topologyOptions = new BehaviorSubject(this.dataStore.topologyOptions);
    this.$currentTopologyId = new BehaviorSubject(this.dataStore.currentTopologyId);
    this.$selectedNodeUuid = new BehaviorSubject(this.dataStore.selectedNodeUuid);
    this.$mouseOverEdgeId = new BehaviorSubject(this.dataStore.mouseOverEdgeId);
    this.$mouseOverNodeId = new BehaviorSubject(this.dataStore.mouseOverNodeId);
    this.$searchQuery = new BehaviorSubject(this.dataStore.searchQuery);
    this.$pinnedSearches = new BehaviorSubject(this.dataStore.pinnedSearches);
    this.$selectedNetworkId = new BehaviorSubject(this.dataStore.selectedNetworkId);
    this.$pinnedMetricType = new BehaviorSubject(this.dataStore.pinnedMetricType);
    this.$hoveredMetricType = new BehaviorSubject(this.dataStore.hoveredMetricType);
    this.$nodes = new BehaviorSubject(this.dataStore.nodes);
    this.$nodesLoaded = new BehaviorSubject(this.dataStore.nodesLoaded);
    this.viewport = this.$viewport.asObservable();
    this.zoomState = this.$zoomState.asObservable();
    this.forceRelayout = this.$forceRelayout.asObservable();
    this.showingNetworks = this.$showingNetworks.asObservable();
    this.contrastMode = this.$contrastMode.asObservable();
    this.exportingGraph = this.$exportingGraph.asObservable();
    this.currentTopology = this.$currentTopology.asObservable();
    this.topologies = this.$topologies.asObservable();
    this.topologiesLoaded = this.$topologiesLoaded.asObservable();
    this.topologyOptions = this.$topologyOptions.asObservable();
    this.currentTopologyId = this.$currentTopologyId.asObservable();
    this.selectedNodeUuid = this.$selectedNodeUuid.asObservable();
    this.mouseOverEdgeId = this.$mouseOverEdgeId.asObservable();
    this.mouseOverNodeId = this.$mouseOverNodeId.asObservable();
    this.searchQuery = this.$searchQuery.asObservable();
    this.pinnedSearches = this.$pinnedSearches.asObservable();
    this.selectedNetworkId = this.$selectedNetworkId.asObservable();
    this.pinnedMetricType = this.$pinnedMetricType.asObservable();
    this.hoveredMetricType = this.$hoveredMetricType.asObservable();
    this.nodes = this.$nodes.asObservable();
    this.nodesLoaded = this.$nodesLoaded.asObservable();
  }

  setViewport(viewport: { height: number; width: number; }): void {
    this.dataStore.viewport = viewport;

    // broadcast data to subscribers
    this.$viewport.next(Object.assign({}, this.dataStore).viewport);
  }

  setZoomState(zoomState: ZoomState): void {
    this.dataStore.zoomState = zoomState;

    // broadcast data to subscribers
    this.$zoomState.next(Object.assign({}, this.dataStore).zoomState);
  }

  setForceRelayout(forceRelayout: boolean): void {
    this.dataStore.forceRelayout = forceRelayout;

    // broadcast data to subscribers
    this.$forceRelayout.next(Object.assign({}, this.dataStore).forceRelayout);
  }

  setSelectedNodeUuid(selectedNodeUuid: string): void {
    if (this.dataStore.selectedNodeUuid === selectedNodeUuid) return;

    this.dataStore.selectedNodeUuid = selectedNodeUuid;

    // broadcast data to subscribers
    this.$selectedNodeUuid.next(Object.assign({}, this.dataStore).selectedNodeUuid);
  }

  setMouseOverEdgeId(mouseOverEdgeId: string): void {
    if (this.dataStore.mouseOverEdgeId === mouseOverEdgeId) return;

    this.dataStore.mouseOverEdgeId = mouseOverEdgeId;

    // broadcast data to subscribers
    this.$mouseOverEdgeId.next(Object.assign({}, this.dataStore).mouseOverEdgeId);
  }

  setMouseOverNodeId(mouseOverNodeId: string): void {
    if (this.dataStore.mouseOverNodeId === mouseOverNodeId) return;

    this.dataStore.mouseOverNodeId = mouseOverNodeId;

    // broadcast data to subscribers
    this.$mouseOverNodeId.next(Object.assign({}, this.dataStore).mouseOverNodeId);
  }

  setCurrentTopologyId(currentTopologyId: string): void {
    this.dataStore.currentTopologyId = currentTopologyId;

    // broadcast data to subscribers
    this.$currentTopologyId.next(Object.assign({}, this.dataStore).currentTopologyId);
  }

  setCurrentTopology(currentTopology: Topology): void {
    this.dataStore.currentTopology = currentTopology;

    // broadcast data to subscribers
    this.$currentTopology.next(Object.assign({}, this.dataStore).currentTopology);
  }

  setTopologyOptions(topologyOptions: TopologyOption[]): void {
    this.dataStore.topologyOptions = topologyOptions;

    // broadcast data to subscribers
    this.$topologyOptions.next(Object.assign({}, this.dataStore).topologyOptions);
  }

  setTopologiesLoaded(topologiesLoaded: boolean): void {
    this.dataStore.topologiesLoaded = topologiesLoaded;

    // broadcast data to subscribers
    this.$topologiesLoaded.next(Object.assign({}, this.dataStore).topologiesLoaded);
  }

  setTopologies(topologies: Topology[]): void {
    this.dataStore.topologies = topologies;

    // broadcast data to subscribers
    this.$topologies.next(Object.assign({}, this.dataStore).topologies);
  }

  setNodes(nodes: Node[]): void {
    this.dataStore.nodes = nodes;

    // broadcast data to subscribers
    this.$nodes.next(Object.assign({}, this.dataStore).nodes);
  }

  setNodesLoaded(nodesLoaded: boolean): void {
    this.dataStore.nodesLoaded = nodesLoaded;

    // broadcast data to subscribers
    this.$nodesLoaded.next(Object.assign({}, this.dataStore).nodesLoaded);
  }

  setHoveredMetricType(metricType: string): void {
    this.dataStore.hoveredMetricType = metricType;

    // broadcast data to subscribers
    this.$hoveredMetricType.next(Object.assign({}, this.dataStore).hoveredMetricType);
  }

  setPinnedMetricType(metricType: string): void {
    this.dataStore.pinnedMetricType = metricType;

    // broadcast data to subscribers
    this.$pinnedMetricType.next(Object.assign({}, this.dataStore).pinnedMetricType);
  }

  setPinnedSearches(pinnedSearches: string[]): void {
    this.dataStore.pinnedSearches = pinnedSearches;

    // broadcast data to subscribers
    this.$pinnedSearches.next(Object.assign({}, this.dataStore).pinnedSearches);
  }

  setSearchQuery(searchQuery: string): void {
    this.dataStore.searchQuery = searchQuery;

    // broadcast data to subscribers
    this.$searchQuery.next(Object.assign({}, this.dataStore).searchQuery);
  }

}
