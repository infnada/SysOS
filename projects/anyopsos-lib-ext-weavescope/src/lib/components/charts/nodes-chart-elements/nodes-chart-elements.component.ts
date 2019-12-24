import {Component, OnDestroy} from '@angular/core';
import {fromJS, Map as makeMap, List as makeList, Set as makeSet} from 'immutable';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {
  BLURRED_EDGES_LAYER,
  BLURRED_NODES_LAYER,
  NORMAL_EDGES_LAYER,
  NORMAL_NODES_LAYER,
  HIGHLIGHTED_EDGES_LAYER,
  HIGHLIGHTED_NODES_LAYER,
  HOVERED_EDGES_LAYER,
  HOVERED_NODES_LAYER,
} from 'weavescope/client/app/scripts/constants/naming';

import {StateService} from '../../../services/state.service';
import {SelectorsService} from '../../../services/selectors.service';

@Component({
  selector: '[slews-nodes-chart-elements]',
  templateUrl: './nodes-chart-elements.component.html',
  styleUrls: ['./nodes-chart-elements.component.scss']
})
export class NodesChartElementsComponent implements OnDestroy {
  private destroySubject$: Subject<void> = new Subject();
  private state;

  hasSelectedNode;
  highlightedEdgeIds;
  highlightedNodeIds;
  isAnimated;
  layoutEdges;
  layoutNodes;
  mouseOverEdgeId;
  mouseOverNodeId;
  neighborsOfSelectedNode;
  nodeMetric;
  nodeNetworks;
  searchNodeMatches;
  searchQuery;
  selectedNetwork;
  selectedNetworkNodesIds;
  selectedNodeId;
  selectedScale;

  orderedElements;

