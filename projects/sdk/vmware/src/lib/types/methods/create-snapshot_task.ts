import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CreateSnapshot_Task {
  _this: ManagedObjectReference;
  name: string;
  description?: string;
  memory: boolean;
  quiesce: boolean;
}