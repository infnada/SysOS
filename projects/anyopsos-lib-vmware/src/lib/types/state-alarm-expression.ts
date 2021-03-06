import {AlarmExpression} from './alarm-expression';

import {StateAlarmOperator} from './state-alarm-operator';
export interface StateAlarmExpression extends AlarmExpression {
  operator: StateAlarmOperator;
  red?: string;
  statePath: string;
  type: string;
  yellow?: string;
}
