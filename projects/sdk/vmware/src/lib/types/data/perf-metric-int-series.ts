import {PerfMetricSeries} from './perf-metric-series';


export interface PerfMetricIntSeries extends PerfMetricSeries {
  value?: number[];
}