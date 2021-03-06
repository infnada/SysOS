import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {fromJS, List as makeList} from 'immutable';
import {isEqual} from 'lodash-es';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {StateService} from '../services/state.service';
import {InitService} from '../services/init.service';
import {SelectorsService} from '../services/selectors.service';
import {TopologyUtilsService} from '../services/utils/topology-utils.service';
import {NodeDetailsUtilsService} from '../services/utils/node-details-utils.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'slews-anyopsos-lib-ext-weavescope',
  templateUrl: './anyopsos-lib-ext-weavescope.component.html',
  styleUrls: ['./anyopsos-lib-ext-weavescope.component.scss']
})
export class AnyOpsOSLibExtWeavescopeComponent implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('weaveApp') weaveApp: ElementRef;
  @Input() nodes;
  @Input() simpleLayout: boolean = false;
  @Output() selectedNode = new EventEmitter<{}>();
  @Output() selectedTopology = new EventEmitter<{}>();

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
              private TopologyUtils: TopologyUtilsService,
              private NodeDetailsUtils: NodeDetailsUtilsService) {

    this.State.init();

    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => {
      this.state = state;
      this.currentTopology = this.state.get('currentTopology');
      this.nodesDisplayEmpty = this.isNodesDisplayEmpty(state);
      this.nodesLoaded = this.state.get('nodesLoaded');
      this.topologies = this.state.get('topologies');
      this.topologiesLoaded = this.state.get('topologiesLoaded');
      this.topologyNodeCountZero = this.TopologyUtils.isTopologyNodeCountZero(state);

      // Send currentTopology as @Output
      if (this.state && this.state.get('currentTopology')) {
        this.selectedTopology.emit(state.get('currentTopology').toJS());
      }

      // Send selectedNodeId as @Output
      const selectedNode = this.Selectors.nodeIdDetailsSelector(this.state);
      if (selectedNode) this.selectedNode.emit(selectedNode.toJS());
    });
  }

  ngOnChanges(nextProps) {
    if (nextProps.nodes.firstChange) return;
    if (!isEqual(nextProps.nodes.previousValue, nextProps.nodes.currentValue)) {

      this.state = this.NodeDetailsUtils.closeAllNodeDetails(this.state);
      this.state = this.NodeDetailsUtils.clearNodes(this.state);

      this.state = this.state.set('nodes', fromJS(nextProps.nodes.currentValue));
      this.state = this.state.set('nodesLoaded', true);
      this.state = this.state.set('forceRelayout', true);
      this.State.setState(this.state);

      this.Init.updateStateFromNodes();
    }
  }

  ngOnDestroy(): void {
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
    setTimeout(() => this.Init.init(this.nodes), 0);
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
