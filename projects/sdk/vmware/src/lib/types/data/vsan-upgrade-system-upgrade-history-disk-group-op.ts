import {VsanUpgradeSystemUpgradeHistoryItem} from './vsan-upgrade-system-upgrade-history-item';

import {VsanHostDiskMapping} from './vsan-host-disk-mapping';

export interface VsanUpgradeSystemUpgradeHistoryDiskGroupOp extends VsanUpgradeSystemUpgradeHistoryItem {
  diskMapping: VsanHostDiskMapping;
  operation: string;
}