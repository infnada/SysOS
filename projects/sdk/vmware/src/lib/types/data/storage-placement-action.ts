import {ClusterAction} from './cluster-action';

import {ManagedObjectReference} from './managed-object-reference';
import {VirtualMachineRelocateSpec} from './virtual-machine-relocate-spec';

export interface StoragePlacementAction extends ClusterAction {
  destination: ManagedObjectReference & { $type: 'Datastore'; };
  ioLatencyBefore?: number;
  relocateSpec: VirtualMachineRelocateSpec;
  spaceDemandAfter?: number;
  spaceDemandBefore?: number;
  spaceUtilAfter?: number;
  spaceUtilBefore?: number;
  vm?: ManagedObjectReference & { $type: 'VirtualMachine'; };
}