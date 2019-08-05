import {VmEvent} from './vm-event';

import {VirtualMachineMessage} from './virtual-machine-message';
export interface VmMessageWarningEvent extends VmEvent {
  message: string;
  messageInfo?: VirtualMachineMessage[];
}
