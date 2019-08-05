import {DynamicData} from './dynamic-data';

import {ResourceConfigSpec} from './resource-config-spec';
import {ResourcePoolQuickStats} from './resource-pool-quick-stats';
import {ResourcePoolRuntimeInfo} from './resource-pool-runtime-info';
import {Int} from './int';
export interface ResourcePoolSummary extends DynamicData {
  config: ResourceConfigSpec;
  configuredMemoryMB?: Int;
  name: string;
  quickStats?: ResourcePoolQuickStats;
  runtime: ResourcePoolRuntimeInfo;
}
