import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NodeDetailsUtilsService {

  constructor() {
  }

  closeNodeDetails(state, nodeId?) {
    const nodeDetails = state.get('nodeDetails');
    if (nodeDetails.size > 0) {
      const popNodeId = nodeId || nodeDetails.keySeq().last();
      // remove pipe if it belongs to the node being closed
      state = state.update(
        'controlPipes',
        controlPipes => controlPipes.filter(pipe => pipe.get('nodeId') !== popNodeId)
      );
      state = state.deleteIn(['nodeDetails', popNodeId]);
    }
    if (state.get('nodeDetails').size === 0 || state.get('selectedNodeId') === nodeId) {
      state = state.set('selectedNodeId', null);
    }

    return state;
  }


  closeAllNodeDetails(state) {
    while (state.get('nodeDetails').size) {
      state = this.closeNodeDetails(state);
    }

    return state;
  }

  clearNodes(state) {
    return state
      .update('nodes', nodes => nodes.clear())
      .set('nodesLoaded', false);
  }

}
