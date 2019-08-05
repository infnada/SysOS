import {VirtualMachineTargetInfo} from './virtual-machine-target-info';

export interface VirtualMachinePciSharedGpuPassthroughInfo extends VirtualMachineTargetInfo {
  vgpu: string;
}
