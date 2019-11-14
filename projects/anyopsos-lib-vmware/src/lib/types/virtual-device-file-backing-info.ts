import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';

import {ManagedObjectReference} from './managed-object-reference';
export interface VirtualDeviceFileBackingInfo extends VirtualDeviceBackingInfo {
  backingObjectId?: string;
  datastore?: ManagedObjectReference & { $type: 'Datastore' };
  fileName: string;
}
