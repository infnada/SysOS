import {DynamicData} from './dynamic-data';

import {HostSystemResourceInfo} from './host-system-resource-info';
import {ResourceConfigSpec} from './resource-config-spec';
export interface HostSystemResourceInfo extends DynamicData {
  child?: HostSystemResourceInfo[];
  config?: ResourceConfigSpec;
  key: string;
}
