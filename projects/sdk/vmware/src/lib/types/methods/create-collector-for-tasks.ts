import {ManagedObjectReference} from '../data/managed-object-reference';
import {TaskFilterSpec} from '../data/task-filter-spec';


export interface CreateCollectorForTasks {
  _this: ManagedObjectReference;
  filter: TaskFilterSpec;
}