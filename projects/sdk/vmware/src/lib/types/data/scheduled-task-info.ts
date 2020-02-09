import {ScheduledTaskSpec} from './scheduled-task-spec';

import {ManagedObjectReference} from './managed-object-reference';
import {LocalizedMethodFault} from './localized-method-fault';
import {TaskInfoState} from '../enums/task-info-state';

export interface ScheduledTaskInfo extends ScheduledTaskSpec {
  activeTask?: ManagedObjectReference & { $type: 'Task'; };
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  error?: LocalizedMethodFault;
  lastModifiedTime: string;
  lastModifiedUser: string;
  nextRunTime?: string;
  prevRunTime?: string;
  progress?: number;
  result?: any;
  scheduledTask: ManagedObjectReference & { $type: 'ScheduledTask'; };
  state: TaskInfoState;
  taskObject: ManagedObjectReference;
}