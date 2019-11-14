import {TaskReason} from './task-reason';

import {ManagedObjectReference} from './managed-object-reference';
export interface TaskReasonSchedule extends TaskReason {
  name: string;
  scheduledTask: ManagedObjectReference & { $type: 'ScheduledTask' };
}
