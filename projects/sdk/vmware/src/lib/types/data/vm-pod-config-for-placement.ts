import {DynamicData} from './dynamic-data';

import {PodDiskLocator} from './pod-disk-locator';
import {ClusterRuleInfo} from './cluster-rule-info';
import {ManagedObjectReference} from './managed-object-reference';
import {StorageDrsVmConfigInfo} from './storage-drs-vm-config-info';

export interface VmPodConfigForPlacement extends DynamicData {
  disk?: PodDiskLocator[];
  interVmRule?: ClusterRuleInfo[];
  storagePod: ManagedObjectReference & { $type: 'StoragePod'; };
  vmConfig?: StorageDrsVmConfigInfo;
}