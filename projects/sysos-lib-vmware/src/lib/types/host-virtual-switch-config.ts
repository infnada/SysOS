import {HostVirtualSwitchSpec} from "./host-virtual-switch-spec";

export interface HostVirtualSwitchConfig {
  changeOperation?: string;
  name: string;
  spec?: HostVirtualSwitchSpec;
}
