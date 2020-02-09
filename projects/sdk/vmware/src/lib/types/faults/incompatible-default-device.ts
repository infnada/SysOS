import {MigrationFault} from './migration-fault';


export interface IncompatibleDefaultDevice extends MigrationFault {
  device: string;
}