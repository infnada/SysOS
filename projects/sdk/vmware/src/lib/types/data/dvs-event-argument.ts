import {EntityEventArgument} from './entity-event-argument';

import {ManagedObjectReference} from './managed-object-reference';

export interface DvsEventArgument extends EntityEventArgument {
  dvs: ManagedObjectReference & { $type: 'DistributedVirtualSwitch'; };
}