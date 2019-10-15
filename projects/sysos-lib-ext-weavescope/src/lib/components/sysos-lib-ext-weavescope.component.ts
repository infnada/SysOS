import {Component, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation, OnDestroy} from '@angular/core';
import {List as makeList} from 'immutable';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {StateService} from '../services/state.service';
import {InitService} from '../services/init.service';
import {SelectorsService} from '../services/selectors.service';
import {TopologyUtilsService} from '../services/utils/topology-utils.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'slews-sysos-lib-ext-weavescope',
  templateUrl: './sysos-lib-ext-weavescope.component.html',
  styleUrls: ['./sysos-lib-ext-weavescope.component.scss']
})
export class SysosLibExtWeavescopeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('weaveApp') weaveApp: ElementRef;

  private destroySubject$: Subject<void> = new Subject();
  private state;

  currentTopology: string;
  nodesDisplayEmpty: boolean;
  nodesLoaded: boolean;
  topologies: makeList<any>;
  topologiesLoaded: boolean;
  topologyNodeCountZero: boolean;

  // TODO: The information that we already have available on the frontend should enable
  // us to determine which of these cases exactly is preventing us from seeing the nodes.
  NODES_STATS_COUNT_ZERO_CAUSES: string[] = [
    'We haven\'t received any reports from probes recently. Are the probes properly connected?',
    'Containers view only: you\'re not running Docker, or you don\'t have any containers',
  ];
  NODES_NOT_DISPLAYED_CAUSES: string[] = [
    'There are nodes, but they\'ve been filtered out by pinned searches in the top-left corner.',
    'There are nodes, but they\'re currently hidden. Check the view options in the bottom-left if they allow for showing hidden nodes.',
    'There are no nodes for this particular moment in time. Use the time travel feature at the bottom-right corner to explore different times.',
  ];

  constructor(private State: StateService,
              private Init: InitService,
              private Selectors: SelectorsService,
              private TopologyUtils: TopologyUtilsService) {

    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => {
      this.state = state;
      this.currentTopology = this.state.get('currentTopology');
      this.nodesDisplayEmpty = this.isNodesDisplayEmpty(state);
      this.nodesLoaded = this.state.get('nodesLoaded');
      this.topologies = this.state.get('topologies');
      this.topologiesLoaded = this.state.get('topologiesLoaded');
      this.topologyNodeCountZero = this.TopologyUtils.isTopologyNodeCountZero(state);
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  ngAfterViewInit() {
    const { width, height } = this.weaveApp.nativeElement.getBoundingClientRect();
    this.state = this.state.mergeIn(['viewport'], {
      height,
      width,
    });

    this.State.setState(this.state);

    // Set topology & nodes
    setTimeout(() => this.Init.init(), 0);
  }


  private isNodesDisplayEmpty(state) {
    return state.get('nodes').filter(node => !node.get('filtered')).isEmpty();
  }

  getNodeType(topology, topologies) {
    if (!topology || topologies.size === 0) {
      return '';
    }
    let name = topology.get('name');
    if (topology.get('parentId')) {
      const parentTopology = this.TopologyUtils.findTopologyById(topologies, topology.get('parentId'));
      name = parentTopology.get('name');
    }
    return name.toLowerCase();
  }

}
