import {DynamicData} from './dynamic-data';

import {VmPodConfigForPlacement} from './vm-pod-config-for-placement';
import {ManagedObjectReference} from './managed-object-reference';

export interface StorageDrsPodSelectionSpec extends DynamicData {
  initialVmConfig?: VmPodConfigForPlacement[];
  storagePod?: ManagedObjectReference & { $type: 'StoragePod'; };
}