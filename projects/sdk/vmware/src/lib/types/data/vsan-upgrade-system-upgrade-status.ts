import {DynamicData} from './dynamic-data';

import {VsanUpgradeSystemUpgradeHistoryItem} from './vsan-upgrade-system-upgrade-history-item';

export interface VsanUpgradeSystemUpgradeStatus extends DynamicData {
  aborted?: boolean;
  completed?: boolean;
  history?: VsanUpgradeSystemUpgradeHistoryItem[];
  inProgress: boolean;
  progress?: number;
}