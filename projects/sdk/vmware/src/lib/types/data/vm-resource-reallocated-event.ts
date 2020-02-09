import {VmEvent} from './vm-event';

import {ChangesInfoEventArgument} from './changes-info-event-argument';

export interface VmResourceReallocatedEvent extends VmEvent {
  configChanges?: ChangesInfoEventArgument;
}