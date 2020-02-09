import {DynamicData} from './dynamic-data';

import {HostUnresolvedVmfsExtent} from './host-unresolved-vmfs-extent';
import {HostUnresolvedVmfsVolumeResolveStatus} from './host-unresolved-vmfs-volume-resolve-status';

export interface HostUnresolvedVmfsVolume extends DynamicData {
  extent: HostUnresolvedVmfsExtent[];
  resolveStatus: HostUnresolvedVmfsVolumeResolveStatus;
  totalBlocks: number;
  vmfsLabel: string;
  vmfsUuid: string;
}