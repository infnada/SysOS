import {VirtualDeviceOption} from './virtual-device-option';

import {LongOption} from './long-option';
import {StorageIOAllocationOption} from './storage-i-o-allocation-option';
import {VirtualDiskOptionVFlashCacheConfigOption} from './virtual-disk-option-v-flash-cache-config-option';

export interface VirtualDiskOption extends VirtualDeviceOption {
  capacityInKB: LongOption;
  ioAllocationOption: StorageIOAllocationOption;
  vFlashCacheConfigOption?: VirtualDiskOptionVFlashCacheConfigOption;
}