import {VmEvent} from './vm-event';

import {ChangesInfoEventArgument} from './changes-info-event-argument';
import {VirtualMachineConfigSpec} from './virtual-machine-config-spec';
export interface VmReconfiguredEvent extends VmEvent {
  configChanges?: ChangesInfoEventArgument;
  configSpec: VirtualMachineConfigSpec;
}
