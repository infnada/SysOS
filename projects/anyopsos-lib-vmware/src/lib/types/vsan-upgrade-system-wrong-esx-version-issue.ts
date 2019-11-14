import {VsanUpgradeSystemPreflightCheckIssue} from './vsan-upgrade-system-preflight-check-issue';

import {ManagedObjectReference} from './managed-object-reference';
export interface VsanUpgradeSystemWrongEsxVersionIssue extends VsanUpgradeSystemPreflightCheckIssue {
  hosts: ManagedObjectReference[] & { $type: 'HostSystem' };
}
