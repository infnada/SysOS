import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {FolderFailedHostResult} from './folder-failed-host-result';

export interface FolderBatchAddStandaloneHostsResult extends DynamicData {
  addedHosts?: ManagedObjectReference & { $type: 'HostSystem[]'; };
  hostsFailedInventoryAdd?: FolderFailedHostResult[];
}