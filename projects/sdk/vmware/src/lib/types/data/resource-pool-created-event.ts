import {ResourcePoolEvent} from './resource-pool-event';

import {ResourcePoolEventArgument} from './resource-pool-event-argument';

export interface ResourcePoolCreatedEvent extends ResourcePoolEvent {
  parent: ResourcePoolEventArgument;
}