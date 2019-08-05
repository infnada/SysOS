import {VmPoweredOffEvent} from './vm-powered-off-event';

import {HostEventArgument} from './host-event-argument';
export interface VmPowerOffOnIsolationEvent extends VmPoweredOffEvent {
  isolatedHost: HostEventArgument;
}
