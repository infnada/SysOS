import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface NetworkSummary extends DynamicData {
  accessible: boolean;
  ipPoolId?: Int;
  ipPoolName: string;
  name: string;
  network?: ManagedObjectReference & { $type: 'Network' };
}
