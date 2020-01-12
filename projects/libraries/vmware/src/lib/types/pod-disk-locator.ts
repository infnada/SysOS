import {DynamicData} from './dynamic-data';

import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';
import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';
import {Int} from './int';
export interface PodDiskLocator extends DynamicData {
  diskBackingInfo?: VirtualDeviceBackingInfo;
  diskId: Int;
  diskMoveType?: string;
  profile?: VirtualMachineProfileSpec[];
}
