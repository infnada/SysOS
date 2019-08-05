import {Action} from './action';

export interface CreateTaskAction extends Action {
  cancelable: boolean;
  taskTypeId: string;
}
