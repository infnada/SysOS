import {EntityEventArgument} from './entity-event-argument';

import {ManagedObjectReference} from './managed-object-reference';

export interface ManagedEntityEventArgument extends EntityEventArgument {
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
}