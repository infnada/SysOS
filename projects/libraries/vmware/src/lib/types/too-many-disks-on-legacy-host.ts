import {MigrationFault} from './migration-fault';
import {Int} from './int';

export interface TooManyDisksOnLegacyHost extends MigrationFault {
  diskCount: Int;
  timeoutDanger: boolean;
}
