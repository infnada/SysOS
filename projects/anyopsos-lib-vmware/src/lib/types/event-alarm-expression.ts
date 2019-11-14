import {AlarmExpression} from './alarm-expression';

import {EventAlarmExpressionComparison} from './event-alarm-expression-comparison';
import {ManagedEntityStatus} from './managed-entity-status';
export interface EventAlarmExpression extends AlarmExpression {
  comparisons?: EventAlarmExpressionComparison[];
  eventType: string;
  eventTypeId?: string;
  objectType?: string;
  status?: ManagedEntityStatus;
}
