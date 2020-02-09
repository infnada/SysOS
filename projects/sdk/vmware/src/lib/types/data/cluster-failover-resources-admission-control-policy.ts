import {ClusterDasAdmissionControlPolicy} from './cluster-das-admission-control-policy';


export interface ClusterFailoverResourcesAdmissionControlPolicy extends ClusterDasAdmissionControlPolicy {
  autoComputePercentages?: boolean;
  cpuFailoverResourcesPercent: number;
  failoverLevel?: number;
  memoryFailoverResourcesPercent: number;
}