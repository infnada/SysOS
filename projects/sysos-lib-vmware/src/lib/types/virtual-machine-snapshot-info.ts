import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {VirtualMachineSnapshotTree} from './virtual-machine-snapshot-tree';
export interface VirtualMachineSnapshotInfo extends DynamicData {
  currentSnapshot?: ManagedObjectReference & { $type: 'VirtualMachineSnapshot' };
  rootSnapshotList: VirtualMachineSnapshotTree[];
}
