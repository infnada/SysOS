import {VsanUpgradeSystemPreflightCheckIssue} from './vsan-upgrade-system-preflight-check-issue';

import {ManagedObjectReference} from './managed-object-reference';

export interface VsanUpgradeSystemHostsDisconnectedIssue extends VsanUpgradeSystemPreflightCheckIssue {
  hosts: ManagedObjectReference & { $type: 'HostSystem[]'; };
}