import {ManagedObjectReference} from '../data/managed-object-reference';
import {ScheduledTaskSpec} from '../data/scheduled-task-spec';


export interface CreateObjectScheduledTask {
  _this: ManagedObjectReference;
  obj: ManagedObjectReference;
  spec: ScheduledTaskSpec;
}