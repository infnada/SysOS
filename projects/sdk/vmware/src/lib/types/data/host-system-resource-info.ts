import {DynamicData} from './dynamic-data';

import {ResourceConfigSpec} from './resource-config-spec';

export interface HostSystemResourceInfo extends DynamicData {
  child?: HostSystemResourceInfo[];
  config?: ResourceConfigSpec;
  key: string;
}