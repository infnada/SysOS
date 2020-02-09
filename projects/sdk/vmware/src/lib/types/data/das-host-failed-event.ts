import {ClusterEvent} from './cluster-event';

import {HostEventArgument} from './host-event-argument';

export interface DasHostFailedEvent extends ClusterEvent {
  failedHost: HostEventArgument;
}