import {ClusterEvent} from './cluster-event';

import {HostEventArgument} from './host-event-argument';

export interface DasHostIsolatedEvent extends ClusterEvent {
  isolatedHost: HostEventArgument;
}