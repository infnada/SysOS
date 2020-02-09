import {DynamicData} from './dynamic-data';

import {ResourceAllocationInfo} from './resource-allocation-info';
import {ManagedObjectReference} from './managed-object-reference';

export interface ResourceConfigSpec extends DynamicData {
  changeVersion?: string;
  cpuAllocation: ResourceAllocationInfo;
  entity?: ManagedObjectReference & { $type: 'ManagedEntity'; };
  lastModified?: string;
  memoryAllocation: ResourceAllocationInfo;
}