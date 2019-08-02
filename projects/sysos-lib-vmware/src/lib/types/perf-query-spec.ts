import {PerfMetricId} from './perf-metric-id';
import {ManagedObjectReference} from './managed-object-reference';
import {DateTime} from './date-time';

export interface PerfQuerySpec {
  endTime?: DateTime;
  entity: ManagedObjectReference;
  format?: string;
  intervalId?: number;
  maxSample?: number;
  metricId?: PerfMetricId[];
  startTime: DateTime;
}
