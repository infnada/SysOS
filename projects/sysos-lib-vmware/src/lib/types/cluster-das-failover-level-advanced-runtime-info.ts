import {ClusterDasAdvancedRuntimeInfo} from './cluster-das-advanced-runtime-info';

import {ClusterDasFailoverLevelAdvancedRuntimeInfoHostSlots} from './cluster-das-failover-level-advanced-runtime-info-host-slots';
import {ClusterDasFailoverLevelAdvancedRuntimeInfoSlotInfo} from './cluster-das-failover-level-advanced-runtime-info-slot-info';
import {ClusterDasFailoverLevelAdvancedRuntimeInfoVmSlots} from './cluster-das-failover-level-advanced-runtime-info-vm-slots';
import {Int} from './int';
export interface ClusterDasFailoverLevelAdvancedRuntimeInfo extends ClusterDasAdvancedRuntimeInfo {
  hostSlots?: ClusterDasFailoverLevelAdvancedRuntimeInfoHostSlots[];
  slotInfo: ClusterDasFailoverLevelAdvancedRuntimeInfoSlotInfo;
  totalGoodHosts: Int;
  totalHosts: Int;
  totalSlots: Int;
  totalVms: Int;
  unreservedSlots: Int;
  usedSlots: Int;
  vmsRequiringMultipleSlots?: ClusterDasFailoverLevelAdvancedRuntimeInfoVmSlots[];
}
