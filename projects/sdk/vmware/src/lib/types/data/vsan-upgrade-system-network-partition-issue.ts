import {VsanUpgradeSystemPreflightCheckIssue} from './vsan-upgrade-system-preflight-check-issue';

import {VsanUpgradeSystemNetworkPartitionInfo} from './vsan-upgrade-system-network-partition-info';

export interface VsanUpgradeSystemNetworkPartitionIssue extends VsanUpgradeSystemPreflightCheckIssue {
  partitions: VsanUpgradeSystemNetworkPartitionInfo[];
}