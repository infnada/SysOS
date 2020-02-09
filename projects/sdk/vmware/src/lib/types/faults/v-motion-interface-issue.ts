import {MigrationFault} from './migration-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface VMotionInterfaceIssue extends MigrationFault {
  atSourceHost: boolean;
  failedHost: string;
  failedHostEntity?: ManagedObjectReference & { $type: 'HostSystem'; };
}