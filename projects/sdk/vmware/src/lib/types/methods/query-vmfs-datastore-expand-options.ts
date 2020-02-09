import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryVmfsDatastoreExpandOptions {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
}