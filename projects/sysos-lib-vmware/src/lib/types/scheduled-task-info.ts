import {ScheduledTaskSpec} from './scheduled-task-spec';

import {ManagedObjectReference} from './managed-object-reference';
import {LocalizedMethodFault} from './localized-method-fault';
import {TaskInfoState} from './task-info-state';
import {Int} from './int';
import {DateTime} from './date-time';
export interface ScheduledTaskInfo extends ScheduledTaskSpec {
  activeTask?: ManagedObjectReference & { $type: 'Task' };
  entity: ManagedObjectReference & { $type: 'ManagedEntity' };
  error?: LocalizedMethodFault;
  lastModifiedTime: DateTime;
  lastModifiedUser: string;
  nextRunTime?: DateTime;
  prevRunTime?: DateTime;
  progress?: Int;
  result?: any;
  scheduledTask: ManagedObjectReference & { $type: 'ScheduledTask' };
  state: TaskInfoState;
  taskObject: ManagedObjectReference;
}
