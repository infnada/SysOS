import {HostEvent} from './host-event';

import {HostMemberHealthCheckResult} from './host-member-health-check-result';

export interface DvsHealthStatusChangeEvent extends HostEvent {
  healthResult?: HostMemberHealthCheckResult;
  switchUuid: string;
}