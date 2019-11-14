import {DynamicData} from './dynamic-data';

import {VirtualMachineFileLayoutExDiskUnit} from './virtual-machine-file-layout-ex-disk-unit';
import {Int} from './int';
export interface VirtualMachineFileLayoutExDiskLayout extends DynamicData {
  chain?: VirtualMachineFileLayoutExDiskUnit[];
  key: Int;
}
