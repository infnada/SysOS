import {DynamicData} from './dynamic-data';


export interface ClusterVmComponentProtectionSettings extends DynamicData {
  enableAPDTimeoutForHosts?: boolean;
  vmReactionOnAPDCleared?: string;
  vmStorageProtectionForAPD?: string;
  vmStorageProtectionForPDL?: string;
  vmTerminateDelayForAPDSec?: number;
}