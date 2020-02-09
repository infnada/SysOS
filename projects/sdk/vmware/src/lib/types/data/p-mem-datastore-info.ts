import {DatastoreInfo} from './datastore-info';

import {HostPMemVolume} from './host-p-mem-volume';

export interface PMemDatastoreInfo extends DatastoreInfo {
  pmem: HostPMemVolume;
}