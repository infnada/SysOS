import {DynamicData} from './dynamic-data';

import {ClusterPowerOnVmResult} from './cluster-power-on-vm-result';
import {ManagedObjectReference} from './managed-object-reference';

export interface FaultToleranceSecondaryOpResult extends DynamicData {
  powerOnAttempted: boolean;
  powerOnResult?: ClusterPowerOnVmResult;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}