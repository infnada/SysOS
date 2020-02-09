import {ManagedObjectReference} from '../data/managed-object-reference';


export interface HostRetrieveVStorageInfrastructureObjectPolicy {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
}