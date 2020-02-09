import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {FolderFailedHostResult} from './folder-failed-host-result';

export interface FolderBatchAddHostsToClusterResult extends DynamicData {
  hostsAddedToCluster?: ManagedObjectReference & { $type: 'HostSystem[]'; };
  hostsFailedInventoryAdd?: FolderFailedHostResult[];
  hostsFailedMoveToCluster?: FolderFailedHostResult[];
}