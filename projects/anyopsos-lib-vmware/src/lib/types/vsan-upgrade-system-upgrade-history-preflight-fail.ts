import {VsanUpgradeSystemUpgradeHistoryItem} from './vsan-upgrade-system-upgrade-history-item';

import {VsanUpgradeSystemPreflightCheckResult} from './vsan-upgrade-system-preflight-check-result';
export interface VsanUpgradeSystemUpgradeHistoryPreflightFail extends VsanUpgradeSystemUpgradeHistoryItem {
  preflightResult: VsanUpgradeSystemPreflightCheckResult;
}
