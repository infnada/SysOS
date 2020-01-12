import {DynamicData} from './dynamic-data';

import {HostUnresolvedVmfsExtent} from './host-unresolved-vmfs-extent';
import {HostUnresolvedVmfsVolumeResolveStatus} from './host-unresolved-vmfs-volume-resolve-status';
import {Int} from './int';
export interface HostUnresolvedVmfsVolume extends DynamicData {
  extent: HostUnresolvedVmfsExtent[];
  resolveStatus: HostUnresolvedVmfsVolumeResolveStatus;
  totalBlocks: Int;
  vmfsLabel: string;
  vmfsUuid: string;
}
