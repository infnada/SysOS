import {VmEvent} from './vm-event';

import {VirtualMachineConfigSpec} from './virtual-machine-config-spec';

export interface VmBeingCreatedEvent extends VmEvent {
  configSpec?: VirtualMachineConfigSpec;
}