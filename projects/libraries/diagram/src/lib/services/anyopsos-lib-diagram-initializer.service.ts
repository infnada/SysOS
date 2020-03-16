import {Injectable} from '@angular/core';

import {merge} from 'lodash-es';

import {AnyOpsOSLibDiagramStateService} from './anyopsos-lib-diagram-state.service';
import {AnyOpsOSLibDiagramTopologyUtilsService} from './anyopsos-lib-diagram-topology-utils.service';
import {Node} from '../types/node';
import {Topology} from '../types/topology';
import {TopologyOption} from '../types/topology-option';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibDiagramInitializerService {

  constructor(private readonly LibDiagramState: AnyOpsOSLibDiagramStateService,
              private readonly LibDiagramTopologyUtils: AnyOpsOSLibDiagramTopologyUtilsService) {
  }

  updateStateFromNodes(): void {
    // Apply pinned searches, filters nodes that dont match.
    // this.state = applyPinnedSearches(state);

    // In case node or edge disappears before mouseleave event.
    const nodes: Node[] = this.LibDiagramState.$nodes.getValue();
    const mouseOverNodeId: string = this.LibDiagramState.$mouseOverNodeId.getValue();
    const mouseOverEdgeId: string = this.LibDiagramState.$mouseOverEdgeId.getValue();

    const nodesIds: string[] = nodes.map(n => n.id);

    if (mouseOverNodeId && !nodesIds.includes(mouseOverNodeId)) this.LibDiagramState.setMouseOverNodeId(null);
    if (mouseOverEdgeId && !nodesIds.includes(mouseOverEdgeId)) this.LibDiagramState.setMouseOverEdgeId(null);

    // const nodesForCurrentTopologyKey = ['nodesByTopology', this.state.get('currentTopologyId')];
    // this.state = this.state.setIn(nodesForCurrentTopologyKey, this.state.get('nodes'));

    this.LibDiagramState.setForceRelayout(false);
  }

  init(nodes: Node[], topologies: Topology[]): void {

    console.log('init', nodes, topologies);

    this.processTopologies(topologies);

    const preTopologyId: string = this.LibDiagramState.$currentTopologyId.getValue();
    const currentTopologies: Topology[] = this.LibDiagramState.$topologies.getValue();

    if (!preTopologyId || !this.LibDiagramTopologyUtils.findTopologyById(currentTopologies, preTopologyId)) {
      this.LibDiagramState.setCurrentTopologyId(this.getDefaultTopology(currentTopologies));
    } else {
      this.LibDiagramState.setCurrentTopologyId(preTopologyId);
    }

    const currentTopologyId: string = this.LibDiagramState.$currentTopologyId.getValue();
    this.LibDiagramState.setCurrentTopology(this.LibDiagramTopologyUtils.findTopologyById(currentTopologies, currentTopologyId));

    // Expand topology options with topologies' defaults on first load, but let
    // the current state of topologyOptions (which at this point reflects the
    // URL state) still take the precedence over defaults.
    if (!this.LibDiagramState.$topologiesLoaded.getValue()) {

      const currentTopologyOptions: TopologyOption[] = this.LibDiagramState.$topologyOptions.getValue();
      const options: TopologyOption[] = merge({}, this.getDefaultTopologyOptions(), currentTopologyOptions);

      this.LibDiagramState.setTopologyOptions(options);
      this.LibDiagramState.setTopologiesLoaded(true);
    }

    this.LibDiagramState.setNodes(nodes);
    this.LibDiagramState.setNodesLoaded(true);

    // TODO used by search matches
    // const nodesForCurrentTopologyKey = ['nodesByTopology', this.state.get('currentTopologyId')];
    // this.state = this.state.setIn(nodesForCurrentTopologyKey, this.state.get('nodes'));
  }

  getDefaultTopologyOptions(): { [key: string]: string; }[] {
    let topologyOptions: { [key: string]: string; }[] = [];

    const topologies: Topology[] = this.LibDiagramState.$topologies.getValue();

    topologies.forEach((topology: Topology) => {
      let defaultOptions: { [key: string]: string; }[] = [];

      if (topology.options) {

        topology.options.forEach((option: TopologyOption) => {
          const optionId = option.id;
          const defaultValue = option.defaultValue;
          defaultOptions.push({
            [optionId]: defaultValue,
          });
        });
      }

      if (defaultOptions.length > 0) topologyOptions[topology.id] = defaultOptions;
    });

    return topologyOptions;
  }

  getDefaultTopology(topologies: Topology[]): string {
    const flatTopologies = topologies
      .flatMap(t => [t].concat(t.sub_topologies)).filter(t => t);

    const TOPOLOGY_DISPLAY_PRIORITY: string[] = [
      'all',
      'nodes',
      'virtualmachines',
      'pods',
      'volumes',
      'standalone'
    ];

    console.log(flatTopologies);

    return flatTopologies
      .sort((t) => {
        const index = TOPOLOGY_DISPLAY_PRIORITY.indexOf(t.id);
        return index === -1 ? Infinity : index;
      })[0].id;
  }

  processTopologies(topologies: Topology[]): void {

    const currentTopology: Topology = this.LibDiagramState.$currentTopology.getValue();

    // add IDs to topology objects in-place
    const topologiesWithId: Topology[] = this.updateTopologyIds(topologies);

    // filter out hidden topos
    const visibleTopologies: Topology[] = this.filterHiddenTopologies(topologiesWithId, currentTopology);

    // set `selectType` field for topology and sub_topologies options (recursive).
    const topologiesWithSelectType: Topology[] = visibleTopologies.map((topology: Topology) => this.calcSelectType(topology));

    const topologiesWithFullnames: Topology[] = this.addTopologyFullname(topologiesWithSelectType);

    const immNextTopologies: Topology[] = topologiesWithFullnames.sort((a, b) => {
      if (a.rank < b.rank) return -1;
      if (a.rank > b.rank)return 1;
      return 0;
    });

    this.LibDiagramState.setTopologies(immNextTopologies);
  }

  addTopologyFullname(topologies: Topology[]): Topology[] {

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

  calcSelectType(topology: Topology): Topology {
    const result = {
      ...topology,
      options: topology.options && topology.options.map((option) => {
        option.selectType = option.selectType || 'one';
        return option;
      })
    };

    if (topology.sub_topologies) {
      result.sub_topologies = topology.sub_topologies.map((topology: Topology) => this.calcSelectType(topology));
    }

    return result;
  }

  filterHiddenTopologies(topologies: Topology[], currentTopology: Topology): Topology[] {

    return topologies.filter(t => (!t.hide_if_empty || t.stats.node_count > 0
      || t.stats.filtered_nodes > 0 || t.id === currentTopology.id
      || t.id === currentTopology.parentId));
  }

  updateTopologyIds(topologies: Topology[], parentId?: string): Topology[] {
    return topologies.map((topology) => {

      const result = Object.assign({}, topology);
      result.id = topology.name.toLowerCase().replace(' ', '');

      if (parentId) result.parentId = parentId;

      if (topology.sub_topologies) {
        result.sub_topologies = this.updateTopologyIds(topology.sub_topologies, result.id);
      }

      return result;
    });
  }
}
