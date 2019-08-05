import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {HostMountInfo} from './host-mount-info';
export interface DatastoreHostMount extends DynamicData {
  key: ManagedObjectReference & { $type: 'HostSystem' };
  mountInfo: HostMountInfo;
}
