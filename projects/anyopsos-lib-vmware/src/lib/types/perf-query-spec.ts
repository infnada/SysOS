import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {PerfMetricId} from './perf-metric-id';
import {Int} from './int';
import {DateTime} from './date-time';
export interface PerfQuerySpec extends DynamicData {
  endTime?: DateTime;
  entity: ManagedObjectReference;
  format?: string;
  intervalId?: Int;
  maxSample?: Int;
  metricId?: PerfMetricId[];
  startTime?: DateTime;
}
