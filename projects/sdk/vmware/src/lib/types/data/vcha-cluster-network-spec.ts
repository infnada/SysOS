import {DynamicData} from './dynamic-data';

import {PassiveNodeNetworkSpec} from './passive-node-network-spec';
import {NodeNetworkSpec} from './node-network-spec';

export interface VchaClusterNetworkSpec extends DynamicData {
  passiveNetworkSpec: PassiveNodeNetworkSpec;
  witnessNetworkSpec: NodeNetworkSpec;
}