import {DynamicData} from './dynamic-data';

import {VirtualMachineFileLayoutExDiskLayout} from './virtual-machine-file-layout-ex-disk-layout';
import {VirtualMachineFileLayoutExFileInfo} from './virtual-machine-file-layout-ex-file-info';
import {VirtualMachineFileLayoutExSnapshotLayout} from './virtual-machine-file-layout-ex-snapshot-layout';
import {DateTime} from './date-time';
export interface VirtualMachineFileLayoutEx extends DynamicData {
  disk?: VirtualMachineFileLayoutExDiskLayout[];
  file?: VirtualMachineFileLayoutExFileInfo[];
  snapshot?: VirtualMachineFileLayoutExSnapshotLayout[];
  timestamp: DateTime;
}
