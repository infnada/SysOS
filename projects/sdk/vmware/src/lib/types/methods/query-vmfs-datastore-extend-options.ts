import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryVmfsDatastoreExtendOptions {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  devicePath: string;
  suppressExpandCandidates?: boolean;
}