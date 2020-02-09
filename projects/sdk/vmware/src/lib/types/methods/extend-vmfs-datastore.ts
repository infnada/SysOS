import {ManagedObjectReference} from '../data/managed-object-reference';
import {VmfsDatastoreExtendSpec} from '../data/vmfs-datastore-extend-spec';


export interface ExtendVmfsDatastore {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  spec: VmfsDatastoreExtendSpec;
}