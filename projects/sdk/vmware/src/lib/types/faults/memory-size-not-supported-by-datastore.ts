import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface MemorySizeNotSupportedByDatastore extends VirtualHardwareCompatibilityIssue {
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  maxMemorySizeMB: number;
  memorySizeMB: number;
}