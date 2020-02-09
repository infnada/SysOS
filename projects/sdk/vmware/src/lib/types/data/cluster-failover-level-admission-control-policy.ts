import {ClusterDasAdmissionControlPolicy} from './cluster-das-admission-control-policy';

import {ClusterSlotPolicy} from './cluster-slot-policy';

export interface ClusterFailoverLevelAdmissionControlPolicy extends ClusterDasAdmissionControlPolicy {
  failoverLevel: number;
  slotPolicy?: ClusterSlotPolicy;
}