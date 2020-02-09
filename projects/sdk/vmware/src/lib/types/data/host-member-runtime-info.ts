import {DynamicData} from './dynamic-data';

import {HostMemberHealthCheckResult} from './host-member-health-check-result';
import {ManagedObjectReference} from './managed-object-reference';

export interface HostMemberRuntimeInfo extends DynamicData {
  healthCheckResult?: HostMemberHealthCheckResult[];
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  status?: string;
  statusDetail?: string;
}