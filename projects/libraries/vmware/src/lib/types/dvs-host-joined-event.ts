import {DvsEvent} from './dvs-event';

import {HostEventArgument} from './host-event-argument';
export interface DvsHostJoinedEvent extends DvsEvent {
  hostJoined: HostEventArgument;
}
