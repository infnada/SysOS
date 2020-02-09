import {AlarmExpression} from './alarm-expression';

import {PerfMetricId} from './perf-metric-id';
import {MetricAlarmOperator} from '../enums/metric-alarm-operator';

export interface MetricAlarmExpression extends AlarmExpression {
  metric: PerfMetricId;
  operator: MetricAlarmOperator;
  red?: number;
  redInterval?: number;
  type: string;
  yellow?: number;
  yellowInterval?: number;
}