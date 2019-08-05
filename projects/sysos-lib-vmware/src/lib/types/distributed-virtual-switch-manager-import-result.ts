import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ManagedObjectReference} from './managed-object-reference';
import {ImportOperationBulkFaultFaultOnImport} from './import-operation-bulk-fault-fault-on-import';
export interface DistributedVirtualSwitchManagerImportResult extends DynamicData {
  distributedVirtualPortgroup?: ManagedObjectReference[] & { $type: 'DistributedVirtualPortgroup' };
  distributedVirtualSwitch?: ManagedObjectReference[] & { $type: 'DistributedVirtualSwitch' };
  importFault?: ImportOperationBulkFaultFaultOnImport[];
}
