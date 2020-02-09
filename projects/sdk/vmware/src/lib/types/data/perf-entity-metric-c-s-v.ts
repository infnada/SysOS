import {PerfEntityMetricBase} from './perf-entity-metric-base';

import {PerfMetricSeriesCSV} from './perf-metric-series-c-s-v';

export interface PerfEntityMetricCSV extends PerfEntityMetricBase {
  sampleInfoCSV: string;
  value?: PerfMetricSeriesCSV[];
}