import {ClusterDrsFaultsFaultsByVm} from './cluster-drs-faults-faults-by-vm';

import {VirtualDiskId} from './virtual-disk-id';
export interface ClusterDrsFaultsFaultsByVirtualDisk extends ClusterDrsFaultsFaultsByVm {
  disk?: VirtualDiskId;
}
