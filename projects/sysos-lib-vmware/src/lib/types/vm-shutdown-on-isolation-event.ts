import {VmPoweredOffEvent} from './vm-powered-off-event';

import {HostEventArgument} from './host-event-argument';
export interface VmShutdownOnIsolationEvent extends VmPoweredOffEvent {
  isolatedHost: HostEventArgument;
  shutdownResult?: string;
}
