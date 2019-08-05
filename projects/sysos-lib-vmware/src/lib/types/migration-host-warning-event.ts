import {MigrationEvent} from './migration-event';

import {HostEventArgument} from './host-event-argument';
export interface MigrationHostWarningEvent extends MigrationEvent {
  dstHost: HostEventArgument;
}
