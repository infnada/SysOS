import {DynamicData} from './dynamic-data';

import {HostLowLevelProvisioningManagerDiskLayoutSpec} from './host-low-level-provisioning-manager-disk-layout-spec';
import {Int} from './int';
export interface HostLowLevelProvisioningManagerSnapshotLayoutSpec extends DynamicData {
  disk?: HostLowLevelProvisioningManagerDiskLayoutSpec[];
  dstFilename: string;
  id: Int;
  srcFilename: string;
}
