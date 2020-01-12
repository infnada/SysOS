import {Component} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {includes, isEqual} from 'lodash-es';
import {Set as makeSet} from 'immutable';

import {StateService} from '../../services/state.service';
import {SelectorsService} from '../../services/selectors.service';
import {NodeDetailsUtilsService} from '../../services/utils/node-details-utils.service';
import {TopologyUtilsService} from '../../services/utils/topology-utils.service';

@Component({
  selector: 'aelweaves-topology-options',
  templateUrl: './topology-options.component.html',
  styleUrls: ['./topology-options.component.scss']
})
export class TopologyOptionsComponent {

  private destroySubject$: Subject<void> = new Subject();
  private state;

  activeOptions;
  currentTopologyId;
  options;

  constructor(private State: StateService,
              private Selectors: SelectorsService,
              private NodeDetailsUtils: NodeDetailsUtilsService,
              private TopologyUtils: TopologyUtilsService) {
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleNoneClick = this.handleNoneClick.bind(this);

    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => {
      this.state = state;

      this.activeOptions = this.Selectors.activeTopologyOptionsSelector(state);
      this.currentTopologyId = this.state.get('currentTopologyId');
      this.options = this.state.getIn(['currentTopology', 'options']);

      if (this.options) this.options = this.options.toIndexedSeq();
    });

  }

  getActiveValue(option, value) {
    let activeValue = option.get('defaultValue');

    if (this.activeOptions && this.activeOptions.has(option.get('id'))) {
      const activeSelection = makeSet(this.activeOptions.get(option.get('id')));
      const availableOptions = makeSet(option.get('options').map(o => o.get('value')));
      const intersection = activeSelection.intersect(availableOptions);
      if (!intersection.isEmpty()) {
        activeValue = intersection.toJS();
      }
    }

    return activeValue.includes(value);
  }

  handleNoneClick(optionId) {
    this.changeTopologyOption(optionId, ['']);
  }

  handleOptionClick(optionId, value) {
    let nextOptions = [value];
    const selectedOption = this.options.find(o => o.get('id') === optionId);

    if (selectedOption.get('selectType') === 'union') {
      // Multi-select topology options (such as k8s namespaces) are handled here.
      // Users can select one, many, or none of these options.
      // The component builds an array of the next selected values that are sent to the action.
      const opts = this.activeOptions.toJS();
      const selected = selectedOption.get('id');
      const selectedActiveOptions = opts[selected] || [];
      const isSelectedAlready = includes(selectedActiveOptions, value);

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

  changeTopologyOption(optionId, nextOptions) {
    // set option on parent topology
    const topology = this.TopologyUtils.findTopologyById(this.state.get('topologies'), this.currentTopologyId);
    if (topology) {
      const topologyId = topology.get('parentId') || topology.get('id');
      const optionKey = ['topologyOptions', topologyId, optionId];
      const currentOption = this.state.getIn(optionKey);

      if (!isEqual(currentOption, nextOptions)) {
        this.state = this.NodeDetailsUtils.clearNodes(this.state);
      }

      this.state = this.state.setIn(optionKey, nextOptions);

      this.State.setState(this.state);

      // update all request workers with new options
      // getTopologies(getState, dispatch);
      // getNodes(getState, dispatch);
    }
  }

}
