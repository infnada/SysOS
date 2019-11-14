import {VirtualDiskSpec} from './virtual-disk-spec';

import {CryptoSpec} from './crypto-spec';
import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';
import {Long} from './long';
export interface FileBackedVirtualDiskSpec extends VirtualDiskSpec {
  capacityKb: Long;
  crypto?: CryptoSpec;
  profile?: VirtualMachineProfileSpec[];
}
