import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface PerfProviderSummary extends DynamicData {
  currentSupported: boolean;
  entity: ManagedObjectReference;
  refreshRate?: number;
  summarySupported: boolean;
}