import {DynamicData} from './dynamic-data';

import {FcoeConfigVlanRange} from './fcoe-config-vlan-range';
import {Int} from './int';
export interface FcoeConfigFcoeSpecification extends DynamicData {
  priorityClass?: Int;
  sourceMac?: string;
  underlyingPnic: string;
  vlanRange?: FcoeConfigVlanRange[];
}
