import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ClusterComputeResourceDVSSetting} from './cluster-compute-resource-d-v-s-setting';
import {ClusterComputeResourceHostConfigurationProfile} from './cluster-compute-resource-host-configuration-profile';

export interface ClusterComputeResourceHCIConfigInfo extends DynamicData {
  configuredHosts?: ManagedObjectReference & { $type: 'HostSystem[]'; };
  dvsSetting?: ClusterComputeResourceDVSSetting[];
  hostConfigProfile?: ClusterComputeResourceHostConfigurationProfile;
  workflowState: string;
}