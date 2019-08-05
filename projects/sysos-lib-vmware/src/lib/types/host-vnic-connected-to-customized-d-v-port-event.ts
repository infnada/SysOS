import {HostEvent} from './host-event';

import {VnicPortArgument} from './vnic-port-argument';
export interface HostVnicConnectedToCustomizedDVPortEvent extends HostEvent {
  prevPortKey?: string;
  vnic: VnicPortArgument;
}
