import {PerfMetricSeries} from './perf-metric-series';
import {Long} from './long';

export interface PerfMetricIntSeries extends PerfMetricSeries {
  value?: Long[];
}
