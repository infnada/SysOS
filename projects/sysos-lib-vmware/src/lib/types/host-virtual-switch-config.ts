import {DynamicData} from './dynamic-data';

import {HostVirtualSwitchSpec} from './host-virtual-switch-spec';
export interface HostVirtualSwitchConfig extends DynamicData {
  changeOperation?: string;
  name: string;
  spec?: HostVirtualSwitchSpec;
}
