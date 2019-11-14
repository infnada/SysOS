import {InheritablePolicy} from './inheritable-policy';

import {DVSFailureCriteria} from './d-v-s-failure-criteria';
import {BoolPolicy} from './bool-policy';
import {StringPolicy} from './string-policy';
import {VMwareUplinkPortOrderPolicy} from './v-mware-uplink-port-order-policy';
export interface VmwareUplinkPortTeamingPolicy extends InheritablePolicy {
  failureCriteria?: DVSFailureCriteria;
  notifySwitches?: BoolPolicy;
  policy?: StringPolicy;
  reversePolicy?: BoolPolicy;
  rollingOrder?: BoolPolicy;
  uplinkPortOrder?: VMwareUplinkPortOrderPolicy;
}
