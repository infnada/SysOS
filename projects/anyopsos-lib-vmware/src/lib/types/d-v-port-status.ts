import {DynamicData} from './dynamic-data';

import {NumericRange} from './numeric-range';
import {Int} from './int';
export interface DVPortStatus extends DynamicData {
  blocked: boolean;
  linkPeer?: string;
  linkUp: boolean;
  macAddress?: string;
  mtu?: Int;
  statusDetail?: string;
  trunkingMode?: boolean;
  vlanIds?: NumericRange[];
}
