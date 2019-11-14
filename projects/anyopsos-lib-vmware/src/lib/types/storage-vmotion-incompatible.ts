import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';

import {ManagedObjectReference} from './managed-object-reference';
export interface StorageVmotionIncompatible extends VirtualHardwareCompatibilityIssue {
  datastore?: ManagedObjectReference & { $type: 'Datastore' };
}
