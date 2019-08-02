import {HostProxySwitchSpec} from "./host-proxy-switch-spec";

export interface HostProxySwitchConfig {
  changeOperation?: string;
  spec?: HostProxySwitchSpec;
  uuid: string;
}
