import {DynamicData} from './dynamic-data';

import {PhysicalNicCdpInfo} from './physical-nic-cdp-info';
import {LinkLayerDiscoveryProtocolInfo} from './link-layer-discovery-protocol-info';
import {PhysicalNicNameHint} from './physical-nic-name-hint';
import {PhysicalNicIpHint} from './physical-nic-ip-hint';

export interface PhysicalNicHintInfo extends DynamicData {
  connectedSwitchPort?: PhysicalNicCdpInfo;
  device: string;
  lldpInfo?: LinkLayerDiscoveryProtocolInfo;
  network?: PhysicalNicNameHint[];
  subnet?: PhysicalNicIpHint[];
}