import {DynamicData} from './dynamic-data';

import {ManagedEntityStatus} from './managed-entity-status';
export interface AlarmTriggeringActionTransitionSpec extends DynamicData {
  finalState: ManagedEntityStatus;
  repeats: boolean;
  startState: ManagedEntityStatus;
}
