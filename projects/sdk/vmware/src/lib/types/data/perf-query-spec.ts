import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {PerfMetricId} from './perf-metric-id';

export interface PerfQuerySpec extends DynamicData {
  endTime?: string;
  entity: ManagedObjectReference;
  format?: string;
  intervalId?: number;
  maxSample?: number;
  metricId?: PerfMetricId[];
  startTime?: string;
}