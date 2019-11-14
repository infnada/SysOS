import {DatastoreInfo} from './datastore-info';

import {HostVmfsVolume} from './host-vmfs-volume';
import {Long} from './long';
export interface VmfsDatastoreInfo extends DatastoreInfo {
  maxPhysicalRDMFileSize: Long;
  maxVirtualRDMFileSize: Long;
  vmfs?: HostVmfsVolume;
}
