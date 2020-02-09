import {DynamicData} from './dynamic-data';

import {VirtualMachineFileLayoutDiskLayout} from './virtual-machine-file-layout-disk-layout';
import {VirtualMachineFileLayoutSnapshotLayout} from './virtual-machine-file-layout-snapshot-layout';

export interface VirtualMachineFileLayout extends DynamicData {
  configFile?: string[];
  disk?: VirtualMachineFileLayoutDiskLayout[];
  logFile?: string[];
  snapshot?: VirtualMachineFileLayoutSnapshotLayout[];
  swapFile?: string;
}