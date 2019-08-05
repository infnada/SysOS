import {AlarmExpression} from './alarm-expression';

import {AlarmExpression} from './alarm-expression';
export interface AndAlarmExpression extends AlarmExpression {
  expression: AlarmExpression[];
}
