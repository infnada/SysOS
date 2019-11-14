import {HostMemberUplinkHealthCheckResult} from './host-member-uplink-health-check-result';

import {NumericRange} from './numeric-range';
export interface VMwareDVSVlanHealthCheckResult extends HostMemberUplinkHealthCheckResult {
  trunkedVlan?: NumericRange[];
  untrunkedVlan?: NumericRange[];
}
