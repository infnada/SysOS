import {DynamicData} from './dynamic-data';

import {VchaNodeRuntimeInfo} from './vcha-node-runtime-info';

export interface VchaClusterRuntimeInfo extends DynamicData {
  clusterMode: string;
  clusterState: string;
  nodeInfo?: VchaNodeRuntimeInfo[];
}