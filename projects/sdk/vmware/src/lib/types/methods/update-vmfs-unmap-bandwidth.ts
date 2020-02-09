import {ManagedObjectReference} from '../data/managed-object-reference';
import {VmfsUnmapBandwidthSpec} from '../data/vmfs-unmap-bandwidth-spec';


export interface UpdateVmfsUnmapBandwidth {
  _this: ManagedObjectReference;
  vmfsUuid: string;
  unmapBandwidthSpec: VmfsUnmapBandwidthSpec;
}