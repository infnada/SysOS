import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ScheduleReconcileDatastoreInventory {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
}