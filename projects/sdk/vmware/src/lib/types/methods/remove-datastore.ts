import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveDatastore {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
}