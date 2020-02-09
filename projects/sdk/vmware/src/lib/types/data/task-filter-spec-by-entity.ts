import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {TaskFilterSpecRecursionOption} from '../enums/task-filter-spec-recursion-option';

export interface TaskFilterSpecByEntity extends DynamicData {
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  recursion: TaskFilterSpecRecursionOption;
}