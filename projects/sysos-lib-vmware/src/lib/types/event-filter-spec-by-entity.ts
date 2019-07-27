import {ManagedObjectReference} from './managed-object-reference';
import {EventFilterSpecRecursionOption} from './event-filter-spec-recursion-option';

export interface EventFilterSpecByEntity {
  entity: ManagedObjectReference;
  recursion: EventFilterSpecRecursionOption;
}
