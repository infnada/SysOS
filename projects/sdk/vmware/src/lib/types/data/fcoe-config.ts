import {DynamicData} from './dynamic-data';

import {FcoeConfigFcoeCapabilities} from './fcoe-config-fcoe-capabilities';
import {FcoeConfigVlanRange} from './fcoe-config-vlan-range';

export interface FcoeConfig extends DynamicData {
  capabilities: FcoeConfigFcoeCapabilities;
  fcoeActive: boolean;
  priorityClass: number;
  sourceMac: string;
  vlanRange: FcoeConfigVlanRange[];
}