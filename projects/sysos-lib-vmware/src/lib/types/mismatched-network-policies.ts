import {MigrationFault} from './migration-fault';

export interface MismatchedNetworkPolicies extends MigrationFault {
  backing: string;
  connected: boolean;
  device: string;
}
