import {VirtualMachineTargetInfo} from './virtual-machine-target-info';

import {VirtualMachineSummary} from './virtual-machine-summary';

export interface VirtualMachineUsbInfo extends VirtualMachineTargetInfo {
  description: string;
  family?: string[];
  physicalPath: string;
  product: number;
  speed?: string[];
  summary?: VirtualMachineSummary;
  vendor: number;
}