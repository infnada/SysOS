import {Injectable, OnDestroy} from '@angular/core';
import {fromJS, List as makeList, Map as makeMap, OrderedMap as makeOrderedMap} from 'immutable';
import {includes} from 'lodash-es';
import {StateService} from './state.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TopologyUtilsService} from './utils/topology-utils.service';

@Injectable({
  providedIn: 'root'
})
export class InitService implements OnDestroy {
  private destroySubject$: Subject<void> = new Subject();
  private state;

  private topologies;

  constructor(private State: StateService,
              private TopologyUtils: TopologyUtilsService) {
    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => this.state = state);

    this.calcSelectType = this.calcSelectType.bind(this);
    this.updateStateFromNodes = this.updateStateFromNodes.bind(this);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  updateStateFromNodes() {
    // Apply pinned searches, filters nodes that dont match.
    // this.state = applyPinnedSearches(state);

    // In case node or edge disappears before mouseleave event.
    const nodesIds = this.state.get('nodes').keySeq();
    if (!nodesIds.contains(this.state.get('mouseOverNodeId'))) {
      this.state = this.state.set('mouseOverNodeId', null);
    }
    if (!nodesIds.some(nodeId => includes(this.state.get('mouseOverEdgeId'), nodeId))) {
      this.state = this.state.set('mouseOverEdgeId', null);
    }

    const nodesForCurrentTopologyKey = ['nodesByTopology', this.state.get('currentTopologyId')];
    this.state = this.state.setIn(nodesForCurrentTopologyKey, this.state.get('nodes'));

    this.state = this.state.set('forceRelayout', false);

    this.State.setState(this.state);
  }

  init(nodes, topologies) {
    this.topologies = topologies;

    this.processTopologies();

    const currentTopologyId = this.state.get('currentTopologyId');
    if (!currentTopologyId || !this.TopologyUtils.findTopologyById(this.state.get('topologies'), currentTopologyId)) {
      this.state = this.state.set('currentTopologyId', this.getDefaultTopology(this.state.get('topologies')));
    }
    this.state = this.TopologyUtils.setTopology(this.state, this.state.get('currentTopologyId'));

    // Expand topology options with topologies' defaults on first load, but let
    // the current state of topologyOptions (which at this point reflects the
    // URL state) still take the precedence over defaults.
    if (!this.state.get('topologiesLoaded')) {
      const options = this.getDefaultTopologyOptions().mergeDeep(this.state.get('topologyOptions'));
      this.state = this.state.set('topologyOptions', options);
      this.state = this.state.set('topologiesLoaded', true);
    }

    this.state = this.state.set('nodes', fromJS(nodes));
    this.state = this.state.set('nodesLoaded', true);

    const nodesForCurrentTopologyKey = ['nodesByTopology', this.state.get('currentTopologyId')];
    this.state = this.state.setIn(nodesForCurrentTopologyKey, this.state.get('nodes'));

    this.State.setState(this.state);
  }

  getDefaultTopologyOptions() {
    let topologyOptions = makeOrderedMap();
    this.state.get('topologies').forEach((topology) => {
      let defaultOptions = makeOrderedMap();
      if (topology.has('options') && topology.get('options')) {
        topology.get('options').forEach((option) => {
          const optionId = option.get('id');
          const defaultValue = option.get('defaultValue');
          defaultOptions = defaultOptions.set(optionId, [defaultValue]);
        });
      }
      if (defaultOptions.size) {
        topologyOptions = topologyOptions.set(topology.get('id'), defaultOptions);
      }
    });
    return topologyOptions;
  }

  getDefaultTopology(topologies) {
    const flatTopologies = topologies
      .flatMap(t => makeList([t]).concat(t.get('sub_topologies', makeList())));

    const TOPOLOGY_DISPLAY_PRIORITY = [
      'all',
      'nodes',
      'virtualmachines',
      'pods',
      'volumes',
      'standalone'
    ];

    console.log(flatTopologies);

    return flatTopologies
      .sortBy((t) => {
        const index = TOPOLOGY_DISPLAY_PRIORITY.indexOf(t.get('id'));
        return index === -1 ? Infinity : index;
      })
      .getIn([0, 'id']);
  }

  processTopologies() {
    const topologies = this.topologies;

    // add IDs to topology objects in-place
    const topologiesWithId = this.updateTopologyIds(topologies);
    // filter out hidden topos
    const visibleTopologies = this.filterHiddenTopologies(topologiesWithId, this.state.get('currentTopology'));
    // set `selectType` field for topology and sub_topologies options (recursive).
    const topologiesWithSelectType = visibleTopologies.map(this.calcSelectType);

    const topologiesWithFullnames = this.addTopologyFullname(topologiesWithSelectType);
    const immNextTopologies = fromJS(topologiesWithFullnames).sortBy(topology => topology.get('rank'));
    return this.state = this.state.set('topologies', immNextTopologies);
  }

  addTopologyFullname(topologies) {
    return topologies.map((t) => {
      if (!t.sub_topologies) {
        return Object.assign({}, t, {fullName: t.name});
      }
      return Object.assign({}, t, {
        fullName: t.name,
        sub_topologies: t.sub_topologies.map(st => (
          Object.assign({}, st, {fullName: `${t.name} ${st.name}`})
        ))
      });
    });
  }

  calcSelectType(topology) {
    const result = {
      ...topology,
      options: topology.options && topology.options.map((option) => {
        option.selectType = option.selectType || 'one';
        return option;
      })
    };

    if (topology.sub_topologies) {
      result.sub_topologies = topology.sub_topologies.map(this.calcSelectType);
    }
    return result;
  }

  filterHiddenTopologies(topologies, currentTopology) {
    currentTopology = currentTopology || makeMap();
    return topologies.filter(t => (!t.hide_if_empty || t.stats.node_count > 0
      || t.stats.filtered_nodes > 0 || t.id === currentTopology.get('id')
      || t.id === currentTopology.get('parentId')));
  }

  updateTopologyIds(topologies, parentId?) {
    return topologies.map((topology) => {
      const result = Object.assign({}, topology);
      result.id = topology.name.toLowerCase().replace(' ', '');
      if (parentId) {
        result.parentId = parentId;
      }
      if (topology.sub_topologies) {
        result.sub_topologies = this.updateTopologyIds(topology.sub_topologies, result.id);
      }
      return result;
    });
  }
}
