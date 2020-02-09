import {DynamicData} from './dynamic-data';

import {VirtualMachineFileLayoutExDiskLayout} from './virtual-machine-file-layout-ex-disk-layout';
import {ManagedObjectReference} from './managed-object-reference';

export interface VirtualMachineFileLayoutExSnapshotLayout extends DynamicData {
  dataKey: number;
  disk?: VirtualMachineFileLayoutExDiskLayout[];
  key: ManagedObjectReference & { $type: 'VirtualMachineSnapshot'; };
  memoryKey: number;
}