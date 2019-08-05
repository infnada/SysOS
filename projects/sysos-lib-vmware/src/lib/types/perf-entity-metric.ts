import {PerfEntityMetricBase} from './perf-entity-metric-base';

import {PerfSampleInfo} from './perf-sample-info';
import {PerfMetricSeries} from './perf-metric-series';
export interface PerfEntityMetric extends PerfEntityMetricBase {
  sampleInfo?: PerfSampleInfo[];
  value?: PerfMetricSeries[];
}
