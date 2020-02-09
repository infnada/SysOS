import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface PlacementAffinityRule extends DynamicData {
  keys?: string[];
  ruleScope: string;
  ruleType: string;
  vms?: ManagedObjectReference & { $type: 'VirtualMachine[]'; };
}