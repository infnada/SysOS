import {MigrationFault} from './migration-fault';

export interface RDMConversionNotSupported extends MigrationFault {
  device: string;
}
