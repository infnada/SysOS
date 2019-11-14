import {AlarmAction} from './alarm-action';

import {Action} from './action';
import {AlarmTriggeringActionTransitionSpec} from './alarm-triggering-action-transition-spec';
export interface AlarmTriggeringAction extends AlarmAction {
  action: Action;
  transitionSpecs?: AlarmTriggeringActionTransitionSpec[];
}
