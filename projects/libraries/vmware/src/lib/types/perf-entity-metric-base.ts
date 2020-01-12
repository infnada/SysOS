import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface PerfEntityMetricBase extends DynamicData {
  entity: ManagedObjectReference;
}
