import {FaultToleranceConfigInfo} from './fault-tolerance-config-info';

import {ManagedObjectReference} from './managed-object-reference';

export interface FaultTolerancePrimaryConfigInfo extends FaultToleranceConfigInfo {
  secondaries: ManagedObjectReference & { $type: 'VirtualMachine[]'; };
}