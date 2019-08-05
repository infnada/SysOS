import {DynamicData} from './dynamic-data';

import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';
import {Int} from './int';
export interface VirtualMachineProfileDetailsDiskProfileDetails extends DynamicData {
  diskId: Int;
  profile?: VirtualMachineProfileSpec[];
}
