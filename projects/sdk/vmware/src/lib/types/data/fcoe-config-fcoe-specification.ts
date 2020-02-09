import {DynamicData} from './dynamic-data';

import {FcoeConfigVlanRange} from './fcoe-config-vlan-range';

export interface FcoeConfigFcoeSpecification extends DynamicData {
  priorityClass?: number;
  sourceMac?: string;
  underlyingPnic: string;
  vlanRange?: FcoeConfigVlanRange[];
}