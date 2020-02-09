import {DatastoreInfo} from './datastore-info';

import {HostVmfsVolume} from './host-vmfs-volume';

export interface VmfsDatastoreInfo extends DatastoreInfo {
  maxPhysicalRDMFileSize: number;
  maxVirtualRDMFileSize: number;
  vmfs?: HostVmfsVolume;
}