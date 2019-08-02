import {AlarmEvent} from "./alarm-event";
import {ManagedEntityEventArgument} from "./managed-entity-event-argument";

export interface AlarmSnmpCompletedEvent extends AlarmEvent {
  entity: ManagedEntityEventArgument;
}
