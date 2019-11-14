import {VmEvent} from './vm-event';

import {ResourcePoolEventArgument} from './resource-pool-event-argument';
export interface VmResourcePoolMovedEvent extends VmEvent {
  newParent: ResourcePoolEventArgument;
  oldParent: ResourcePoolEventArgument;
}
