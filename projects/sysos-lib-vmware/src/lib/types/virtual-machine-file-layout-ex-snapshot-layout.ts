import {DynamicData} from './dynamic-data';

import {VirtualMachineFileLayoutExDiskLayout} from './virtual-machine-file-layout-ex-disk-layout';
import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface VirtualMachineFileLayoutExSnapshotLayout extends DynamicData {
  dataKey: Int;
  disk?: VirtualMachineFileLayoutExDiskLayout[];
  key: ManagedObjectReference & { $type: 'VirtualMachineSnapshot' };
  memoryKey: Int;
}
