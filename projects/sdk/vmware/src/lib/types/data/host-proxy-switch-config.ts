import {DynamicData} from './dynamic-data';

import {HostProxySwitchSpec} from './host-proxy-switch-spec';

export interface HostProxySwitchConfig extends DynamicData {
  changeOperation?: string;
  spec?: HostProxySwitchSpec;
  uuid: string;
}