import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface MemorySizeNotSupportedByDatastore extends VirtualHardwareCompatibilityIssue {
  datastore: ManagedObjectReference & { $type: 'Datastore' };
  maxMemorySizeMB: Int;
  memorySizeMB: Int;
}
