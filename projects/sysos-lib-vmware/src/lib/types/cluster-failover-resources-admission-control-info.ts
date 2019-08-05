import {ClusterDasAdmissionControlInfo} from './cluster-das-admission-control-info';
import {Int} from './int';

export interface ClusterFailoverResourcesAdmissionControlInfo extends ClusterDasAdmissionControlInfo {
  currentCpuFailoverResourcesPercent: Int;
  currentMemoryFailoverResourcesPercent: Int;
}
