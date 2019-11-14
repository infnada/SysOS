import {DynamicData} from './dynamic-data';

import {PhysicalNicSpec} from './physical-nic-spec';
export interface PhysicalNicConfig extends DynamicData {
  device: string;
  spec: PhysicalNicSpec;
}
