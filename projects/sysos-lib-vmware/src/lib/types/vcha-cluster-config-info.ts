import {DynamicData} from './dynamic-data';

import {WitnessNodeInfo} from './witness-node-info';
export interface VchaClusterConfigInfo extends DynamicData {
  state: string;
  witnessNodeInfo?: WitnessNodeInfo;
}
