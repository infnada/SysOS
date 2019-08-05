import {MigrationFault} from './migration-fault';

export interface FaultToleranceNotSameBuild extends MigrationFault {
  build: string;
}
