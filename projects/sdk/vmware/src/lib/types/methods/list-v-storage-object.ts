import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ListVStorageObject {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
}