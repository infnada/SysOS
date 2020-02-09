import {DynamicData} from './dynamic-data';

import {HostNatServiceSpec} from './host-nat-service-spec';

export interface HostNatServiceConfig extends DynamicData {
  changeOperation?: string;
  key: string;
  spec: HostNatServiceSpec;
}