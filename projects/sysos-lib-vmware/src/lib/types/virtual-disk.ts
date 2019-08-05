import {VirtualDevice} from './virtual-device';

import {SharesInfo} from './shares-info';
import {StorageIOAllocationInfo} from './storage-i-o-allocation-info';
import {ID} from './i-d';
import {VirtualDiskVFlashCacheConfigInfo} from './virtual-disk-v-flash-cache-config-info';
import {Long} from './long';
export interface VirtualDisk extends VirtualDevice {
  capacityInBytes?: Long;
  capacityInKB: Long;
  diskObjectId?: string;
  iofilter?: string[];
  nativeUnmanagedLinkedClone?: boolean;
  shares?: SharesInfo;
  storageIOAllocation?: StorageIOAllocationInfo;
  vDiskId?: ID;
  vFlashCacheConfigInfo?: VirtualDiskVFlashCacheConfigInfo;
}
