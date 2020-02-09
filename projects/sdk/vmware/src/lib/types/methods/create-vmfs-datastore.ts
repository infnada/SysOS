import {ManagedObjectReference} from '../data/managed-object-reference';
import {VmfsDatastoreCreateSpec} from '../data/vmfs-datastore-create-spec';


export interface CreateVmfsDatastore {
  _this: ManagedObjectReference;
  spec: VmfsDatastoreCreateSpec;
}