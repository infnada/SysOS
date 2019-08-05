import {VsanUpgradeSystemPreflightCheckIssue} from './vsan-upgrade-system-preflight-check-issue';

export interface VsanUpgradeSystemV2ObjectsPresentDuringDowngradeIssue extends VsanUpgradeSystemPreflightCheckIssue {
  uuids: string[];
}
