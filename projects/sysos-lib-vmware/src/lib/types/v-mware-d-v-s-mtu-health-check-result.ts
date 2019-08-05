import {HostMemberUplinkHealthCheckResult} from './host-member-uplink-health-check-result';

import {NumericRange} from './numeric-range';
export interface VMwareDVSMtuHealthCheckResult extends HostMemberUplinkHealthCheckResult {
  mtuMismatch: boolean;
  vlanNotSupportSwitchMtu?: NumericRange[];
  vlanSupportSwitchMtu?: NumericRange[];
}
