import {VirtualMachineTargetInfo} from './virtual-machine-target-info';

import {VirtualMachineSummary} from './virtual-machine-summary';
import {Int} from './int';
export interface VirtualMachineUsbInfo extends VirtualMachineTargetInfo {
  description: string;
  family?: string[];
  physicalPath: string;
  product: Int;
  speed?: string[];
  summary?: VirtualMachineSummary;
  vendor: Int;
}
