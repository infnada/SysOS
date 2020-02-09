import {DynamicData} from './dynamic-data';

import {VirtualMachineFileLayoutExDiskUnit} from './virtual-machine-file-layout-ex-disk-unit';

export interface VirtualMachineFileLayoutExDiskLayout extends DynamicData {
  chain?: VirtualMachineFileLayoutExDiskUnit[];
  key: number;
}