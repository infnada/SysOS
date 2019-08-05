import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface PerfProviderSummary extends DynamicData {
  currentSupported: boolean;
  entity: ManagedObjectReference;
  refreshRate?: Int;
  summarySupported: boolean;
}
