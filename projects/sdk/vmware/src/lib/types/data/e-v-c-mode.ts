import {ElementDescription} from './element-description';

import {HostFeatureCapability} from './host-feature-capability';
import {HostFeatureMask} from './host-feature-mask';
import {VirtualMachineFeatureRequirement} from './virtual-machine-feature-requirement';
import {HostCpuIdInfo} from './host-cpu-id-info';

export interface EVCMode extends ElementDescription {
  featureCapability?: HostFeatureCapability[];
  featureMask?: HostFeatureMask[];
  featureRequirement?: VirtualMachineFeatureRequirement[];
  guaranteedCPUFeatures?: HostCpuIdInfo[];
  track: string[];
  vendor: string;
  vendorTier: number;
}