import {ClusterDasAdmissionControlInfo} from './cluster-das-admission-control-info';
import {Int} from './int';

export interface ClusterFailoverLevelAdmissionControlInfo extends ClusterDasAdmissionControlInfo {
  currentFailoverLevel: Int;
}
