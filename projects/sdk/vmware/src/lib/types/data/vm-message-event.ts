import {VmEvent} from './vm-event';

import {VirtualMachineMessage} from './virtual-machine-message';

export interface VmMessageEvent extends VmEvent {
  message: string;
  messageInfo?: VirtualMachineMessage[];
}