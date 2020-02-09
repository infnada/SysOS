import {DynamicData} from './dynamic-data';

import {NumericRange} from './numeric-range';

export interface DVPortStatus extends DynamicData {
  blocked: boolean;
  linkPeer?: string;
  linkUp: boolean;
  macAddress?: string;
  mtu?: number;
  statusDetail?: string;
  trunkingMode?: boolean;
  vlanIds?: NumericRange[];
  vmDirectPathGen2Active?: boolean;
  vmDirectPathGen2InactiveReasonExtended?: string;
  vmDirectPathGen2InactiveReasonNetwork?: string[];
  vmDirectPathGen2InactiveReasonOther?: string[];
}