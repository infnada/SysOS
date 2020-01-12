import {VmEvent} from './vm-event';

import {VirtualMachineMessage} from './virtual-machine-message';
export interface VmMessageErrorEvent extends VmEvent {
  message: string;
  messageInfo?: VirtualMachineMessage[];
}
