import {MigrationFault} from './migration-fault';

import {LocalizedMethodFault} from '../data/localized-method-fault';

export interface DisallowedMigrationDeviceAttached extends MigrationFault {
  fault: LocalizedMethodFault;
}