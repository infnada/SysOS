import {ManagedObjectReference} from '../data/managed-object-reference';
import {ScheduledTaskSpec} from '../data/scheduled-task-spec';


export interface CreateScheduledTask {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  spec: ScheduledTaskSpec;
}