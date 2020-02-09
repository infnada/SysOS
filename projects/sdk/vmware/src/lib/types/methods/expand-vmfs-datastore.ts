import {ManagedObjectReference} from '../data/managed-object-reference';
import {VmfsDatastoreExpandSpec} from '../data/vmfs-datastore-expand-spec';


export interface ExpandVmfsDatastore {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  spec: VmfsDatastoreExpandSpec;
}