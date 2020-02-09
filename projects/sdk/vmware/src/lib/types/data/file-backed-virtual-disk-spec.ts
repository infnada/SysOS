import {VirtualDiskSpec} from './virtual-disk-spec';

import {CryptoSpec} from './crypto-spec';
import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';

export interface FileBackedVirtualDiskSpec extends VirtualDiskSpec {
  capacityKb: number;
  crypto?: CryptoSpec;
  profile?: VirtualMachineProfileSpec[];
}