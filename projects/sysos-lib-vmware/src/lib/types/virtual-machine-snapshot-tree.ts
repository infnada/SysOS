import {DynamicData} from './dynamic-data';

import {VirtualMachineSnapshotTree} from './virtual-machine-snapshot-tree';
import {ManagedObjectReference} from './managed-object-reference';
import {VirtualMachinePowerState} from './virtual-machine-power-state';
import {Int} from './int';
import {DateTime} from './date-time';
export interface VirtualMachineSnapshotTree extends DynamicData {
  backupManifest?: string;
  childSnapshotList?: VirtualMachineSnapshotTree[];
  createTime: DateTime;
  description: string;
  id: Int;
  name: string;
  quiesced: boolean;
  replaySupported?: boolean;
  snapshot: ManagedObjectReference & { $type: 'VirtualMachineSnapshot' };
  state: VirtualMachinePowerState;
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
}
