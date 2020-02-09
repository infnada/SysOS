import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface VAppCloneSpecNetworkMappingPair extends DynamicData {
  destination: ManagedObjectReference & { $type: 'Network'; };
  source: ManagedObjectReference & { $type: 'Network'; };
}