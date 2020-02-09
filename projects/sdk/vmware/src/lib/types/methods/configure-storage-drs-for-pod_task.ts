import {ManagedObjectReference} from '../data/managed-object-reference';
import {StorageDrsConfigSpec} from '../data/storage-drs-config-spec';


export interface ConfigureStorageDrsForPod_Task {
  _this: ManagedObjectReference;
  pod: ManagedObjectReference & { $type: 'StoragePod'; };
  spec: StorageDrsConfigSpec;
  modify: boolean;
}