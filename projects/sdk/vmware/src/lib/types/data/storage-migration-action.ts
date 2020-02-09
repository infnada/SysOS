import {ClusterAction} from './cluster-action';

import {ManagedObjectReference} from './managed-object-reference';
import {VirtualMachineRelocateSpec} from './virtual-machine-relocate-spec';

export interface StorageMigrationAction extends ClusterAction {
  destination: ManagedObjectReference & { $type: 'Datastore'; };
  ioLatencyDstBefore?: number;
  ioLatencySrcBefore?: number;
  relocateSpec: VirtualMachineRelocateSpec;
  sizeTransferred: number;
  source: ManagedObjectReference & { $type: 'Datastore'; };
  spaceUtilDstAfter?: number;
  spaceUtilDstBefore?: number;
  spaceUtilSrcAfter?: number;
  spaceUtilSrcBefore?: number;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}