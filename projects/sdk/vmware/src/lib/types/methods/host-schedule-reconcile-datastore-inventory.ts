import {ManagedObjectReference} from '../data/managed-object-reference';


export interface HostScheduleReconcileDatastoreInventory {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
}