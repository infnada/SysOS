import {DynamicData} from './dynamic-data';


export interface VirtualMachineWipeResult extends DynamicData {
  diskId: number;
  shrinkableDiskSpace: number;
}