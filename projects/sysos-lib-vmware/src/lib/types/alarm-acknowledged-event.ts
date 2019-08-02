import {ManagedEntityEventArgument} from "./managed-entity-event-argument";
import {AlarmEvent} from "./alarm-event";

export interface AlarmAcknowledgedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
  source: ManagedEntityEventArgument;
}
