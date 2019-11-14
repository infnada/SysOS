import {ClusterDasAdmissionControlPolicy} from './cluster-das-admission-control-policy';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface ClusterFailoverHostAdmissionControlPolicy extends ClusterDasAdmissionControlPolicy {
  failoverHosts?: ManagedObjectReference[] & { $type: 'HostSystem' };
  failoverLevel?: Int;
}
