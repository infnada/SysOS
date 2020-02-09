import {DynamicData} from './dynamic-data';


export interface VirtualMachineFileLayoutDiskLayout extends DynamicData {
  diskFile: string[];
  key: number;
}