import {DynamicData} from './dynamic-data';

import {VsanHostDiskMapping} from './vsan-host-disk-mapping';
import {VsanUpgradeSystemPreflightCheckIssue} from './vsan-upgrade-system-preflight-check-issue';

export interface VsanUpgradeSystemPreflightCheckResult extends DynamicData {
  diskMappingToRestore?: VsanHostDiskMapping;
  issues?: VsanUpgradeSystemPreflightCheckIssue[];
}