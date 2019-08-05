import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {DateTime} from './date-time';
export interface VsanUpgradeSystemUpgradeHistoryItem extends DynamicData {
  host?: ManagedObjectReference & { $type: 'HostSystem' };
  message: string;
  task?: ManagedObjectReference & { $type: 'Task' };
  timestamp: DateTime;
}
