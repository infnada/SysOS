import {MigrationFault} from './migration-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';
import {DatacenterMismatchArgument} from '../data/datacenter-mismatch-argument';

export interface DatacenterMismatch extends MigrationFault {
  expectedDatacenter: ManagedObjectReference & { $type: 'Datacenter'; };
  invalidArgument: DatacenterMismatchArgument[];
}