import {DvsEvent} from './dvs-event';

import {HostEventArgument} from './host-event-argument';

export interface DvsHostLeftEvent extends DvsEvent {
  hostLeft: HostEventArgument;
}