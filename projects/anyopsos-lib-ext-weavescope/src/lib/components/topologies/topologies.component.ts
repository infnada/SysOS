import {Component, OnInit} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {StateService} from '../../services/state.service';
import {SelectorsService} from '../../services/selectors.service';
import {NodeDetailsUtilsService} from '../../services/utils/node-details-utils.service';
import {TopologyUtilsService} from '../../services/utils/topology-utils.service';

@Component({
  selector: 'slews-topologies',
  templateUrl: './topologies.component.html',
  styleUrls: ['./topologies.component.scss']
})
export class TopologiesComponent implements OnInit {

  private destroySubject$: Subject<void> = new Subject();
  private state;

  currentTopology;
  searchMatchCountByTopology;
  topologies;

  constructor(private State: StateService,
              private Selectors: SelectorsService,
              private NodeDetailsUtils: NodeDetailsUtilsService,
              private TopologyUtils: TopologyUtilsService) {
    this.onTopologyClick = this.onTopologyClick.bind(this);

    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => {
      this.state = state;

      this.currentTopology = this.state.get('currentTopology');
      this.searchMatchCountByTopology = this.Selectors.searchMatchCountByTopologySelector(state);
      this.topologies = this.state.get('topologies');
    });
  }

  ngOnInit(): void {
  }

  basicTopologyInfo(topology, searchMatchCount) {
    const info = [
      `Nodes: ${topology.getIn(['stats', 'node_count'])}`,
      `Connections: ${topology.getIn(['stats', 'edge_count'])}`
    ];
    if (searchMatchCount) {
      info.push(`Search Matches: ${searchMatchCount}`);
    }
    return info.join('\n');
  }

  onTopologyClick(ev, topology) {
    ev.preventDefault();

    const topologyId = topology.get('id');

    this.state = this.NodeDetailsUtils.closeAllNodeDetails(this.state);

    const currentTopologyId = this.state.get('currentTopologyId');
    if (topologyId !== currentTopologyId) {
      this.state = this.TopologyUtils.setTopology(this.state, topologyId);
      this.state = this.NodeDetailsUtils.clearNodes(this.state);
    }

    this.State.setState(this.state);
  }

}
