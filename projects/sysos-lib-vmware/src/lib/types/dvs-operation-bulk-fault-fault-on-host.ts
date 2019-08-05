import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';
export interface DvsOperationBulkFaultFaultOnHost extends DynamicData {
  fault: LocalizedMethodFault;
  host: ManagedObjectReference & { $type: 'HostSystem' };
}
