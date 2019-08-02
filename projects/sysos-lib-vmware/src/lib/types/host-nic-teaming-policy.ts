import {HostNicFailureCriteria} from "./host-nic-failure-criteria";
import {HostNicOrderPolicy} from "./host-nic-order-policy";

export interface HostNicTeamingPolicy {
  failureCriteria?: HostNicFailureCriteria;
  nicOrder?: HostNicOrderPolicy;
  notifySwitches?: boolean;
  policy?: string;
  reversePolicy?: boolean;
  rollingOrder?: boolean;
}
