import {DynamicData} from './dynamic-data';

import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';

export interface VirtualMachineProfileDetailsDiskProfileDetails extends DynamicData {
  diskId: number;
  profile?: VirtualMachineProfileSpec[];
}