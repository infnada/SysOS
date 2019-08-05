import {ClusterDasAdmissionControlPolicy} from './cluster-das-admission-control-policy';

import {ClusterSlotPolicy} from './cluster-slot-policy';
import {Int} from './int';
export interface ClusterFailoverLevelAdmissionControlPolicy extends ClusterDasAdmissionControlPolicy {
  failoverLevel: Int;
  slotPolicy?: ClusterSlotPolicy;
}
