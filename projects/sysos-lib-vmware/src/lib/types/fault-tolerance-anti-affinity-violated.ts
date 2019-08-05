import {MigrationFault} from './migration-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface FaultToleranceAntiAffinityViolated extends MigrationFault {
  host: ManagedObjectReference & { $type: 'HostSystem' };
  hostName: string;
}
