import {ManagedObjectReference} from './managed-object-reference';
import {TaskFilterSpecRecursionOption} from './task-filter-spec-recursion-option';

export interface TaskFilterSpecByEntity {
  entity: ManagedObjectReference & { $type: 'ManagedEntity' };
  recursion: TaskFilterSpecRecursionOption;
}
