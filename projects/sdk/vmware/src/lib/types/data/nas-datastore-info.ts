import {DatastoreInfo} from './datastore-info';

import {HostNasVolume} from './host-nas-volume';

export interface NasDatastoreInfo extends DatastoreInfo {
  nas?: HostNasVolume;
}