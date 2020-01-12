import {DynamicData} from './dynamic-data';

import {DvsVmVnicResourceAllocation} from './dvs-vm-vnic-resource-allocation';
export interface DvsVmVnicResourcePoolConfigSpec extends DynamicData {
  allocationInfo?: DvsVmVnicResourceAllocation;
  configVersion?: string;
  description?: string;
  key?: string;
  name?: string;
  operation: string;
}
