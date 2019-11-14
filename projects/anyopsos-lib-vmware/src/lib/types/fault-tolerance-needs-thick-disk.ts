import {MigrationFault} from './migration-fault';

export interface FaultToleranceNeedsThickDisk extends MigrationFault {
  vmName: string;
}
