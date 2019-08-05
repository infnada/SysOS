import {MigrationFault} from './migration-fault';

export interface AffinityConfigured extends MigrationFault {
  configuredAffinity: string[];
}
