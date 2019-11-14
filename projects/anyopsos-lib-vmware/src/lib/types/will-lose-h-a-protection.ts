import {MigrationFault} from './migration-fault';

export interface WillLoseHAProtection extends MigrationFault {
  resolution: string;
}
