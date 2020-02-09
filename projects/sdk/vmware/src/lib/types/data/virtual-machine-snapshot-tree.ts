import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {VirtualMachinePowerState} from '../enums/virtual-machine-power-state';

export interface VirtualMachineSnapshotTree extends DynamicData {
  backupManifest?: string;
  childSnapshotList?: VirtualMachineSnapshotTree[];
  createTime: string;
  description: string;
  id: number;
  name: string;
  quiesced: boolean;
  replaySupported?: boolean;
  snapshot: ManagedObjectReference & { $type: 'VirtualMachineSnapshot'; };
  state: VirtualMachinePowerState;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}