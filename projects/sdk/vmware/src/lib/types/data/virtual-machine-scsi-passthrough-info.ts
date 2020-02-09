import {VirtualMachineTargetInfo} from './virtual-machine-target-info';


export interface VirtualMachineScsiPassthroughInfo extends VirtualMachineTargetInfo {
  physicalUnitNumber: number;
  scsiClass: string;
  vendor: string;
}