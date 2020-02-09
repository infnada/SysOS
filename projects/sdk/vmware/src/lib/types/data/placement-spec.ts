import {DynamicData} from './dynamic-data';

import {VirtualMachineCloneSpec} from './virtual-machine-clone-spec';
import {VirtualMachineConfigSpec} from './virtual-machine-config-spec';
import {ManagedObjectReference} from './managed-object-reference';
import {VirtualMachineMovePriority} from '../enums/virtual-machine-move-priority';
import {VirtualMachineRelocateSpec} from './virtual-machine-relocate-spec';
import {ClusterRuleInfo} from './cluster-rule-info';

export interface PlacementSpec extends DynamicData {
  cloneName?: string;
  cloneSpec?: VirtualMachineCloneSpec;
  configSpec?: VirtualMachineConfigSpec;
  datastores?: ManagedObjectReference & { $type: 'Datastore[]'; };
  disallowPrerequisiteMoves?: boolean;
  hosts?: ManagedObjectReference & { $type: 'HostSystem[]'; };
  key?: string;
  placementType?: string;
  priority?: VirtualMachineMovePriority;
  relocateSpec?: VirtualMachineRelocateSpec;
  rules?: ClusterRuleInfo[];
  storagePods?: ManagedObjectReference & { $type: 'StoragePod[]'; };
  vm?: ManagedObjectReference & { $type: 'VirtualMachine'; };
}