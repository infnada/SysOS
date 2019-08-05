import {VmEvent} from './vm-event';

import {VirtualMachineFaultToleranceState} from './virtual-machine-fault-tolerance-state';
export interface VmFaultToleranceStateChangedEvent extends VmEvent {
  newState: VirtualMachineFaultToleranceState;
  oldState: VirtualMachineFaultToleranceState;
}
