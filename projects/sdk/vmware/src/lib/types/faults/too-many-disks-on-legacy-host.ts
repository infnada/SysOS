import {MigrationFault} from './migration-fault';


export interface TooManyDisksOnLegacyHost extends MigrationFault {
  diskCount: number;
  timeoutDanger: boolean;
}