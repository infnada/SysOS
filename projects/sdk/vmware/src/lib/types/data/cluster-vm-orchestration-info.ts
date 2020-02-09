import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ClusterVmReadiness} from './cluster-vm-readiness';

export interface ClusterVmOrchestrationInfo extends DynamicData {
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  vmReadiness: ClusterVmReadiness;
}