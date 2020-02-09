import {ManagedObjectReference} from '../data/managed-object-reference';


export interface HostListVStorageObject {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
}