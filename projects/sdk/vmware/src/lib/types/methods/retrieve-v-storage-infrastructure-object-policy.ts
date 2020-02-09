import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RetrieveVStorageInfrastructureObjectPolicy {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
}