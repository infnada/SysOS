import {DynamicData} from './dynamic-data';


export interface VirtualMachineDatastoreVolumeOption extends DynamicData {
  fileSystemType: string;
  majorVersion?: number;
}