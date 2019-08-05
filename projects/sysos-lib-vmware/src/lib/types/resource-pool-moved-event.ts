import {ResourcePoolEvent} from './resource-pool-event';

import {ResourcePoolEventArgument} from './resource-pool-event-argument';
export interface ResourcePoolMovedEvent extends ResourcePoolEvent {
  newParent: ResourcePoolEventArgument;
  oldParent: ResourcePoolEventArgument;
}
