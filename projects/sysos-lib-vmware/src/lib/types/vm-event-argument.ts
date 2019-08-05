import {EntityEventArgument} from './entity-event-argument';

import {ManagedObjectReference} from './managed-object-reference';
export interface VmEventArgument extends EntityEventArgument {
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
}
