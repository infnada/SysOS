import {DynamicData} from './dynamic-data';

import {VirtualMachineCloneSpec} from './virtual-machine-clone-spec';
import {VirtualMachineConfigSpec} from './virtual-machine-config-spec';
import {ManagedObjectReference} from './managed-object-reference';
import {StorageDrsPodSelectionSpec} from './storage-drs-pod-selection-spec';
import {VirtualMachineMovePriority} from '../enums/virtual-machine-move-priority';
import {VirtualMachineRelocateSpec} from './virtual-machine-relocate-spec';

export interface StoragePlacementSpec extends DynamicData {
  cloneName?: string;
  cloneSpec?: VirtualMachineCloneSpec;
  configSpec?: VirtualMachineConfigSpec;
  disallowPrerequisiteMoves?: boolean;
  folder?: ManagedObjectReference & { $type: 'Folder'; };
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  podSelectionSpec: StorageDrsPodSelectionSpec;
  priority?: VirtualMachineMovePriority;
  relocateSpec?: VirtualMachineRelocateSpec;
  resourceLeaseDurationSec?: number;
  resourcePool?: ManagedObjectReference & { $type: 'ResourcePool'; };
  type: string;
  vm?: ManagedObjectReference & { $type: 'VirtualMachine'; };
}