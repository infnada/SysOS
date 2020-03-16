import {Component} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {isEqual} from 'lodash-es';

import {AnyOpsOSLibDiagramService} from '../../services/anyopsos-lib-diagram.service';
import {AnyOpsOSLibDiagramStateService} from '../../services/anyopsos-lib-diagram-state.service';
import {AnyOpsOSLibDiagramTopologyUtilsService} from '../../services/anyopsos-lib-diagram-topology-utils.service';
import {Topology} from '../../types/topology';
import {TopologyOption} from '../../types/topology-option';

@Component({
  selector: 'aldiagram-topology-options',
  templateUrl: './topology-options.component.html',
  styleUrls: ['./topology-options.component.scss']
})
export class TopologyOptionsComponent {
  private destroySubject$: Subject<void> = new Subject();

  currentTopologyId: string;
  activeOptions: TopologyOption[];
  options: TopologyOption[];

  constructor(private readonly LibDiagram: AnyOpsOSLibDiagramService,
              private readonly LibDiagramState: AnyOpsOSLibDiagramStateService,
              private readonly LibDiagramTopologyUtils: AnyOpsOSLibDiagramTopologyUtilsService) {

  }

  ngOnInit(): void {

    // Listen for currentTopologyId change
    this.LibDiagramState.currentTopologyId
      .pipe(takeUntil(this.destroySubject$)).subscribe((currentTopologyId: string) => this.currentTopologyId = currentTopologyId);

    // Listen for currentTopology change
    this.LibDiagramState.currentTopology
      .pipe(takeUntil(this.destroySubject$)).subscribe((currentTopology: Topology) => {
        if (!currentTopology) return;

        this.options = currentTopology.options;
        this.activeOptions = this.LibDiagram.activeTopologyOptions();
      });

  }

  getActiveValue(option: TopologyOption, value) {
    let activeValue: string[] = [option.defaultValue];

    if (this.activeOptions && this.activeOptions.some(o => o.id === option.id)) {
      const activeSelection: TopologyOption = this.activeOptions.find(o => o.id === option.id);
      const availableOptions: string[] = option.options.map(o => o.value);
      const intersection: string[] = activeSelection.options.filter(o => availableOptions.includes(o.label)).map(o => o.label);

      if (intersection.length !== 0) activeValue = intersection;
    }

    return activeValue.includes(value);
  }

  handleNoneClick(optionId: string): void {
    this.changeTopologyOption(optionId, ['']);
  }

  handleOptionClick(optionId: string, value: string): void {
    let nextOptions = [value];
    const selectedOption = this.options.find(o => o.id === optionId);

    if (selectedOption.selectType === 'union') {
      // Multi-select topology options (such as k8s namespaces) are handled here.
      // Users can select one, many, or none of these options.
      // The component builds an array of the next selected values that are sent to the action.
      const opts = this.activeOptions;
      const selected = selectedOption.id;
      const selectedActiveOptions = opts[selected] || [];
      const isSelectedAlready = selectedActiveOptions.includes(value);

      if (isSelectedAlready) {
        // Remove the option if it is already selected
        nextOptions = selectedActiveOptions.filter(o => o !== value);
      } else {
        // Add it to the array if it's not selected
        nextOptions = selectedActiveOptions.concat(value);
      }
      // Since the user is clicking an option, remove the highlighting from the none option,
      // unless they are removing the last option. In that case, default to the none label.
      // Note that since the other ids are potentially user-controlled (eg. k8s namespaces),
      // the only string we can use for the none option is the empty string '',
      // since that can't collide.
      if (nextOptions.length === 0) {
        nextOptions = [''];
      } else {
        nextOptions = nextOptions.filter(o => o !== '');
      }
    }

    this.changeTopologyOption(optionId, nextOptions);
  }

  changeTopologyOption(optionId: string, nextOptions): void {

    // set option on parent topology
    const topologies: Topology[] = this.LibDiagramState.$topologies.getValue();
    const topology = this.LibDiagramTopologyUtils.findTopologyById(topologies, this.currentTopologyId);

    if (topology) {
      const topologyOptions: TopologyOption[] = this.LibDiagramState.$topologyOptions.getValue();
      const topologyId = topology.parentId || topology.id;
      let currentOption = topologyOptions[topologyId][optionId];

      if (!isEqual(currentOption, nextOptions)) {
        this.LibDiagramState.setSelectedNodeUuid(null);
      }

      currentOption = nextOptions;
      this.LibDiagramState.setTopologyOptions(currentOption);

      // update all request workers with new options
      // getTopologies(getState, dispatch);
      // getNodes(getState, dispatch);
    }
  }

}
