import {VsanUpgradeSystemPreflightCheckIssue} from './vsan-upgrade-system-preflight-check-issue';


export interface VsanUpgradeSystemNotEnoughFreeCapacityIssue extends VsanUpgradeSystemPreflightCheckIssue {
  reducedRedundancyUpgradePossible: boolean;
}