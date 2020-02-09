import {DynamicData} from './dynamic-data';

import {ClusterComputeResourceDvsProfile} from './cluster-compute-resource-dvs-profile';
import {ClusterComputeResourceHostConfigurationProfile} from './cluster-compute-resource-host-configuration-profile';
import {ClusterComputeResourceVCProfile} from './cluster-compute-resource-v-c-profile';
import {SDDCBase} from './s-d-d-c-base';

export interface ClusterComputeResourceHCIConfigSpec extends DynamicData {
  dvsProf?: ClusterComputeResourceDvsProfile[];
  hostConfigProfile?: ClusterComputeResourceHostConfigurationProfile;
  vcProf?: ClusterComputeResourceVCProfile;
  vSanConfigSpec?: SDDCBase;
}