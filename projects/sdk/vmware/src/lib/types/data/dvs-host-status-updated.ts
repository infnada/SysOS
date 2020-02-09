import {DvsEvent} from './dvs-event';

import {HostEventArgument} from './host-event-argument';

export interface DvsHostStatusUpdated extends DvsEvent {
  hostMember: HostEventArgument;
  newStatus?: string;
  newStatusDetail?: string;
  oldStatus?: string;
  oldStatusDetail?: string;
}