import {MigrationFault} from './migration-fault';

export interface RDMNotPreserved extends MigrationFault {
  device: string;
}
