import {VmPoweredOnEvent} from './vm-powered-on-event';

import {HostEventArgument} from './host-event-argument';

export interface VmRestartedOnAlternateHostEvent extends VmPoweredOnEvent {
  sourceHost: HostEventArgument;
}