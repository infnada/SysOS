import {MigrationFault} from './migration-fault';

export interface LargeRDMConversionNotSupported extends MigrationFault {
  device: string;
}
