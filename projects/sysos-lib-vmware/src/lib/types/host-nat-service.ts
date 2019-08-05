import {DynamicData} from './dynamic-data';

import {HostNatServiceSpec} from './host-nat-service-spec';
export interface HostNatService extends DynamicData {
  key: string;
  spec: HostNatServiceSpec;
}
