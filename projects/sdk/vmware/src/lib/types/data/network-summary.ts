import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface NetworkSummary extends DynamicData {
  accessible: boolean;
  ipPoolId?: number;
  ipPoolName: string;
  name: string;
  network?: ManagedObjectReference & { $type: 'Network'; };
}