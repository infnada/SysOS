import {ClusterDasAdmissionControlInfo} from './cluster-das-admission-control-info';


export interface ClusterFailoverLevelAdmissionControlInfo extends ClusterDasAdmissionControlInfo {
  currentFailoverLevel: number;
}