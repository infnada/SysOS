import {DynamicData} from './dynamic-data';

import {VsanUpgradeSystemUpgradeHistoryItem} from './vsan-upgrade-system-upgrade-history-item';
import {Int} from './int';
export interface VsanUpgradeSystemUpgradeStatus extends DynamicData {
  aborted?: boolean;
  completed?: boolean;
  history?: VsanUpgradeSystemUpgradeHistoryItem[];
  inProgress: boolean;
  progress?: Int;
}
