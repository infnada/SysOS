import {ManagedObjectReference} from '../data/managed-object-reference';
import {ScheduledTaskSpec} from '../data/scheduled-task-spec';


export interface ReconfigureScheduledTask {
  _this: ManagedObjectReference;
  spec: ScheduledTaskSpec;
}