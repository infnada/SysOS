import {DynamicData} from './dynamic-data';

import {OptionValue} from './option-value';
import {HostFeatureCapability} from './host-feature-capability';
import {HostOpaqueSwitchPhysicalNicZone} from './host-opaque-switch-physical-nic-zone';
import {HostVirtualNic} from './host-virtual-nic';

export interface HostOpaqueSwitch extends DynamicData {
  extraConfig?: OptionValue[];
  featureCapability?: HostFeatureCapability[];
  key: string;
  name?: string;
  pnic?: string[];
  pnicZone?: HostOpaqueSwitchPhysicalNicZone[];
  status?: string;
  vtep?: HostVirtualNic[];
}