import {MigrationFault} from './migration-fault';
import {Int} from './int';

export interface ReadOnlyDisksWithLegacyDestination extends MigrationFault {
  roDiskCount: Int;
  timeoutDanger: boolean;
}
