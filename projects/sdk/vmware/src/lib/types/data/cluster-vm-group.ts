import {ClusterGroupInfo} from './cluster-group-info';

import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterVmGroup extends ClusterGroupInfo {
  vm?: ManagedObjectReference & { $type: 'VirtualMachine[]'; };
}