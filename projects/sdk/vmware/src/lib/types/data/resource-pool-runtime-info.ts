import {DynamicData} from './dynamic-data';

import {ResourcePoolResourceUsage} from './resource-pool-resource-usage';
import {ManagedEntityStatus} from '../enums/managed-entity-status';

export interface ResourcePoolRuntimeInfo extends DynamicData {
  cpu: ResourcePoolResourceUsage;
  memory: ResourcePoolResourceUsage;
  overallStatus: ManagedEntityStatus;
}