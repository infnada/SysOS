import {DynamicData} from './dynamic-data';

import {VirtualMachineUsageOnDatastore} from './virtual-machine-usage-on-datastore';
import {DateTime} from './date-time';
export interface VirtualMachineStorageInfo extends DynamicData {
  perDatastoreUsage?: VirtualMachineUsageOnDatastore[];
  timestamp: DateTime;
}
