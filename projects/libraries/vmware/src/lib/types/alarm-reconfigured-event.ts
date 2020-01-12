import {AlarmEvent} from './alarm-event';

import {ChangesInfoEventArgument} from './changes-info-event-argument';
import {ManagedEntityEventArgument} from './managed-entity-event-argument';
export interface AlarmReconfiguredEvent extends AlarmEvent {
  configChanges?: ChangesInfoEventArgument;
  entity: ManagedEntityEventArgument;
}
