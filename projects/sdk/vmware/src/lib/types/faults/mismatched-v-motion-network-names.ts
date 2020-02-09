import {MigrationFault} from './migration-fault';


export interface MismatchedVMotionNetworkNames extends MigrationFault {
  destNetwork: string;
  sourceNetwork: string;
}