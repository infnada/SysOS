import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';
export interface ClusterEVCManagerCheckResult extends DynamicData {
  error: LocalizedMethodFault;
  evcModeKey: string;
  host?: ManagedObjectReference[] & { $type: 'HostSystem' };
}
