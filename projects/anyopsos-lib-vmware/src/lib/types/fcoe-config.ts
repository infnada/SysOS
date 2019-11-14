import {DynamicData} from './dynamic-data';

import {FcoeConfigFcoeCapabilities} from './fcoe-config-fcoe-capabilities';
import {FcoeConfigVlanRange} from './fcoe-config-vlan-range';
import {Int} from './int';
export interface FcoeConfig extends DynamicData {
  capabilities: FcoeConfigFcoeCapabilities;
  fcoeActive: boolean;
  priorityClass: Int;
  sourceMac: string;
  vlanRange: FcoeConfigVlanRange[];
}
