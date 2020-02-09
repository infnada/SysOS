import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface OvfNetworkMapping extends DynamicData {
  name: string;
  network: ManagedObjectReference & { $type: 'Network'; };
}