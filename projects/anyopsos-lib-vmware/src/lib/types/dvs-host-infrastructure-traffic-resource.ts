import {DynamicData} from './dynamic-data';

import {DvsHostInfrastructureTrafficResourceAllocation} from './dvs-host-infrastructure-traffic-resource-allocation';
export interface DvsHostInfrastructureTrafficResource extends DynamicData {
  allocationInfo: DvsHostInfrastructureTrafficResourceAllocation;
  description?: string;
  key: string;
}
