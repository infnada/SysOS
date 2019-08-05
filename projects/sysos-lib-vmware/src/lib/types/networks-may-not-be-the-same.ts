import {MigrationFault} from './migration-fault';

export interface NetworksMayNotBeTheSame extends MigrationFault {
  name?: string;
}
