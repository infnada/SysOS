import {ClusterDasAdmissionControlPolicy} from './cluster-das-admission-control-policy';

import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterFailoverHostAdmissionControlPolicy extends ClusterDasAdmissionControlPolicy {
  failoverHosts?: ManagedObjectReference & { $type: 'HostSystem[]'; };
  failoverLevel?: number;
}