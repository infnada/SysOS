import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';

export interface FaultsByHost extends DynamicData {
  faults?: LocalizedMethodFault[];
  host: ManagedObjectReference & { $type: 'HostSystem'; };
}