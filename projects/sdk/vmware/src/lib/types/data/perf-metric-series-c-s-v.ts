import {PerfMetricSeries} from './perf-metric-series';


export interface PerfMetricSeriesCSV extends PerfMetricSeries {
  value?: string;
}