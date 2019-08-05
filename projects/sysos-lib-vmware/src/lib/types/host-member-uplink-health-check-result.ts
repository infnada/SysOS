import {HostMemberHealthCheckResult} from './host-member-health-check-result';

export interface HostMemberUplinkHealthCheckResult extends HostMemberHealthCheckResult {
  uplinkPortKey: string;
}
