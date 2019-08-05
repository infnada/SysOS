import {EntityEventArgument} from './entity-event-argument';

import {ManagedObjectReference} from './managed-object-reference';
export interface ResourcePoolEventArgument extends EntityEventArgument {
  resourcePool: ManagedObjectReference & { $type: 'ResourcePool' };
}
