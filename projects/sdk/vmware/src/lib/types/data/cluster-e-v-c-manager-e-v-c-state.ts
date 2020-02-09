import {DynamicData} from './dynamic-data';

import {HostFeatureCapability} from './host-feature-capability';
import {HostFeatureMask} from './host-feature-mask';
import {VirtualMachineFeatureRequirement} from './virtual-machine-feature-requirement';
import {HostCpuIdInfo} from './host-cpu-id-info';
import {EVCMode} from './e-v-c-mode';

export interface ClusterEVCManagerEVCState extends DynamicData {
  currentEVCModeKey?: string;
  featureCapability?: HostFeatureCapability[];
  featureMask?: HostFeatureMask[];
  featureRequirement?: VirtualMachineFeatureRequirement[];
  guaranteedCPUFeatures?: HostCpuIdInfo[];
  supportedEVCMode: EVCMode[];
}