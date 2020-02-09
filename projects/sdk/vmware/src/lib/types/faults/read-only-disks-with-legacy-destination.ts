import {MigrationFault} from './migration-fault';


export interface ReadOnlyDisksWithLegacyDestination extends MigrationFault {
  roDiskCount: number;
  timeoutDanger: boolean;
}