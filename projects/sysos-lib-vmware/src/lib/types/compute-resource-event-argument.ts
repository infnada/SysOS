import {EntityEventArgument} from './entity-event-argument';

import {ManagedObjectReference} from './managed-object-reference';
export interface ComputeResourceEventArgument extends EntityEventArgument {
  computeResource: ManagedObjectReference & { $type: 'ComputeResource' };
}
