import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface ApplyStorageRecommendationResult extends DynamicData {
  vm?: ManagedObjectReference & { $type: 'VirtualMachine'; };
}