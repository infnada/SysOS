import {HostVirtualSwitchBridge} from './host-virtual-switch-bridge';

import {HostVirtualSwitchBeaconConfig} from './host-virtual-switch-beacon-config';
import {LinkDiscoveryProtocolConfig} from './link-discovery-protocol-config';

export interface HostVirtualSwitchBondBridge extends HostVirtualSwitchBridge {
  beacon?: HostVirtualSwitchBeaconConfig;
  linkDiscoveryProtocolConfig?: LinkDiscoveryProtocolConfig;
  nicDevice: string[];
}