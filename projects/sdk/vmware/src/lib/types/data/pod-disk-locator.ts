import {DynamicData} from './dynamic-data';

import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';
import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';

export interface PodDiskLocator extends DynamicData {
  diskBackingInfo?: VirtualDeviceBackingInfo;
  diskId: number;
  diskMoveType?: string;
  profile?: VirtualMachineProfileSpec[];
}