import {MigrationEvent} from './migration-event';

import {HostEventArgument} from './host-event-argument';
import {ResourcePoolEventArgument} from './resource-pool-event-argument';
export interface MigrationResourceErrorEvent extends MigrationEvent {
  dstHost: HostEventArgument;
  dstPool: ResourcePoolEventArgument;
}
