import {DynamicData} from './dynamic-data';

import {HostNicFailureCriteria} from './host-nic-failure-criteria';
import {HostNicOrderPolicy} from './host-nic-order-policy';

export interface HostNicTeamingPolicy extends DynamicData {
  failureCriteria?: HostNicFailureCriteria;
  nicOrder?: HostNicOrderPolicy;
  notifySwitches?: boolean;
  policy?: string;
  reversePolicy?: boolean;
  rollingOrder?: boolean;
}