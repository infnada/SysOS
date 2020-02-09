import {TaskReason} from './task-reason';

import {ManagedObjectReference} from './managed-object-reference';

export interface TaskReasonAlarm extends TaskReason {
  alarm: ManagedObjectReference & { $type: 'Alarm'; };
  alarmName: string;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  entityName: string;
}