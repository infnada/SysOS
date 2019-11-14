import {HostVirtualSwitchBridge} from './host-virtual-switch-bridge';

export interface HostVirtualSwitchAutoBridge extends HostVirtualSwitchBridge {
  excludedNicDevice?: string[];
}
