import {MigrationEvent} from './migration-event';

import {HostEventArgument} from './host-event-argument';

export interface MigrationHostErrorEvent extends MigrationEvent {
  dstHost: HostEventArgument;
}