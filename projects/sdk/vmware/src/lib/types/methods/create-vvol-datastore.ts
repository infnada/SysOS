import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostDatastoreSystemVvolDatastoreSpec} from '../data/host-datastore-system-vvol-datastore-spec';


export interface CreateVvolDatastore {
  _this: ManagedObjectReference;
  spec: HostDatastoreSystemVvolDatastoreSpec;
}