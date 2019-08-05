import {NodeNetworkSpec} from './node-network-spec';

import {CustomizationIPSettings} from './customization-i-p-settings';
export interface PassiveNodeNetworkSpec extends NodeNetworkSpec {
  failoverIpSettings?: CustomizationIPSettings;
}
