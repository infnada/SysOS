import {VmEvent} from './vm-event';

import {HostEventArgument} from './host-event-argument';
export interface VmNoNetworkAccessEvent extends VmEvent {
  destHost: HostEventArgument;
}
