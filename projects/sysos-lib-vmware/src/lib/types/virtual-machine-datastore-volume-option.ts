import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VirtualMachineDatastoreVolumeOption extends DynamicData {
  fileSystemType: string;
  majorVersion?: Int;
}
