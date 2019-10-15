import {Injectable} from '@angular/core';
import {endsWith} from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class TopologyUtilsService {

  constructor() {
  }

  findTopologyById(subTree, topologyId) {
    let foundTopology;

    subTree.forEach((topology) => {
      if (endsWith(topology.get('url'), topologyId)) {
        foundTopology = topology;
      }
      if (!foundTopology && topology.has('sub_topologies')) {
        foundTopology = this.findTopologyById(topology.get('sub_topologies'), topologyId);
      }
    });

    return foundTopology;
  }

  setTopology(state, topologyId) {
    state = state.set('currentTopology', this.findTopologyById(state.get('topologies'), topologyId));
    state = state.set('currentTopologyId', topologyId);

    return state;
  }

  isTopologyNodeCountZero(state) {
    const nodeCount = state.getIn(['currentTopology', 'stats', 'node_count'], 0);
    return nodeCount === 0;
  }
}
