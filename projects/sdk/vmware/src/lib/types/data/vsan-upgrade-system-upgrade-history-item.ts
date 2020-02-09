import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface VsanUpgradeSystemUpgradeHistoryItem extends DynamicData {
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  message: string;
  task?: ManagedObjectReference & { $type: 'Task'; };
  timestamp: string;
}