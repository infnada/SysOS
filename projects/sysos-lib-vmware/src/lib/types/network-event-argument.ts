import {EntityEventArgument} from './entity-event-argument';

import {ManagedObjectReference} from './managed-object-reference';
export interface NetworkEventArgument extends EntityEventArgument {
  network: ManagedObjectReference & { $type: 'Network' };
}
