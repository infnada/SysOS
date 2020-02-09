import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {FolderFailedHostResult} from './folder-failed-host-result';

export interface ClusterComputeResourceClusterConfigResult extends DynamicData {
  configuredHosts?: ManagedObjectReference & { $type: 'HostSystem[]'; };
  failedHosts?: FolderFailedHostResult[];
}