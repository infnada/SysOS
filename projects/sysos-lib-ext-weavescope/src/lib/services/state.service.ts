import {Injectable} from '@angular/core';
import {List as makeList, Map as makeMap, OrderedMap as makeOrderedMap} from 'immutable';
import {GRAPH_VIEW_MODE} from 'weavescope/client/app/scripts/constants/naming';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private stateSource = new BehaviorSubject(makeMap({
    capabilities: makeMap(),
    contrastMode: false,
    controlPipes: makeOrderedMap(), // pipeId -> controlPipe
    controlStatus: makeMap(),
    currentTopology: null,
    currentTopologyId: null,
    errorUrl: null,
    exportingGraph: false,
    forceRelayout: false,
    gridSortedBy: null,
    gridSortedDesc: null,
    hostname: '...',
    hoveredMetricType: null,
    initialNodesLoaded: false,
    mouseOverEdgeId: null,
    mouseOverNodeId: null,
    nodeDetails: makeOrderedMap(), // nodeId -> details
    nodes: makeOrderedMap(), // nodeId -> node
    // nodes cache, infrequently updated, used for search & resource view
    // topologyId -> nodes
    nodesByTopology: makeMap(),
    nodesLoaded: false,
    // class of metric, e.g. 'cpu', rather than 'host_cpu' or 'process_cpu'.
    // allows us to keep the same metric "type" selected when the topology changes.
    pausedAt: null,
    pinnedMetricType: null,
    pinnedNetwork: null,
    // list of node filters
    pinnedSearches: makeList(),
    plugins: makeList(),
    routeSet: false,
    searchFocused: false,
    searchQuery: '',
    selectedNetwork: null,
    selectedNodeId: null,
    showingHelp: false,
    showingNetworks: false,
    showingTroubleshootingMenu: false,
    storeViewState: true,
    timeTravelTransitioning: false,
    topologies: makeList(),
    topologiesLoaded: false,
    topologyOptions: makeOrderedMap(), // topologyId -> options
    topologyUrlsById: makeOrderedMap(), // topologyId -> topologyUrl
    topologyViewMode: GRAPH_VIEW_MODE,
    version: null,
    versionUpdate: null,
    // Set some initial numerical values to prevent NaN in case of edgy race conditions.
    viewport: makeMap({height: 0, width: 0}),
    websocketClosed: false,
    zoomCache: makeMap(),
  }));
  currentState = this.stateSource.asObservable();

  init() {
    this.setState(makeMap({
      capabilities: makeMap(),
      contrastMode: false,
      controlPipes: makeOrderedMap(), // pipeId -> controlPipe
      controlStatus: makeMap(),
      currentTopology: null,
      currentTopologyId: null,
      errorUrl: null,
      exportingGraph: false,
      forceRelayout: false,
      gridSortedBy: null,
      gridSortedDesc: null,
      hostname: '...',
      hoveredMetricType: null,
      initialNodesLoaded: false,
      mouseOverEdgeId: null,
      mouseOverNodeId: null,
      nodeDetails: makeOrderedMap(), // nodeId -> details
      nodes: makeOrderedMap(), // nodeId -> node
      // nodes cache, infrequently updated, used for search & resource view
      // topologyId -> nodes
      nodesByTopology: makeMap(),
      nodesLoaded: false,
      // class of metric, e.g. 'cpu', rather than 'host_cpu' or 'process_cpu'.
      // allows us to keep the same metric "type" selected when the topology changes.
      pausedAt: null,
      pinnedMetricType: null,
      pinnedNetwork: null,
      // list of node filters
      pinnedSearches: makeList(),
      plugins: makeList(),
      routeSet: false,
      searchFocused: false,
      searchQuery: '',
      selectedNetwork: null,
      selectedNodeId: null,
      showingHelp: false,
      showingNetworks: false,
      showingTroubleshootingMenu: false,
      storeViewState: true,
      timeTravelTransitioning: false,
      topologies: makeList(),
      topologiesLoaded: false,
      topologyOptions: makeOrderedMap(), // topologyId -> options
      topologyUrlsById: makeOrderedMap(), // topologyId -> topologyUrl
      topologyViewMode: GRAPH_VIEW_MODE,
      version: null,
      versionUpdate: null,
      // Set some initial numerical values to prevent NaN in case of edgy race conditions.
      viewport: makeMap({height: 0, width: 0}),
      websocketClosed: false,
      zoomCache: makeMap(),
    }));
  }

  setState(data: any): void {
    this.stateSource.next(data);
  }

  constructor() {
  }
}
