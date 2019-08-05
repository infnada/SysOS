import {ClusterDasAdmissionControlPolicy} from './cluster-das-admission-control-policy';
import {Int} from './int';

export interface ClusterFailoverResourcesAdmissionControlPolicy extends ClusterDasAdmissionControlPolicy {
  autoComputePercentages?: boolean;
  cpuFailoverResourcesPercent: Int;
  failoverLevel?: Int;
  memoryFailoverResourcesPercent: Int;
}
