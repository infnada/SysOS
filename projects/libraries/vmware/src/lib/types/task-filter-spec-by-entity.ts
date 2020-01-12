import {DynamicData} from './dynamic-data';

import {TaskFilterSpecRecursionOption} from './task-filter-spec-recursion-option';
export interface TaskFilterSpecByEntity extends DynamicData {
  recursion: TaskFilterSpecRecursionOption;
}
