import {DynamicData} from './dynamic-data';

import {FaultToleranceDiskSpec} from './fault-tolerance-disk-spec';
import {ManagedObjectReference} from './managed-object-reference';
export interface FaultToleranceVMConfigSpec extends DynamicData {
  disks?: FaultToleranceDiskSpec[];
  vmConfig?: ManagedObjectReference & { $type: 'Datastore' };
}
