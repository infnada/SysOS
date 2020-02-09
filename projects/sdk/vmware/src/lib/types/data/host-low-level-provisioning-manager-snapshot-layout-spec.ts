import {DynamicData} from './dynamic-data';

import {HostLowLevelProvisioningManagerDiskLayoutSpec} from './host-low-level-provisioning-manager-disk-layout-spec';

export interface HostLowLevelProvisioningManagerSnapshotLayoutSpec extends DynamicData {
  disk?: HostLowLevelProvisioningManagerDiskLayoutSpec[];
  dstFilename: string;
  id: number;
  srcFilename: string;
}