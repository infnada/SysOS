import {DynamicData} from './dynamic-data';

import {OpaqueNetworkCapability} from './opaque-network-capability';
import {OptionValue} from './option-value';
export interface HostOpaqueNetworkInfo extends DynamicData {
  capability?: OpaqueNetworkCapability;
  extraConfig?: OptionValue[];
  opaqueNetworkId: string;
  opaqueNetworkName: string;
  opaqueNetworkType: string;
  pnicZone?: string[];
}
