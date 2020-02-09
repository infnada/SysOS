import {EntityEventArgument} from './entity-event-argument';

import {ManagedObjectReference} from './managed-object-reference';

export interface DatacenterEventArgument extends EntityEventArgument {
  datacenter: ManagedObjectReference & { $type: 'Datacenter'; };
}