import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface ClusterAction extends DynamicData {
  target?: ManagedObjectReference;
  type: string;
}
