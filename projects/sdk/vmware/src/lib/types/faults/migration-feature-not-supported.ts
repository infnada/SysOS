import {MigrationFault} from './migration-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface MigrationFeatureNotSupported extends MigrationFault {
  atSourceHost: boolean;
  failedHost: ManagedObjectReference & { $type: 'HostSystem'; };
  failedHostName: string;
}