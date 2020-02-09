import {DynamicData} from './dynamic-data';

import {ClusterDasHostInfo} from './cluster-das-host-info';
import {DasHeartbeatDatastoreInfo} from './das-heartbeat-datastore-info';
import {ClusterDasAdvancedRuntimeInfoVmcpCapabilityInfo} from './cluster-das-advanced-runtime-info-vmcp-capability-info';

export interface ClusterDasAdvancedRuntimeInfo extends DynamicData {
  dasHostInfo?: ClusterDasHostInfo;
  heartbeatDatastoreInfo?: DasHeartbeatDatastoreInfo[];
  vmcpSupported?: ClusterDasAdvancedRuntimeInfoVmcpCapabilityInfo;
}