import {ManagedEntityStatus} from "./managed-entity-status";

export interface AlarmTriggeringActionTransitionSpec {
  finalState: ManagedEntityStatus;
  repeats: boolean;
  startState: ManagedEntityStatus;
}
