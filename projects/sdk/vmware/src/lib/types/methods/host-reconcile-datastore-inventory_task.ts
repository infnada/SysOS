import {ManagedObjectReference} from '../data/managed-object-reference';


export interface HostReconcileDatastoreInventory_Task {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
}