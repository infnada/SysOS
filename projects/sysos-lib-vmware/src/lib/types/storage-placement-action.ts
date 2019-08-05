import {ClusterAction} from './cluster-action';

import {ManagedObjectReference} from './managed-object-reference';
import {VirtualMachineRelocateSpec} from './virtual-machine-relocate-spec';
import {Float} from './float';
export interface StoragePlacementAction extends ClusterAction {
  destination: ManagedObjectReference & { $type: 'Datastore' };
  ioLatencyBefore?: Float;
  relocateSpec: VirtualMachineRelocateSpec;
  spaceDemandAfter?: Float;
  spaceDemandBefore?: Float;
  spaceUtilAfter?: Float;
  spaceUtilBefore?: Float;
  vm?: ManagedObjectReference & { $type: 'VirtualMachine' };
}
