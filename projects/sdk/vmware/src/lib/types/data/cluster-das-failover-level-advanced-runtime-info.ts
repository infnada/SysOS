import {ClusterDasAdvancedRuntimeInfo} from './cluster-das-advanced-runtime-info';

import {ClusterDasFailoverLevelAdvancedRuntimeInfoHostSlots} from './cluster-das-failover-level-advanced-runtime-info-host-slots';
import {ClusterDasFailoverLevelAdvancedRuntimeInfoSlotInfo} from './cluster-das-failover-level-advanced-runtime-info-slot-info';
import {ClusterDasFailoverLevelAdvancedRuntimeInfoVmSlots} from './cluster-das-failover-level-advanced-runtime-info-vm-slots';

export interface ClusterDasFailoverLevelAdvancedRuntimeInfo extends ClusterDasAdvancedRuntimeInfo {
  hostSlots?: ClusterDasFailoverLevelAdvancedRuntimeInfoHostSlots[];
  slotInfo: ClusterDasFailoverLevelAdvancedRuntimeInfoSlotInfo;
  totalGoodHosts: number;
  totalHosts: number;
  totalSlots: number;
  totalVms: number;
  unreservedSlots: number;
  usedSlots: number;
  vmsRequiringMultipleSlots?: ClusterDasFailoverLevelAdvancedRuntimeInfoVmSlots[];
}