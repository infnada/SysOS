import {ClusterGroupInfo} from './cluster-group-info';

import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterHostGroup extends ClusterGroupInfo {
  host?: ManagedObjectReference & { $type: 'HostSystem[]'; };
}