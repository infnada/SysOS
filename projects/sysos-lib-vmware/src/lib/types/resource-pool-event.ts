import {Event} from './event';

import {ResourcePoolEventArgument} from './resource-pool-event-argument';
export interface ResourcePoolEvent extends Event {
  resourcePool: ResourcePoolEventArgument;
}
