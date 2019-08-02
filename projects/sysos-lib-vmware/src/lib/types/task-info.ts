import {DateTime} from './date-time';
import {LocalizableMessage} from './localizable-message';
import {ManagedObjectReference} from './managed-object-reference';
import {LocalizedMethodFault} from './localized-method-fault';
import {TaskReason} from './task-reason';
import {TaskInfoState} from './task-info-state';
import {TaskReasonAlarm} from './task-reason-alarm';
import {TaskReasonSchedule} from './task-reason-schedule';
import {TaskReasonSystem} from './task-reason-system';
import {TaskReasonUser} from './task-reason-user';

export interface TaskInfo {
  activationId?: string;
  cancelable: boolean;
  cancelled: boolean;
  changeTag?: string;
  completeTime?: DateTime;
  description?: LocalizableMessage;
  descriptionId: string;
  entity?: ManagedObjectReference & { $type: 'ManagedEntity' };
  entityName?: string;
  error?: LocalizedMethodFault;
  eventChainId: number;
  key: string;
  locked?: ManagedObjectReference[] & { $type: 'ManagedEntity' };
  name?: string;
  parentTaskKey?: string;
  progress?: number;
  queueTime: DateTime;
  reason: TaskReason & (TaskReasonAlarm | TaskReasonSchedule | TaskReasonSystem | TaskReasonUser);
  result?: any;
  rootTaskKey?: string;
  startTime?: DateTime;
  state: TaskInfoState;
  task: ManagedObjectReference & { $type: 'Task' };
}
