import {Injectable} from '@angular/core';
import {List as makeList, Map as makeMap, OrderedMap as makeOrderedMap} from 'immutable';
import {GRAPH_VIEW_MODE} from 'weavescope/client/app/scripts/constants/naming';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private stateSource = new BehaviorSubject(makeMap({
    contrastMode: false,
    controlPipes: makeOrderedMap(), // pipeId -> controlPipe
    currentTopology: null,
    currentTopologyId: null,
    forceRelayout: false,
    hoveredMetricType: null,
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
    pinnedMetricType: null,
    pinnedNetwork: null,
    // list of node filters
    pinnedSearches: makeList(),
    searchQuery: '',
    selectedNetwork: null,
    selectedNodeId: null,
    showingNetworks: false,
    topologies: makeList(),
    topologiesLoaded: false,
    topologyOptions: makeOrderedMap(), // topologyId -> options
    topologyViewMode: GRAPH_VIEW_MODE,
    // Set some initial numerical values to prevent NaN in case of edgy race conditions.
    viewport: makeMap({height: 0, width: 0})
  }));
  currentState = this.stateSource.asObservable();

  private zoomCacheSource = new BehaviorSubject(makeMap({
    zoomCache: makeMap()
  }));
  currentZoomCache = this.zoomCacheSource.asObservable();

  init() {
    this.setState(makeMap({
      contrastMode: false,
      controlPipes: makeOrderedMap(), // pipeId -> controlPipe
      currentTopology: null,
      currentTopologyId: null,
      forceRelayout: false,
      hoveredMetricType: null,
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
      pinnedMetricType: null,
      pinnedNetwork: null,
      // list of node filters
      pinnedSearches: makeList(),
      searchQuery: '',
      selectedNetwork: null,
      selectedNodeId: null,
      showingNetworks: false,
      topologies: makeList(),
      topologiesLoaded: false,
      topologyOptions: makeOrderedMap(), // topologyId -> options
      topologyViewMode: GRAPH_VIEW_MODE,
      // Set some initial numerical values to prevent NaN in case of edgy race conditions.
      viewport: makeMap({height: 0, width: 0})
    }));
  }

  setState(data: any): void {
    this.stateSource.next(data);
  }

  setZoomState(data: any): void {
    this.zoomCacheSource.next(data);
  }

  constructor() {
  }
}
