import {ManagedObjectReference} from "./managed-object-reference";
import {EntityEventArgument} from "./entity-event-argument";

export interface DatacenterEventArgument extends EntityEventArgument {
  datacenter: ManagedObjectReference & { $type: 'Datacenter' }
}
