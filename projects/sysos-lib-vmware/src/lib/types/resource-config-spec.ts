import {DynamicData} from './dynamic-data';

import {ResourceAllocationInfo} from './resource-allocation-info';
import {ManagedObjectReference} from './managed-object-reference';
import {DateTime} from './date-time';
export interface ResourceConfigSpec extends DynamicData {
  changeVersion?: string;
  cpuAllocation: ResourceAllocationInfo;
  entity?: ManagedObjectReference & { $type: 'ManagedEntity' };
  lastModified?: DateTime;
  memoryAllocation: ResourceAllocationInfo;
}
