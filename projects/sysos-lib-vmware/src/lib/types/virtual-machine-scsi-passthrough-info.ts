import {VirtualMachineTargetInfo} from './virtual-machine-target-info';
import {Int} from './int';

export interface VirtualMachineScsiPassthroughInfo extends VirtualMachineTargetInfo {
  physicalUnitNumber: Int;
  scsiClass: string;
  vendor: string;
}
