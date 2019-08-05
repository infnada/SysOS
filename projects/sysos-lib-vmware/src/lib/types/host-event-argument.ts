import {EntityEventArgument} from './entity-event-argument';

import {ManagedObjectReference} from './managed-object-reference';
export interface HostEventArgument extends EntityEventArgument {
  host: ManagedObjectReference & { $type: 'HostSystem' };
}
