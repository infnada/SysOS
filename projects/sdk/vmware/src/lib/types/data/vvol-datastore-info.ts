import {DatastoreInfo} from './datastore-info';

import {HostVvolVolume} from './host-vvol-volume';

export interface VvolDatastoreInfo extends DatastoreInfo {
  vvolDS?: HostVvolVolume;
}