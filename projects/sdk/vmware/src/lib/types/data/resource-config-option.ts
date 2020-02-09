import {DynamicData} from './dynamic-data';

import {ResourceAllocationOption} from './resource-allocation-option';

export interface ResourceConfigOption extends DynamicData {
  cpuAllocationOption: ResourceAllocationOption;
  memoryAllocationOption: ResourceAllocationOption;
}