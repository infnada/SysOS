import {ClusterAction} from './cluster-action';

import {ManagedObjectReference} from './managed-object-reference';
import {VirtualMachineRelocateSpec} from './virtual-machine-relocate-spec';
import {Long} from './long';
import {Float} from './float';
export interface StorageMigrationAction extends ClusterAction {
  destination: ManagedObjectReference & { $type: 'Datastore' };
  ioLatencyDstBefore?: Float;
  ioLatencySrcBefore?: Float;
  relocateSpec: VirtualMachineRelocateSpec;
  sizeTransferred: Long;
  source: ManagedObjectReference & { $type: 'Datastore' };
  spaceUtilDstAfter?: Float;
  spaceUtilDstBefore?: Float;
  spaceUtilSrcAfter?: Float;
  spaceUtilSrcBefore?: Float;
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
}
