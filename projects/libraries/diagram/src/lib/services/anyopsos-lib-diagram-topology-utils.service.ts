import {Injectable} from '@angular/core';

import {AnyOpsOSLibDiagramStateService} from './anyopsos-lib-diagram-state.service';

import {Topology} from '../types/topology';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibDiagramTopologyUtilsService {

  constructor(private readonly LibDiagramState: AnyOpsOSLibDiagramStateService) {
  }

  findTopologyById(subTree: Topology[], topologyId: string): Topology {
    let foundTopology;

    subTree.forEach((topology) => {
      if (topology.id === topologyId) foundTopology = topology;
      if (!foundTopology && topology.sub_topologies) foundTopology = this.findTopologyById(topology.sub_topologies, topologyId);
    });

    return foundTopology;
  }

  setTopology(topologyId): void {
    const topologies: Topology[] = this.LibDiagramState.$topologies.getValue();

    this.LibDiagramState.setCurrentTopology(this.findTopologyById(topologies, topologyId));
    this.LibDiagramState.setCurrentTopologyId(topologyId);
  }

  isTopologyNodeCountZero(): boolean {
    const currentTopology: Topology = this.LibDiagramState.$currentTopology.getValue();

    return currentTopology.stats.node_count === 0;
  }
}
