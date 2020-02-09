import {ClusterDasAdmissionControlInfo} from './cluster-das-admission-control-info';


export interface ClusterFailoverResourcesAdmissionControlInfo extends ClusterDasAdmissionControlInfo {
  currentCpuFailoverResourcesPercent: number;
  currentMemoryFailoverResourcesPercent: number;
}