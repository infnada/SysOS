import {DynamicData} from './dynamic-data';

import {PerfInterval} from './perf-interval';

export interface PerformanceStatisticsDescription extends DynamicData {
  intervals?: PerfInterval[];
}