import {AlarmExpression} from './alarm-expression';

import {PerfMetricId} from './perf-metric-id';
import {MetricAlarmOperator} from './metric-alarm-operator';
import {Int} from './int';
export interface MetricAlarmExpression extends AlarmExpression {
  metric: PerfMetricId;
  operator: MetricAlarmOperator;
  red?: Int;
  redInterval?: Int;
  type: string;
  yellow?: Int;
  yellowInterval?: Int;
}
