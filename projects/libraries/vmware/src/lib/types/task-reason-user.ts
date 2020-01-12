import {TaskReason} from './task-reason';

export interface TaskReasonUser extends TaskReason {
  userName: string;
}
