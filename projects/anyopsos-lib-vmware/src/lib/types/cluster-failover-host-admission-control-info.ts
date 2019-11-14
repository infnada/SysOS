import {ClusterDasAdmissionControlInfo} from './cluster-das-admission-control-info';

import {ClusterFailoverHostAdmissionControlInfoHostStatus} from './cluster-failover-host-admission-control-info-host-status';
export interface ClusterFailoverHostAdmissionControlInfo extends ClusterDasAdmissionControlInfo {
  hostStatus?: ClusterFailoverHostAdmissionControlInfoHostStatus[];
}
