import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface ClusterVmComponentProtectionSettings extends DynamicData {
  enableAPDTimeoutForHosts?: boolean;
  vmReactionOnAPDCleared?: string;
  vmStorageProtectionForAPD?: string;
  vmStorageProtectionForPDL?: string;
  vmTerminateDelayForAPDSec?: Int;
}
