import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {VirtualDevice} from './virtual-device';
export interface FaultToleranceDiskSpec extends DynamicData {
  datastore: ManagedObjectReference & { $type: 'Datastore' };
  disk: VirtualDevice;
}
