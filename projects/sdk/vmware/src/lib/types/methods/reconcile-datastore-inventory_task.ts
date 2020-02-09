import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ReconcileDatastoreInventory_Task {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
}