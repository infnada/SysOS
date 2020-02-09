import {ClusterDasHostInfo} from './cluster-das-host-info';

import {ClusterDasAamNodeState} from './cluster-das-aam-node-state';

export interface ClusterDasAamHostInfo extends ClusterDasHostInfo {
  hostDasState?: ClusterDasAamNodeState[];
  primaryHosts?: string[];
}