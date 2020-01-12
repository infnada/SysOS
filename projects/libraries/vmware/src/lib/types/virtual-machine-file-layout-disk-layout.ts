import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VirtualMachineFileLayoutDiskLayout extends DynamicData {
  diskFile: string[];
  key: Int;
}
