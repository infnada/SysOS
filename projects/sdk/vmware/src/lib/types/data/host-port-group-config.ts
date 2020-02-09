import {DynamicData} from './dynamic-data';

import {HostPortGroupSpec} from './host-port-group-spec';

export interface HostPortGroupConfig extends DynamicData {
  changeOperation?: string;
  spec?: HostPortGroupSpec;
}