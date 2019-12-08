import {ClusterAction} from './cluster-action';
import {VirtualMachineRelocateSpec} from './virtual-machine-relocate-spec';
import {ManagedObjectReference} from './managed-object-reference';

export interface PlacementAction extends ClusterAction {
  relocateSpec?: VirtualMachineRelocateSpec;
  targetHost?: ManagedObjectReference & { $type: 'HostSystem' };
  vm?: ManagedObjectReference & { $type: 'VirtualMachine' };
}
