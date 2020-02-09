import {ClusterAction} from './cluster-action';

import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterInitialPlacementAction extends ClusterAction {
  pool?: ManagedObjectReference & { $type: 'ResourcePool'; };
  targetHost: ManagedObjectReference & { $type: 'HostSystem'; };
}