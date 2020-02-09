import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DeleteDatastoreFile_Task {
  _this: ManagedObjectReference;
  name: string;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
}