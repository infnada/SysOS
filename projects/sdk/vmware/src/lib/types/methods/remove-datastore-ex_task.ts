import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveDatastoreEx_Task {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore[]'; };
}