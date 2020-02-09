import {DynamicData} from './dynamic-data';

import {VirtualMachineUsageOnDatastore} from './virtual-machine-usage-on-datastore';

export interface VirtualMachineStorageInfo extends DynamicData {
  perDatastoreUsage?: VirtualMachineUsageOnDatastore[];
  timestamp: string;
}