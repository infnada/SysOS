import {PerfMetricId} from './perf-metric-id';
import {ManagedObjectReference} from './managed-object-reference';

export interface PerfQuerySpec {
  endTime?: Date;
  entity: ManagedObjectReference;
  format?: string;
  intervalId?: number;
  maxSample?: number;
  metricId?: PerfMetricId[];
  startTime: Date;
}
