import {DynamicData} from './dynamic-data';

import {VmfsDatastoreBaseOption} from './vmfs-datastore-base-option';
import {VmfsDatastoreSpec} from './vmfs-datastore-spec';
export interface VmfsDatastoreOption extends DynamicData {
  info: VmfsDatastoreBaseOption;
  spec: VmfsDatastoreSpec;
}
