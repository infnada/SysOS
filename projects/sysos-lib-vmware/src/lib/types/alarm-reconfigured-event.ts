import {AlarmEvent} from "./alarm-event";
import {ManagedEntityEventArgument} from "./managed-entity-event-argument";
import {ChangesInfoEventArgument} from "./changes-info-event-argument";

export interface AlarmReconfiguredEvent extends AlarmEvent {
  configChanges?: ChangesInfoEventArgument;
  entity: ManagedEntityEventArgument
}
