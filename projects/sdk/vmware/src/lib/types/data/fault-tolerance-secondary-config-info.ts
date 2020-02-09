import {FaultToleranceConfigInfo} from './fault-tolerance-config-info';

import {ManagedObjectReference} from './managed-object-reference';

export interface FaultToleranceSecondaryConfigInfo extends FaultToleranceConfigInfo {
  primaryVM: ManagedObjectReference & { $type: 'VirtualMachine'; };
}