import {DynamicData} from './dynamic-data';

import {EventFilterSpecRecursionOption} from './event-filter-spec-recursion-option';
import {ManagedObjectReference} from './managed-object-reference';
export interface EventFilterSpecByEntity extends DynamicData {
  entity: ManagedObjectReference;
  recursion: EventFilterSpecRecursionOption;
}
