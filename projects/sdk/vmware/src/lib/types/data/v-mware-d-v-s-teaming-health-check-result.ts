import {HostMemberHealthCheckResult} from './host-member-health-check-result';


export interface VMwareDVSTeamingHealthCheckResult extends HostMemberHealthCheckResult {
  teamingStatus: string;
}