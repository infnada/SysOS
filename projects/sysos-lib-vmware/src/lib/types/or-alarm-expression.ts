import {AlarmExpression} from './alarm-expression';

import {AlarmExpression} from './alarm-expression';
export interface OrAlarmExpression extends AlarmExpression {
  expression: AlarmExpression[];
}
