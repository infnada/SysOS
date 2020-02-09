import {VirtualMachineTargetInfo} from './virtual-machine-target-info';

import {NetworkSummary} from './network-summary';

export interface VirtualMachineNetworkInfo extends VirtualMachineTargetInfo {
  network: NetworkSummary;
  vswitch?: string;
}