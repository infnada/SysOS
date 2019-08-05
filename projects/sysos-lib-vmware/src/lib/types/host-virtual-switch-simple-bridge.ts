import {HostVirtualSwitchBridge} from './host-virtual-switch-bridge';

export interface HostVirtualSwitchSimpleBridge extends HostVirtualSwitchBridge {
  nicDevice: string;
}
