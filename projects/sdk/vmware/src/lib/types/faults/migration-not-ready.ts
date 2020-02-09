import {MigrationFault} from './migration-fault';


export interface MigrationNotReady extends MigrationFault {
  reason: string;
}