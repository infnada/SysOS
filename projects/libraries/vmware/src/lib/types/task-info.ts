import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {ManagedObjectReference} from './managed-object-reference';
import {LocalizedMethodFault} from './localized-method-fault';
import {TaskReason} from './task-reason';
import {TaskInfoState} from './task-info-state';
import {Int} from './int';
import {DateTime} from './date-time';
export interface TaskInfo extends DynamicData {
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
  eventChainId: Int;
  key: string;
  locked?: ManagedObjectReference[] & { $type: 'ManagedEntity' };
  name?: string;
  parentTaskKey?: string;
  progress?: Int;
  queueTime: DateTime;
  reason: TaskReason;
  result?: any;
  rootTaskKey?: string;
  startTime?: DateTime;
  state: TaskInfoState;
  task: ManagedObjectReference & { $type: 'Task' };
}
