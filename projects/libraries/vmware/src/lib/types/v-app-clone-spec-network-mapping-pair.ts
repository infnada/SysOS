import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface VAppCloneSpecNetworkMappingPair extends DynamicData {
  source: ManagedObjectReference & { $type: 'Network' };
}
