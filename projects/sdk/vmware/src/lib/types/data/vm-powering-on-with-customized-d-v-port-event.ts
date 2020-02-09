import {VmEvent} from './vm-event';

import {VnicPortArgument} from './vnic-port-argument';

export interface VmPoweringOnWithCustomizedDVPortEvent extends VmEvent {
  vnic: VnicPortArgument[];
}