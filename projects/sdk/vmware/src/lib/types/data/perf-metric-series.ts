import {DynamicData} from './dynamic-data';

import {PerfMetricId} from './perf-metric-id';

export interface PerfMetricSeries extends DynamicData {
  id: PerfMetricId;
}