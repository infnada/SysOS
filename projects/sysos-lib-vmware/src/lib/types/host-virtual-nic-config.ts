import {HostVirtualNicSpec} from "./host-virtual-nic-spec";

export interface HostVirtualNicConfig {
  changeOperation?: string;
  device?: string;
  portgroup: string;
  spec?: HostVirtualNicSpec;
}
