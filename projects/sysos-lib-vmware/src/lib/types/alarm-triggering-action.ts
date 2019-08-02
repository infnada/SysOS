import {AlarmAction} from "./alarm-action";
import {Action} from "./action";
import {AlarmTriggeringActionTransitionSpec} from "./alarm-triggering-action-transition-spec";

export interface AlarmTriggeringAction extends AlarmAction {
  action: Action;
  green2yellow: boolean;
  red2yellow: boolean;
  transitionSpecs?: AlarmTriggeringActionTransitionSpec[];
  yellow2green: boolean;
  yellow2red: boolean;
}
