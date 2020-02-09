import {DynamicData} from './dynamic-data';

import {VirtualMachineProfileDetailsDiskProfileDetails} from './virtual-machine-profile-details-disk-profile-details';
import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';

export interface VirtualMachineProfileDetails extends DynamicData {
  diskProfileDetails?: VirtualMachineProfileDetailsDiskProfileDetails[];
  profile?: VirtualMachineProfileSpec[];
}