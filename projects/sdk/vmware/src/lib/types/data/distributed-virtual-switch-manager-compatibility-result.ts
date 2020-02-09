import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';

export interface DistributedVirtualSwitchManagerCompatibilityResult extends DynamicData {
  error?: LocalizedMethodFault[];
  host: ManagedObjectReference & { $type: 'HostSystem'; };
}