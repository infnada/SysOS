import {EntityEventArgument} from "./entity-event-argument";
import {ManagedObjectReference} from "./managed-object-reference";

export interface DatastoreEventArgument extends EntityEventArgument {
  datastore: ManagedObjectReference & { $type: 'Datastore' }
}
