import {MigrationFault} from './migration-fault';


export interface CannotMoveVmWithDeltaDisk extends MigrationFault {
  device: string;
}