  constructor(private State: StateService,
              private Selectors: SelectorsService) {
    // tslint:disable-next-line
    const _this = this;

    function getAdjacentNodes(state, originNodeId?) {
      let adjacentNodes = makeSet();
      const nodeId = originNodeId || state.get('selectedNodeId');

      if (nodeId) {
        if (state.hasIn(['nodes', nodeId])) {
          adjacentNodes = makeSet(state.getIn(['nodes', nodeId, 'adjacency']));
          // fill up set with reverse edges
          state.get('nodes').forEach((node, id) => {
            if (node.get('adjacency') && node.get('adjacency').includes(nodeId)) {
              adjacentNodes = adjacentNodes.add(id);
            }
          });
        }
      }

      return adjacentNodes;
    }

    function hasSelectedNodeFn(state) {
      const selectedNodeId = state.get('selectedNodeId');
      return state.hasIn(['nodes', selectedNodeId]);
    }

    function nodeDisplayLayer(node) {
      if (node.get('id') === _this.mouseOverNodeId) {
        return HOVERED_NODES_LAYER;
      }
      if (node.get('blurred') && !node.get('focused')) {
        return BLURRED_NODES_LAYER;
      }
      if (node.get('highlighted')) {
        return HIGHLIGHTED_NODES_LAYER;
      }
      return NORMAL_NODES_LAYER;
    }

    function edgeDisplayLayer(edge) {
      if (edge.get('id') === _this.mouseOverEdgeId) {
        return HOVERED_EDGES_LAYER;
      }
      if (edge.get('blurred') && !edge.get('focused')) {
        return BLURRED_EDGES_LAYER;
      }
      if (edge.get('highlighted')) {
        return HIGHLIGHTED_EDGES_LAYER;
      }
      return NORMAL_EDGES_LAYER;
    }

    function nodeHighlightedDecorator(node) {
      const nodeSelected = (_this.selectedNodeId === node.get('id'));
      const nodeHighlighted = _this.highlightedNodeIds.has(node.get('id'));
      return node.set('highlighted', nodeHighlighted || nodeSelected);
    }

    function nodeFocusedDecorator(node) {
      const nodeSelected = (_this.selectedNodeId === node.get('id'));
      const isNeighborOfSelected = _this.neighborsOfSelectedNode.includes(node.get('id'));
      return node.set('focused', nodeSelected || isNeighborOfSelected);
    }

    function nodeBlurredDecorator(node) {
      const belongsToNetwork = _this.selectedNetworkNodesIds.contains(node.get('id'));
      const noMatches = _this.searchNodeMatches.get(node.get('id'), makeMap()).isEmpty();
      const notMatched = (_this.searchQuery && !node.get('highlighted') && noMatches);
      const notFocused = (_this.selectedNodeId && !node.get('focused'));
      const notInNetwork = (_this.selectedNetwork && !belongsToNetwork);
      return node.set('blurred', notMatched || notFocused || notInNetwork);
    }

    function nodeMatchesDecorator(node) {
      return node.set('matches', _this.searchNodeMatches.get(node.get('id')));
    }

    function nodeNetworksDecorator(node) {
      return node.set('networks', _this.nodeNetworks.get(node.get('id')));
    }

    function nodeMetricDecorator(node) {
      return node.set('metric', _this.nodeMetric.get(node.get('id')));
    }

    function nodeScaleDecorator(node) {
      return node.set('scale', node.get('focused') ? _this.selectedScale : 1);
    }

    function edgeHighlightedDecorator(edge) {
      return edge.set('highlighted', _this.highlightedEdgeIds.has(edge.get('id')));
    }

    function edgeFocusedDecorator(edge) {
      const sourceSelected = (_this.selectedNodeId === edge.get('source'));
      const targetSelected = (_this.selectedNodeId === edge.get('target'));
      return edge.set('focused', _this.hasSelectedNode && (sourceSelected || targetSelected));
    }

    function edgeBlurredDecorator(edge) {
      const {selectedNodeId, searchNodeMatches, selectedNetworkNodesIds} = _this;
      const sourceSelected = (selectedNodeId === edge.get('source'));
      const targetSelected = (selectedNodeId === edge.get('target'));
      const otherNodesSelected = _this.hasSelectedNode && !sourceSelected && !targetSelected;
      const sourceNoMatches = searchNodeMatches.get(edge.get('source'), makeMap()).isEmpty();
      const targetNoMatches = searchNodeMatches.get(edge.get('target'), makeMap()).isEmpty();
      const notMatched = _this.searchQuery && (sourceNoMatches || targetNoMatches);
      const sourceInNetwork = selectedNetworkNodesIds.contains(edge.get('source'));
      const targetInNetwork = selectedNetworkNodesIds.contains(edge.get('target'));
      const notInNetwork = _this.selectedNetwork && (!sourceInNetwork || !targetInNetwork);
      return edge.set('blurred', !edge.get('highlighted') && !edge.get('focused')
        && (otherNodesSelected || notMatched || notInNetwork));
    }

    function edgeScaleDecorator(edge) {
      return edge.set('scale', edge.get('focused') ? _this.selectedScale : 1);
    }

    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => {
      this.state = state;

      this.hasSelectedNode = hasSelectedNodeFn(state);
      this.highlightedEdgeIds = this.Selectors.highlightedEdgeIdsSelector(state);
      this.highlightedNodeIds = this.Selectors.highlightedNodeIdsSelector(state);
      this.isAnimated = false; // !this.Selectors.graphExceedsComplexityThreshSelector(state);
      this.layoutEdges = this.Selectors.layoutEdgesSelector(state);
      this.layoutNodes = this.Selectors.layoutNodesSelector(state);
      this.mouseOverEdgeId = this.state.get('mouseOverEdgeId');
      this.mouseOverNodeId = this.state.get('mouseOverNodeId');
      this.neighborsOfSelectedNode = getAdjacentNodes(state);
      this.nodeMetric = this.Selectors.nodeMetricSelector(state);
      this.nodeNetworks = this.Selectors.nodeNetworksSelector(state);
      this.searchNodeMatches = this.Selectors.searchNodeMatchesSelector(state);
      this.searchQuery = this.state.get('searchQuery');
      this.selectedNetwork = this.state.get('selectedNetwork');
      this.selectedNetworkNodesIds = this.Selectors.selectedNetworkNodesIdsSelector(state);
      this.selectedNodeId = this.state.get('selectedNodeId');
      this.selectedScale = this.Selectors.selectedScaleSelector(state);

      const nodes = this.layoutNodes.toIndexedSeq()
        .map(nodeHighlightedDecorator)
        .map(nodeFocusedDecorator)
        .map(nodeBlurredDecorator)
        .map(nodeMatchesDecorator)
        .map(nodeNetworksDecorator)
        .map(nodeMetricDecorator)
        .map(nodeScaleDecorator)
        .groupBy(nodeDisplayLayer);

      const edges = this.layoutEdges.toIndexedSeq()
        .map(edgeHighlightedDecorator)
        .map(edgeFocusedDecorator)
        .map(edgeBlurredDecorator)
        .map(edgeScaleDecorator)
        .groupBy(edgeDisplayLayer);

      // NOTE: The elements need to be arranged into a single array outside
      // of DOM structure for React rendering engine to do smart rearrangements
      // without unnecessary re-rendering of the elements themselves. So e.g.
      // rendering the element layers individually below would be significantly slower.
      this.orderedElements = makeList([
        edges.get(BLURRED_EDGES_LAYER, makeList()),
        nodes.get(BLURRED_NODES_LAYER, makeList()),
        fromJS([{isActive: !!nodes.get(BLURRED_NODES_LAYER), isOverlay: true}]),
        edges.get(NORMAL_EDGES_LAYER, makeList()),
        nodes.get(NORMAL_NODES_LAYER, makeList()),
        edges.get(HIGHLIGHTED_EDGES_LAYER, makeList()),
        nodes.get(HIGHLIGHTED_NODES_LAYER, makeList()),
        edges.get(HOVERED_EDGES_LAYER, makeList()),
        nodes.get(HOVERED_NODES_LAYER, makeList()),
      ]).flatten(true);
    });
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getScale() {
    return `scale(${(this.selectedScale || 1) * 100000})`;
  }

  trackElementBy(index, element) {
    return element.get('id');
    // return index;
  }
}
