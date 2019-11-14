import {MigrationFault} from './migration-fault';

import {LocalizedMethodFault} from './localized-method-fault';
export interface DisallowedMigrationDeviceAttached extends MigrationFault {
  fault: LocalizedMethodFault;
}
