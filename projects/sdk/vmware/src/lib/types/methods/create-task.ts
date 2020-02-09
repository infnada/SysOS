import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CreateTask {
  _this: ManagedObjectReference;
  obj: ManagedObjectReference;
  taskTypeId: string;
  initiatedBy?: string;
  cancelable: boolean;
  parentTaskKey?: string;
  activationId?: string;
}