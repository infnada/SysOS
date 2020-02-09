import {DynamicData} from './dynamic-data';

import {FailoverNodeInfo} from './failover-node-info';
import {WitnessNodeInfo} from './witness-node-info';

export interface VchaClusterConfigInfo extends DynamicData {
  failoverNodeInfo1?: FailoverNodeInfo;
  failoverNodeInfo2?: FailoverNodeInfo;
  state: string;
  witnessNodeInfo?: WitnessNodeInfo;
}