import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {ManagedObjectReference} from './managed-object-reference';
import {LocalizedMethodFault} from './localized-method-fault';
import {TaskReason} from './task-reason';
import {TaskInfoState} from '../enums/task-info-state';

export interface TaskInfo extends DynamicData {
  activationId?: string;
  cancelable: boolean;
  cancelled: boolean;
  changeTag?: string;
  completeTime?: string;
  description?: LocalizableMessage;
  descriptionId: string;
  entity?: ManagedObjectReference & { $type: 'ManagedEntity'; };
  entityName?: string;
  error?: LocalizedMethodFault;
  eventChainId: number;
  key: string;
  locked?: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
  name?: string;
  parentTaskKey?: string;
  progress?: number;
  queueTime: string;
  reason: TaskReason;
  result?: any;
  rootTaskKey?: string;
  startTime?: string;
  state: TaskInfoState;
  task: ManagedObjectReference & { $type: 'Task'; };
}