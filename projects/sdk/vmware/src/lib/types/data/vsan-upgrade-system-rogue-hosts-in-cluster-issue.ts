import {VsanUpgradeSystemPreflightCheckIssue} from './vsan-upgrade-system-preflight-check-issue';


export interface VsanUpgradeSystemRogueHostsInClusterIssue extends VsanUpgradeSystemPreflightCheckIssue {
  uuids: string[];
}