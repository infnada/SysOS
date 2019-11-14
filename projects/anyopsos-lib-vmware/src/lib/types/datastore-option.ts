import {DynamicData} from './dynamic-data';

import {VirtualMachineDatastoreVolumeOption} from './virtual-machine-datastore-volume-option';
export interface DatastoreOption extends DynamicData {
  unsupportedVolumes?: VirtualMachineDatastoreVolumeOption[];
}
