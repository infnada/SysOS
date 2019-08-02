import {ManagedObjectReference} from "./managed-object-reference";
import {EntityEventArgument} from "./entity-event-argument";

export interface ComputeResourceEventArgument extends EntityEventArgument {
  computeResource: ManagedObjectReference & { $type: 'ComputeResource' }
}
