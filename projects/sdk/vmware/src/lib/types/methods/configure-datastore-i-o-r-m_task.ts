import {ManagedObjectReference} from '../data/managed-object-reference';
import {StorageIORMConfigSpec} from '../data/storage-i-o-r-m-config-spec';


export interface ConfigureDatastoreIORM_Task {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  spec: StorageIORMConfigSpec;
}