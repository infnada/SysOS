import {MigrationFault} from './migration-fault';

import {ManagedObjectReference} from './managed-object-reference';
import {DatacenterMismatchArgument} from './datacenter-mismatch-argument';
export interface DatacenterMismatch extends MigrationFault {
  expectedDatacenter: ManagedObjectReference & { $type: 'Datacenter' };
  invalidArgument: DatacenterMismatchArgument[];
}
